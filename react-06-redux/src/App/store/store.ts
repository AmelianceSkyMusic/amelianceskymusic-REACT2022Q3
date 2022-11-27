import { configureStore } from '@reduxjs/toolkit';
import { mainPageSlice } from './mainPage/mainPageSlice';

export const store = configureStore({
  reducer: {
    mainPageReducer: mainPageSlice.reducer,
  },
});
