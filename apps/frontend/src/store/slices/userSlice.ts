import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  walletAddress: string;
  balance: number;
  environmentalScore: number;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateBalance: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.balance = action.payload;
      }
    },
    updateEnvironmentalScore: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.environmentalScore = action.payload;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setCurrentUser,
  updateUser,
  logout,
  updateBalance,
  updateEnvironmentalScore,
} = userSlice.actions;

export default userSlice.reducer; 