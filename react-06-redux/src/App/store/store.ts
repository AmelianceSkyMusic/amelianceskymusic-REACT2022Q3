import { configureStore } from '@reduxjs/toolkit';
import { formPageSlice } from './formPage/formPageSlice';
import { mainPageSlice } from './mainPage/mainPageSlice';

export const store = configureStore({
  reducer: {
    mainPageReducer: mainPageSlice.reducer,
    formPageReducer: formPageSlice.reducer,
  },
});
