import { configureStore } from '@reduxjs/toolkit';
import themeModeReducer from './slices/themeModeSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    themeMode: themeModeReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;