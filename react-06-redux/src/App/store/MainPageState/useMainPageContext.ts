import { Context, useContext } from 'react';
import { IMainPageState } from './InitialMainPageState';
import { MainPageContext } from './MainPageContext';
import { TMainReducerActions } from './useMainReducer';

export function useMainPageContext() {
  return useContext(MainPageContext as Context<IMainPageState & TMainReducerActions>);
}
