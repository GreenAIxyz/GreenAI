import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EnvironmentalAction {
  id: string;
  type: string;
  description: string;
  timestamp: number;
  location: {
    latitude: number;
    longitude: number;
  } | null;
  proofHash: string;
  status: 'pending' | 'verified' | 'rejected';
  reward: number;
  carbonOffset: number;
}

interface EnvironmentalActionState {
  actions: EnvironmentalAction[];
  totalRewards: number;
  totalCarbonOffset: number;
  loading: boolean;
  error: string | null;
}

const initialState: EnvironmentalActionState = {
  actions: [],
  totalRewards: 0,
  totalCarbonOffset: 0,
  loading: false,
  error: null,
};

export const environmentalActionSlice = createSlice({
  name: 'environmentalAction',
  initialState,
  reducers: {
    addAction: (state, action: PayloadAction<EnvironmentalAction>) => {
      state.actions.push(action.payload);
      if (action.payload.status === 'verified') {
        state.totalRewards += action.payload.reward;
        state.totalCarbonOffset += action.payload.carbonOffset;
      }
    },
    updateActionStatus: (
      state,
      action: PayloadAction<{ id: string; status: 'pending' | 'verified' | 'rejected' }>
    ) => {
      const actionToUpdate = state.actions.find((a) => a.id === action.payload.id);
      if (actionToUpdate) {
        const oldStatus = actionToUpdate.status;
        actionToUpdate.status = action.payload.status;
        
        if (oldStatus !== 'verified' && action.payload.status === 'verified') {
          state.totalRewards += actionToUpdate.reward;
          state.totalCarbonOffset += actionToUpdate.carbonOffset;
        } else if (oldStatus === 'verified' && action.payload.status !== 'verified') {
          state.totalRewards -= actionToUpdate.reward;
          state.totalCarbonOffset -= actionToUpdate.carbonOffset;
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearActions: (state) => {
      state.actions = [];
      state.totalRewards = 0;
      state.totalCarbonOffset = 0;
      state.error = null;
    },
  },
});

export const {
  addAction,
  updateActionStatus,
  setLoading,
  setError,
  clearActions,
} = environmentalActionSlice.actions;

export default environmentalActionSlice.reducer; 