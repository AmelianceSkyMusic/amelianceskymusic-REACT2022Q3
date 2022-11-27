import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormCard } from 'App/types/IFormCard';
import { IFormInputs } from 'App/types/IFormInputs';
import { initFormPageState } from './initFormPageState';

export const formPageSlice = createSlice({
  name: 'formPageSlice',
  initialState: initFormPageState,
  reducers: {
    setForm: (state, action: PayloadAction<IFormInputs>) => {
      (state.form as IFormInputs) = action.payload;
    },
    resetForm: (state) => {
      state.form = { ...state.initForm };
    },
    addCard: (state, action: PayloadAction<IFormCard>) => {
      (state.cards as IFormCard[]) = [...state.cards, action.payload];
    },
  },
});
