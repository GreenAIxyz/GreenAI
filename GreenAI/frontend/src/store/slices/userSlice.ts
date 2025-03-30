import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  address: string | null;
  balance: number;
  environmentalScore: number;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  address: null,
  balance: 0,
  environmentalScore: 0,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
      state.isAuthenticated = true;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setEnvironmentalScore: (state, action: PayloadAction<number>) => {
      state.environmentalScore = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.address = null;
      state.balance = 0;
      state.environmentalScore = 0;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const {
  setUserAddress,
  setBalance,
  setEnvironmentalScore,
  setLoading,
  setError,
  logout,
} = userSlice.actions;

export default userSlice.reducer; 