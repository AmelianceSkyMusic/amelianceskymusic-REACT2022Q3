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
  | { type: 'setIsSearchAppliedFalse' };

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
    default:
      return state;
  }
};
