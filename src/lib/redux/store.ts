import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import platformReducer from './slices/platformSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    platform: platformReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;