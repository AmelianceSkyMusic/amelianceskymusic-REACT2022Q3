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
  setCurrentCard: (card: IVideoItem | null) => void;
  toggleIsPinInfo: () => void;
  setCardsPerPage: (cardsCount: string) => void;
  setSortingType: (sortingType: string) => void;
  setNextPage: (nextPage: string | undefined) => void;
  setPrevPage: (nextPage: string | undefined) => void;
  setCurrentPage: (currentPage: string | undefined) => void;
  setPagesCount: (pagesCount: number) => void;
  setCurrentPageNumber: (currentPageNumber: number) => void;
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
    searchValue: state.searchValue,
    isSearchApplied: state.isSearchApplied,
    currentCard: state.currentCard,
    isPinInfo: state.isPinInfo,
    cardsPerPage: state.cardsPerPage,
    sortingType: state.sortingType,
    nextPage: state.nextPage,
    prevPage: state.prevPage,
    currentPage: state.currentPage,
    pagesCount: state.pagesCount,
    currentPageNumber: state.currentPageNumber,
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

    setCurrentCard: (card: IVideoItem | null) =>
      dispatch({ type: 'setCurrentCard', payload: card }),
    toggleIsPinInfo: () => dispatch({ type: 'toggleIsPinInfo' }),

    setCardsPerPage: (cardsPerPage: string) =>
      dispatch({ type: 'setCardsPerPage', payload: cardsPerPage }),
    setSortingType: (sortingType: string) =>
      dispatch({ type: 'setSortingType', payload: sortingType }),
    setNextPage: (nextPage: string | undefined) =>
      dispatch({ type: 'setNextPage', payload: nextPage }),
    setPrevPage: (prevPage: string | undefined) =>
      dispatch({ type: 'setPrevPage', payload: prevPage }),

    setCurrentPage: (currentPage: string | undefined) =>
      dispatch({ type: 'setCurrentPage', payload: currentPage }),

    setPagesCount: (pagesCount: number) => dispatch({ type: 'setPagesCount', payload: pagesCount }),
    setCurrentPageNumber: (currentPageNumber: number) =>
      dispatch({ type: 'setCurrentPageNumber', payload: currentPageNumber }),
  };

  return {
    ...stateValues,
    ...mainReducerActions,
  };
}
