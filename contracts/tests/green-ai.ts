import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { GreenAi } from '../target/types/green_ai';
import {
  TOKEN_PROGRAM_ID,
  createMint,
  createAccount,
  mintTo,
} from '@solana/spl-token';
import { assert } from 'chai';

describe('green-ai', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.GreenAi as Program<GreenAi>;
  let mint: anchor.web3.PublicKey;
  let rewardVault: anchor.web3.PublicKey;
  let userTokenAccount: anchor.web3.PublicKey;
  let state: anchor.web3.Keypair;
  let action: anchor.web3.Keypair;

  before(async () => {
    // Create mint
    mint = await createMint(
      provider.connection,
      provider.wallet.payer,
      provider.wallet.publicKey,
      null,
      9
    );

    // Create reward vault
    rewardVault = await createAccount(
      provider.connection,
      provider.wallet.payer,
      mint,
      provider.wallet.publicKey
    );

    // Create user token account
    userTokenAccount = await createAccount(
      provider.connection,
      provider.wallet.payer,
      mint,
      provider.wallet.publicKey
    );

    // Mint initial tokens to reward vault
    await mintTo(
      provider.connection,
      provider.wallet.payer,
      mint,
      rewardVault,
      provider.wallet.publicKey,
      1_000_000_000 // 1000 tokens
    );

    state = anchor.web3.Keypair.generate();
    action = anchor.web3.Keypair.generate();
  });

  it('Initializes the program state', async () => {
    await program.methods
      .initialize()
      .accounts({
        state: state.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([state])
      .rpc();

    const stateAccount = await program.account.programState.fetch(state.publicKey);
    assert.equal(
      stateAccount.authority.toBase58(),
      provider.wallet.publicKey.toBase58()
    );
    assert.equal(stateAccount.totalActions.toNumber(), 0);
    assert.equal(stateAccount.totalRewards.toNumber(), 0);
  });

  it('Records an environmental action', async () => {
    await program.methods
      .recordAction('recycling', new anchor.BN(5))
      .accounts({
        state: state.publicKey,
        action: action.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([action])
      .rpc();

    const actionAccount = await program.account.environmentalAction.fetch(
      action.publicKey
    );
    assert.equal(actionAccount.actionType, 'recycling');
    assert.equal(actionAccount.impactScore.toNumber(), 5);
    assert.equal(actionAccount.isVerified, false);
  });

  it('Verifies an environmental action and distributes rewards', async () => {
    const initialBalance = await provider.connection.getTokenAccountBalance(
      userTokenAccount
    );

    await program.methods
      .verifyAction()
      .accounts({
        state: state.publicKey,
        action: action.publicKey,
        authority: provider.wallet.publicKey,
        rewardVault: rewardVault,
        userTokenAccount: userTokenAccount,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    const actionAccount = await program.account.environmentalAction.fetch(
      action.publicKey
    );
    assert.equal(actionAccount.isVerified, true);

    const finalBalance = await provider.connection.getTokenAccountBalance(
      userTokenAccount
    );
    assert.equal(
      finalBalance.value.amount - initialBalance.value.amount,
      5000 // 5 impact score * 1000 tokens
    );
  });
}); 