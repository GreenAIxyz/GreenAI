import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Meme {
  id: string;
  imageUrl: string;
  text: string;
  creator: string;
  likes: number;
  shares: number;
  environmentalImpact: number;
  createdAt: string;
}

interface MemeGeneratorState {
  memes: Meme[];
  loading: boolean;
  error: string | null;
  currentTemplate: string | null;
  generatedMeme: Meme | null;
}

const initialState: MemeGeneratorState = {
  memes: [],
  loading: false,
  error: null,
  currentTemplate: null,
  generatedMeme: null,
};

export const memeGeneratorSlice = createSlice({
  name: 'memeGenerator',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setMemes: (state, action: PayloadAction<Meme[]>) => {
      state.memes = action.payload;
    },
    addMeme: (state, action: PayloadAction<Meme>) => {
      state.memes.unshift(action.payload);
    },
    setCurrentTemplate: (state, action: PayloadAction<string>) => {
      state.currentTemplate = action.payload;
    },
    setGeneratedMeme: (state, action: PayloadAction<Meme>) => {
      state.generatedMeme = action.payload;
    },
    updateMeme: (state, action: PayloadAction<Meme>) => {
      const index = state.memes.findIndex(meme => meme.id === action.payload.id);
      if (index !== -1) {
        state.memes[index] = action.payload;
      }
    },
    deleteMeme: (state, action: PayloadAction<string>) => {
      state.memes = state.memes.filter(meme => meme.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setMemes,
  addMeme,
  setCurrentTemplate,
  setGeneratedMeme,
  updateMeme,
  deleteMeme,
} = memeGeneratorSlice.actions;

export default memeGeneratorSlice.reducer; 