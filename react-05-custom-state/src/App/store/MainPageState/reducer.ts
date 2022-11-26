import { IVideoItem } from 'App/types/IYoutubeResponse';
import { IMainPageState } from './InitialMainPageState';

export type TActions =
  | { type: 'setIsLoadingTrue' }
  | { type: 'setIsLoadingFalse' }
  | { type: 'setSearchValue'; payload: string }
  | { type: 'setIsErrorTrue' }
  | { type: 'setIsErrorFalse' }
  | { type: 'setErrorMessage'; payload: string }
  | { type: 'setCards'; payload: IVideoItem[] }
  | { type: 'setIsSearchAppliedTrue' }
  | { type: 'setIsSearchAppliedFalse' }
  | { type: 'setCurrentCard'; payload: IVideoItem | null }
  | { type: 'toggleIsPinInfo' }
  | { type: 'setCardsPerPage'; payload: string }
  | { type: 'setSortingType'; payload: string }
  | { type: 'setNextPage'; payload: string | undefined }
  | { type: 'setPrevPage'; payload: string | undefined }
  | { type: 'setCurrentPage'; payload: string | undefined }
  | { type: 'setPagesCount'; payload: number }
  | { type: 'setCurrentPageNumber'; payload: number };

export const reducer = (state: IMainPageState, action: TActions): IMainPageState => {
  switch (action.type) {
    case 'setIsLoadingTrue':
      return { ...state, isLoading: true };
    case 'setIsLoadingFalse':
      return { ...state, isLoading: false };
    case 'setSearchValue':
      return { ...state, searchValue: action.payload };
    case 'setIsErrorTrue':
      return { ...state, isError: true };
    case 'setIsErrorFalse':
      return { ...state, isError: false };
    case 'setErrorMessage':
      return { ...state, errorMessage: action.payload };
    case 'setCards':
      return { ...state, cards: action.payload };
    case 'setIsSearchAppliedTrue':
      return { ...state, isSearchApplied: true };
    case 'setIsSearchAppliedFalse':
      return { ...state, isSearchApplied: false };
    case 'setCurrentCard':
      return { ...state, currentCard: action.payload };
    case 'toggleIsPinInfo':
      return { ...state, isPinInfo: !state.isPinInfo };
    case 'setCardsPerPage':
      return { ...state, cardsPerPage: action.payload, currentPageNumber: 1, currentPage: '' };
    case 'setSortingType':
      return { ...state, sortingType: action.payload, currentPageNumber: 1, currentPage: '' };
    case 'setNextPage':
      return { ...state, nextPage: action.payload };
    case 'setPrevPage':
      return { ...state, prevPage: action.payload };
    case 'setCurrentPage':
      return { ...state, currentPage: action.payload };
    case 'setPagesCount':
      return { ...state, pagesCount: action.payload };
    case 'setCurrentPageNumber':
      return { ...state, currentPageNumber: action.payload };
    default:
      return state;
  }
};
