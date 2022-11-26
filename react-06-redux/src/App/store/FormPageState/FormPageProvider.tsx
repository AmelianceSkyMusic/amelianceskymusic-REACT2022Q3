import React from 'react';
import { FormPageContext } from './FormPageContext';
import { initialFormPageState } from './initialFormPageState';
import { useFormPageReducer } from './useFormPageReducer';

interface IFormProviderProps {
  children: React.ReactElement;
}

export function FormPageProvider({ children }: IFormProviderProps) {
  const state = useFormPageReducer(initialFormPageState);

  return <FormPageContext.Provider value={state}>{children}</FormPageContext.Provider>;
}
