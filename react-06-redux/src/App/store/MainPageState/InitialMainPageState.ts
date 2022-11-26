import { IVideoItem } from 'App/types/IYoutubeResponse';

export interface IMainPageState {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  cards: IVideoItem[];
  searchValue: string;
  isSearchApplied: boolean;
  currentCard: IVideoItem | null;
  isPinInfo: boolean;
  cardsPerPage: string;
  sortingType: string;
  nextPage: string | undefined;
  prevPage: string | undefined;
  currentPage: string | undefined;
  pagesCount: number;
  currentPageNumber: number;
}

export const initialMainPageState = {
  isLoading: false,
  isError: false,
  errorMessage: null,
  cards: [],
  searchValue: localStorage.getItem('searchValue') || '',
  isSearchApplied: false,
  currentCard: null,
  isPinInfo: false,
  cardsPerPage: '1',
  sortingType: 'relevance',
  nextPage: undefined,
  prevPage: undefined,
  currentPage: undefined,
  pagesCount: 0,
  currentPageNumber: 1,
};
