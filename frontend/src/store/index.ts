import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import environmentalActionReducer from './slices/environmentalActionSlice';
import memeGeneratorReducer from './slices/memeGeneratorSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    environmentalAction: environmentalActionReducer,
    memeGenerator: memeGeneratorReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 