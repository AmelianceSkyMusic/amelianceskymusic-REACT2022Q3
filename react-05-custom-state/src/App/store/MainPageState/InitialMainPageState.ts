import { IVideoItem } from 'App/types/IYoutubeResponse';

export interface IMainPageState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  cards: IVideoItem[];
  cardsCount: number;
  isLastPage: boolean;
  nextPage: undefined;
  isScrollLoading: boolean;
  searchValue: string | undefined;
  isSearchApplied: boolean;
}

export const initialMainPageState = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  cards: [],
  cardsCount: 0,
  isLastPage: false,
  nextPage: undefined,
  isScrollLoading: false,
  searchValue: localStorage.getItem('searchValue') || '',
  isSearchApplied: false,
};
