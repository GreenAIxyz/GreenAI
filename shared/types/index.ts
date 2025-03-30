export interface User {
  id: string;
  walletAddress: string;
  balance: number;
  environmentalScore: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EnvironmentalAction {
  id: string;
  type: string;
  description: string;
  impact: number;
  evidence: string;
  status: 'pending' | 'verified' | 'rejected';
  userId: string;
  createdAt: string;
  verifiedAt?: string;
}

export interface Meme {
  id: string;
  imageUrl: string;
  text: string;
  creator: string;
  likes: number;
  shares: number;
  environmentalImpact: number;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 