import { PublicKey } from '@solana/web3.js';

export const isValidWalletAddress = (address: string): boolean => {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isValidImpactScore = (score: number): boolean => {
  return score >= 0 && score <= 100 && Number.isInteger(score);
};

export const validateEnvironmentalAction = (action: {
  type: string;
  description: string;
  impact: number;
  evidence: string;
}): string[] => {
  const errors: string[] = [];

  if (!action.type || action.type.length < 3) {
    errors.push('Action type must be at least 3 characters long');
  }

  if (!action.description || action.description.length < 10) {
    errors.push('Description must be at least 10 characters long');
  }

  if (!isValidImpactScore(action.impact)) {
    errors.push('Impact score must be an integer between 0 and 100');
  }

  if (!isValidUrl(action.evidence)) {
    errors.push('Evidence must be a valid URL');
  }

  return errors;
};

export const validateMeme = (meme: {
  text: string;
  style: string;
}): string[] => {
  const errors: string[] = [];
  const validStyles = ['funny', 'serious', 'educational', 'inspiring'];

  if (!meme.text || meme.text.length < 5) {
    errors.push('Meme text must be at least 5 characters long');
  }

  if (!validStyles.includes(meme.style)) {
    errors.push('Invalid meme style');
  }

  return errors;
}; 