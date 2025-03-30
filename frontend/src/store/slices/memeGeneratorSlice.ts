import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Meme {
  id: string;
  prompt: string;
  imageUrl: string;
  environmentalAction: string;
  socialShares: number;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  timestamp: number;
  status: 'generating' | 'ready' | 'failed';
}

interface MemeGeneratorState {
  memes: Meme[];
  currentPrompt: string;
  loading: boolean;
  error: string | null;
}

const initialState: MemeGeneratorState = {
  memes: [],
  currentPrompt: '',
  loading: false,
  error: null,
};

export const memeGeneratorSlice = createSlice({
  name: 'memeGenerator',
  initialState,
  reducers: {
    setCurrentPrompt: (state, action: PayloadAction<string>) => {
      state.currentPrompt = action.payload;
    },
    addMeme: (state, action: PayloadAction<Meme>) => {
      state.memes.unshift(action.payload);
    },
    updateMemeStatus: (
      state,
      action: PayloadAction<{ id: string; status: 'generating' | 'ready' | 'failed' }>
    ) => {
      const meme = state.memes.find((m) => m.id === action.payload.id);
      if (meme) {
        meme.status = action.payload.status;
      }
    },
    updateMemeEngagement: (
      state,
      action: PayloadAction<{
        id: string;
        engagement: {
          likes?: number;
          comments?: number;
          shares?: number;
        };
      }>
    ) => {
      const meme = state.memes.find((m) => m.id === action.payload.id);
      if (meme) {
        meme.engagement = {
          ...meme.engagement,
          ...action.payload.engagement,
        };
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearMemes: (state) => {
      state.memes = [];
      state.currentPrompt = '';
      state.error = null;
    },
  },
});

export const {
  setCurrentPrompt,
  addMeme,
  updateMemeStatus,
  updateMemeEngagement,
  setLoading,
  setError,
  clearMemes,
} = memeGeneratorSlice.actions;

export default memeGeneratorSlice.reducer; 