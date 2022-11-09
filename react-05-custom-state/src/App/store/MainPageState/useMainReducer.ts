import { useReducer } from 'react';
import { IVideoItem } from 'App/types/IYoutubeResponse';
import { IMainPageState } from './InitialMainPageState';
import { reducer, TActions } from './reducer';

export interface TMainReducerActions {
  setIsLoadingTrue: () => void;
  setIsLoadingFalse: () => void;
  setSearchValue: (searchValue: string) => void;
  setIsErrorTrue: () => void;
  setIsErrorFalse: () => void;
  setErrorMessage: (errorMessage: string) => void;
  setCards: (cards: IVideoItem[]) => void;
  setIsSearchAppliedTrue: () => void;
  setIsSearchAppliedFalse: () => void;
}

export function useMainReducer(initialState: IMainPageState) {
  const [state, dispatch] = useReducer<React.Reducer<IMainPageState, TActions>>(
    reducer,
    initialState
  );

  const stateValues = {
    isLoading: state.isLoading,
    isError: state.isError,
    errorMessage: state.errorMessage,
    cards: state.cards,
    cardsCount: state.cardsCount,
    isLastPage: state.isLastPage,
    nextPage: state.nextPage,
    isScrollLoading: state.isScrollLoading,
    searchValue: state.searchValue,
    isSearchApplied: state.isSearchApplied,
  };

  const mainReducerActions = {
    setIsLoadingTrue: () => dispatch({ type: 'setIsLoadingTrue' }),
    setIsLoadingFalse: () => dispatch({ type: 'setIsLoadingFalse' }),
    setSearchValue: (searchValue: string) =>
      dispatch({ type: 'setSearchValue', payload: searchValue }),

    setIsErrorTrue: () => dispatch({ type: 'setIsErrorTrue' }),
    setIsErrorFalse: () => dispatch({ type: 'setIsErrorFalse' }),
    setErrorMessage: (errorMessage: string) =>
      dispatch({ type: 'setErrorMessage', payload: errorMessage }),

    setCards: (cards: IVideoItem[]) => dispatch({ type: 'setCards', payload: cards }),

    setIsSearchAppliedTrue: () => dispatch({ type: 'setIsSearchAppliedTrue' }),
    setIsSearchAppliedFalse: () => dispatch({ type: 'setIsSearchAppliedFalse' }),
  };

  return {
    ...stateValues,
    ...mainReducerActions,
  };
}
