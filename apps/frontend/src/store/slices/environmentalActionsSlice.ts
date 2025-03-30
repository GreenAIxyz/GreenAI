import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EnvironmentalAction {
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

interface EnvironmentalActionsState {
  actions: EnvironmentalAction[];
  loading: boolean;
  error: string | null;
  userScore: number;
  selectedAction: EnvironmentalAction | null;
}

const initialState: EnvironmentalActionsState = {
  actions: [],
  loading: false,
  error: null,
  userScore: 0,
  selectedAction: null,
};

export const environmentalActionsSlice = createSlice({
  name: 'environmentalActions',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setActions: (state, action: PayloadAction<EnvironmentalAction[]>) => {
      state.actions = action.payload;
    },
    addAction: (state, action: PayloadAction<EnvironmentalAction>) => {
      state.actions.unshift(action.payload);
    },
    updateAction: (state, action: PayloadAction<EnvironmentalAction>) => {
      const index = state.actions.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.actions[index] = action.payload;
      }
    },
    deleteAction: (state, action: PayloadAction<string>) => {
      state.actions = state.actions.filter(action => action.id !== action.payload);
    },
    setUserScore: (state, action: PayloadAction<number>) => {
      state.userScore = action.payload;
    },
    setSelectedAction: (state, action: PayloadAction<EnvironmentalAction | null>) => {
      state.selectedAction = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setActions,
  addAction,
  updateAction,
  deleteAction,
  setUserScore,
  setSelectedAction,
} = environmentalActionsSlice.actions;

export default environmentalActionsSlice.reducer; 