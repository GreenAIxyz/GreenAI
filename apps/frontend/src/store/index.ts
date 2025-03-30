import { configureStore } from '@reduxjs/toolkit';
import memeGeneratorReducer from './slices/memeGeneratorSlice';
import environmentalActionsReducer from './slices/environmentalActionsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    memeGenerator: memeGeneratorReducer,
    environmentalActions: environmentalActionsReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 