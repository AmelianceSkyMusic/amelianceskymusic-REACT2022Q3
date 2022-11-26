import React from 'react';
import { IMainPageState } from './InitialMainPageState';
import { TMainReducerActions } from './useMainReducer';

// eslint-disable-next-line prettier/prettier
export const MainPageContext
   = React.createContext<IMainPageState & TMainReducerActions | null>(null);
