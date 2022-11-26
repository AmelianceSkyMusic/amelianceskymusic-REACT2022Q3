import React from 'react';
import { initialMainPageState } from './InitialMainPageState';
import { MainPageContext } from './MainPageContext';
import { useMainReducer } from './useMainReducer';

interface IMainPageProviderProps {
  children: React.ReactElement;
}

export function MainPageProvider({ children }: IMainPageProviderProps) {
  const state = useMainReducer(initialMainPageState);

  return <MainPageContext.Provider value={{ ...state }}>{children}</MainPageContext.Provider>;
}
