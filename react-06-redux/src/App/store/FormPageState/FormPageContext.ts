import React from 'react';
import { IFormPageState } from './FormPageStateTypes';
import { TFormPageReducerActions } from './useFormPageReducer';

export const FormPageContext = React.createContext<
  (IFormPageState & TFormPageReducerActions) | null
>(null);
