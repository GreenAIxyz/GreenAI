use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Mint};

declare_id!("GreenAiTokenProgramID111111111111111111111111111");

#[program]
pub mod green_ai {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.authority = ctx.accounts.authority.key();
        state.total_actions = 0;
        state.total_rewards = 0;
        Ok(())
    }

    pub fn record_action(
        ctx: Context<RecordAction>,
        action_type: String,
        impact_score: u64,
    ) -> Result<()> {
        let state = &mut ctx.accounts.state;
        let action = &mut ctx.accounts.action;

        action.user = ctx.accounts.user.key();
        action.action_type = action_type;
        action.impact_score = impact_score;
        action.timestamp = Clock::get()?.unix_timestamp;
        action.is_verified = false;

        state.total_actions = state.total_actions.checked_add(1).unwrap();
        Ok(())
    }

    pub fn verify_action(ctx: Context<VerifyAction>) -> Result<()> {
        let action = &mut ctx.accounts.action;
        let state = &mut ctx.accounts.state;

        require!(
            ctx.accounts.authority.key() == state.authority,
            ErrorCode::Unauthorized
        );

        action.is_verified = true;

        // Calculate rewards based on impact score
        let rewards = action.impact_score.checked_mul(1_000).unwrap(); // 1000 tokens per impact point
        state.total_rewards = state.total_rewards.checked_add(rewards).unwrap();

        // Transfer tokens to user
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.reward_vault.to_account_info(),
                to: ctx.accounts.user_token_account.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            },
        );
        token::transfer(cpi_ctx, rewards)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 8 + 8)]
    pub state: Account<'info, ProgramState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct RecordAction<'info> {
    #[account(mut)]
    pub state: Account<'info, ProgramState>,
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 64 + 8 + 8 + 1
    )]
    pub action: Account<'info, EnvironmentalAction>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct VerifyAction<'info> {
    #[account(mut)]
    pub state: Account<'info, ProgramState>,
    #[account(mut)]
    pub action: Account<'info, EnvironmentalAction>,
    pub authority: Signer<'info>,
    #[account(mut)]
    pub reward_vault: Account<'info, TokenAccount>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
}

#[account]
pub struct ProgramState {
    pub authority: Pubkey,
    pub total_actions: u64,
    pub total_rewards: u64,
}

#[account]
pub struct EnvironmentalAction {
    pub user: Pubkey,
    pub action_type: String,
    pub impact_score: u64,
    pub timestamp: i64,
    pub is_verified: bool,
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not authorized to perform this action")]
    Unauthorized,
} 