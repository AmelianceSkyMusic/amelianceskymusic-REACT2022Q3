import './Main.scss';
import React, { useEffect } from 'react';
import api from 'App/api';
import { Search } from 'App/components/Search';
import { Loader } from 'App/components/Loader';
import { MainCard } from './MainCard';
import { Dropdown } from 'App/components/Dropdown';
import { useTypedSelector } from 'App/store/hooks/useTypedSelector';
import { useTypedDispatch } from 'App/store/hooks/useTypedDispatch';
import { IVideoItem } from 'App/types/IYoutubeResponse';
import { mainPageSlice } from 'App/store/mainPage/mainPageSlice';

export function Main() {
  const state = useTypedSelector((state) => state.mainPageReducer);
  const { actions } = mainPageSlice;
  const dispatch = useTypedDispatch();

  const getFetchedData = async (
    searchValue: string,
    maxResults: string,
    order: string,
    nextPage?: string
  ) => {
    const response = await api.google.youtube.get({
      search: searchValue,
      goToPageToken: nextPage,
      maxResults,
      order,
    });

    if (response && !response.error) {
      if (response.items.length > 0) {
        dispatch(actions.setCards(response.items));
        dispatch(actions.setIsErrorFalse());
        dispatch(actions.setNextPage(response.nextPageToken));
        dispatch(actions.setPrevPage(response.prevPageToken));
      } else {
        dispatch(actions.setErrorMessage('Sorry! I found nothing!  ¯\\_O_o_/¯'));
        dispatch(actions.setIsErrorTrue());
        dispatch(actions.setCards([]));
      }
      if (response.items.length > 0 && response.nextPageToken) {
        dispatch(
          actions.setPagesCount(
            Math.ceil(response.pageInfo.totalResults / response.pageInfo.resultsPerPage) || 0
          )
        );
      }
      if (!response.nextPageToken && !response.prevPageToken) {
        dispatch(actions.setPagesCount(0));
        dispatch(actions.setCurrentPageNumber(0));
      }
    } else if (response && response.error) {
      dispatch(actions.setIsErrorTrue());
      dispatch(actions.setCards([]));
      dispatch(actions.setCurrentPageNumber(0));
      if (response.error.code === 403) {
        dispatch(
          actions.setErrorMessage(
            "That's it! Come back tomorrow. Google quotas for queries are not infinite! ¯\\_O_o_/¯"
          )
        );
      } else {
        dispatch(actions.setErrorMessage(response.error.message));
      }
    } else {
      dispatch(actions.setIsErrorTrue());
      dispatch(actions.setCards([]));
      dispatch(actions.setCurrentPageNumber(0));
    }

    dispatch(actions.setIsSearchAppliedTrue());
    dispatch(actions.setIsLoadingFalse());
  };

  useEffect(() => {
    if (state.searchValue) {
      dispatch(actions.setIsSearchAppliedTrue());
      getFetchedData(state.searchValue, state.cardsPerPage, state.sortingType, state.currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.cardsPerPage, state.sortingType, state.currentPage]);

  const handlerSearchApply = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const prevSearchValue = localStorage.getItem('searchValue');
      const nextSearchValue = state.searchValue?.trim();
      localStorage.setItem('searchValue', nextSearchValue);
      dispatch(actions.setCurrentPage(undefined));
      dispatch(actions.setPagesCount(0));
      dispatch(actions.setCurrentPageNumber(0));

      //* prevent to do something if search value do not changed
      if (prevSearchValue !== nextSearchValue) {
        //* do fetch if search value is not empty
        if (nextSearchValue) {
          dispatch(actions.setIsLoadingTrue());
          dispatch(actions.setIsSearchAppliedTrue());
          dispatch(actions.setCurrentPageNumber(1));
          getFetchedData(nextSearchValue, state.cardsPerPage, state.sortingType, state.currentPage);
        } else {
          dispatch(actions.setCards([]));
          dispatch(actions.setIsSearchAppliedFalse());
          dispatch(actions.setIsErrorFalse());
        }
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setSearchValue(event.target.value));
  };

  const handleNextPage = () => {
    if (state.nextPage && state.currentPageNumber < state.pagesCount) {
      dispatch(actions.setCurrentPage(state.nextPage));
      dispatch(actions.setCurrentPageNumber(state.currentPageNumber + 1));
    }
  };

  const handlePrevPage = () => {
    if (state.prevPage && state.currentPageNumber > 0) {
      dispatch(actions.setCurrentPage(state.prevPage));
      dispatch(actions.setCurrentPageNumber(state.currentPageNumber - 1));
    }
  };

  return (
    <main className="main-page main">
      <div className="container">
        <h1 className="h1">ПОШУКАЙ</h1>
        <Search
          value={state.searchValue}
          onChange={handleSearchChange}
          onKeyDown={handlerSearchApply}
        />
        <Dropdown
          selected={state.sortingType}
          onChange={() => dispatch(actions.setSortingType())}
          options={['date', 'rating', 'relevance', 'title', 'videoCount', 'viewCount']}
        >
          Sorting:
        </Dropdown>
        <Dropdown
          selected={state.cardsPerPage}
          onChange={() => dispatch(actions.setCardsPerPage())}
          options={['1', '2', '3', '4', '5']}
        >
          Items per page:
        </Dropdown>
        <div className="pages">
          <button
            className="button first-page"
            disabled={!state.prevPage || state.isError}
            onClick={handlePrevPage}
          >
            Prev
          </button>
          <h4 className="h4">
            {state.currentPageNumber} / {state.pagesCount}
          </h4>
          <button
            className="button next-page"
            disabled={(!state.nextPage && !(state.pagesCount > 0)) || state.isError}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
        <section className="cards row">
          {state.isError && (
            <h3 className="h3 error">{state.errorMessage || 'Sorry! Something went wrong!'}</h3>
          )}
          {state.isLoading
            ? state.isSearchApplied && <Loader />
            : state.cards?.length > 0 &&
              state.cards.map((card: IVideoItem, i) => (
                <MainCard key={`${card.id}-${i}`} {...card} />
              ))}
        </section>
      </div>
    </main>
  );
}
