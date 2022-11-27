import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoItem } from 'App/types/IYoutubeResponse';
import { initMainPageState } from './initMainPageState';

export const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState: initMainPageState,
  reducers: {
    setIsLoadingTrue: (state) => {
      state.isLoading = true;
    },
    setIsLoadingFalse: (state) => {
      state.isLoading = false;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setIsErrorTrue: (state) => {
      state.isError = true;
    },
    setIsErrorFalse: (state) => {
      state.isError = false;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      (state.errorMessage as string | null) = action.payload;
    },
    setCards: (state, action: PayloadAction<IVideoItem[]>) => {
      (state.cards as IVideoItem[]) = action.payload;
    },
    setIsSearchAppliedTrue: (state) => {
      state.isSearchApplied = true;
    },
    setIsSearchAppliedFalse: (state) => {
      state.isSearchApplied = false;
    },
    setCurrentCard: (state, action: PayloadAction<IVideoItem | null>) => {
      (state.currentCard as IVideoItem | null) = action.payload;
    },
    toggleIsPinInfo: (state) => {
      state.isPinInfo = !state.isPinInfo;
    },
    setCardsPerPage: (state, action: PayloadAction<string | undefined>) => {
      (state.cardsPerPage as string | undefined) = action.payload;
      state.currentPageNumber = 1;
      state.currentPage = undefined;
    },
    setSortingType: (state, action: PayloadAction<string | undefined>) => {
      (state.sortingType as string | undefined) = action.payload;
      state.currentPageNumber = 1;
      state.currentPage = undefined;
    },
    setNextPage: (state, action: PayloadAction<string | undefined>) => {
      (state.nextPage as string | undefined) = action.payload;
    },
    setPrevPage: (state, action: PayloadAction<string | undefined>) => {
      (state.prevPage as string | undefined) = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<string | undefined>) => {
      (state.currentPage as string | undefined) = action.payload;
    },
    setPagesCount: (state, action: PayloadAction<number>) => {
      state.pagesCount = action.payload;
    },
    setCurrentPageNumber: (state, action: PayloadAction<number>) => {
      state.currentPageNumber = action.payload;
    },
    youtubeFetching: (state) => {
      state.youtubeIsLoading = true;
    },
    youtubeFetchingSuccess: (state, action: PayloadAction<IVideoItem[]>) => {
      (state.youtubeCards as IVideoItem[]) = action.payload;
      state.youtubeIsLoading = false;
      state.youtubeError = '';
    },
    youtubeFetchingError: (state, action: PayloadAction<string>) => {
      state.youtubeError = action.payload;
      state.youtubeIsLoading = false;
    },
  },
});
