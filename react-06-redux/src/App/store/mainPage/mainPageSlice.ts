import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IVideoItem, IYoutubeResponse } from 'App/types/IYoutubeResponse';
import { fetchYoutube } from './actions/fetchYoutube';
import { initMainPageState } from './initMainPageState';

export const mainPageSlice = createSlice({
  name: 'mainPageSlice',
  initialState: initMainPageState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.cards = [];
      state.nextPage = undefined;
      state.prevPage = undefined;
      state.pagesCount = 0;
      state.currentPageNumber = 0;
      state.searchValue = action.payload;
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
      state.pagesCount = 0;
      state.currentPage = undefined;
    },
    setSortingType: (state, action: PayloadAction<string | undefined>) => {
      (state.sortingType as string | undefined) = action.payload;
      state.currentPageNumber = 1;
      state.pagesCount = 0;
      state.currentPage = undefined;
    },
    setCurrentPage: (state, action: PayloadAction<string | undefined>) => {
      (state.currentPage as string | undefined) = action.payload;
    },
    setCurrentPageNumber: (state, action: PayloadAction<number>) => {
      state.currentPageNumber = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchYoutube.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchYoutube.fulfilled, (state, action: PayloadAction<IYoutubeResponse>) => {
        if (action.payload?.error?.code === 403) {
          state.error =
            "That's it! Come back tomorrow. Google quotas for queries are not infinite! ¯\\_O_o_/¯";
          state.cards = [];
          state.nextPage = undefined;
          state.prevPage = undefined;
          state.pagesCount = 0;
          state.currentPageNumber = 0;
        } else if (action.payload.items.length < 1) {
          state.error = 'Sorry! I found nothing! ¯\\_O_o_/¯';
          state.cards = [];
          state.nextPage = undefined;
          state.prevPage = undefined;
          state.pagesCount = 0;
          state.currentPageNumber = 0;
        } else {
          (state.cards as IVideoItem[]) = action.payload.items;
          (state.nextPage as string | undefined) = action.payload.nextPageToken;
          (state.prevPage as string | undefined) = action.payload.prevPageToken;
          if (state.pagesCount < 1) {
            state.pagesCount = Math.ceil(
              action.payload.pageInfo.totalResults / action.payload.pageInfo.resultsPerPage
            );
          }
          state.error = '';
          if (state.currentPageNumber < 1) {
            state.currentPageNumber = 1;
          }
        }
        state.isLoading = false;
      })
      .addCase(fetchYoutube.rejected, (state, action: PayloadAction<unknown>) => {
        (state.error as unknown) = action.payload;
        state.isLoading = false;
        state.currentPageNumber = 0;
      });
  },
});
