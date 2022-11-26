import './Main.scss';
import React, { useEffect } from 'react';
import api from 'App/api';
import { Search } from 'App/components/Search';
import { Loader } from 'App/components/Loader';
import { MainCard } from './MainCard';
import { useMainPageContext } from 'App/store/MainPageState';
import { Dropdown } from 'App/components/Dropdown';

export function Main() {
  const state = useMainPageContext();

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
        state.setCards(response.items);
        state.setIsErrorFalse();
        state.setNextPage(response.nextPageToken);
        state.setPrevPage(response.prevPageToken);
      } else {
        state.setErrorMessage('Sorry! I found nothing!  ¯\\_O_o_/¯');
        state.setIsErrorTrue();
        state.setCards([]);
      }
      if (response.items.length > 0 && response.nextPageToken) {
        state.setPagesCount(
          Math.ceil(response.pageInfo.totalResults / response.pageInfo.resultsPerPage) || 0
        );
      }
      if (!response.nextPageToken && !response.prevPageToken) {
        state.setPagesCount(0);
        state.setCurrentPageNumber(0);
      }
    } else if (response && response.error) {
      state.setIsErrorTrue();
      state.setCards([]);
      state.setCurrentPageNumber(0);
      if (response.error.code === 403) {
        state.setErrorMessage(
          "That's it! Come back tomorrow. Google quotas for queries are not infinite! ¯\\_O_o_/¯"
        );
      } else {
        state.setErrorMessage(response.error.message);
      }
    } else {
      state.setIsErrorTrue();
      state.setCards([]);
      state.setCurrentPageNumber(0);
    }

    state.setIsSearchAppliedTrue();
    state.setIsLoadingFalse();
  };

  useEffect(() => {
    if (state.searchValue) {
      state.setIsSearchAppliedTrue();
      getFetchedData(state.searchValue, state.cardsPerPage, state.sortingType, state.currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.cardsPerPage, state.sortingType, state.currentPage]);

  const handlerSearchApply = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const prevSearchValue = localStorage.getItem('searchValue');
      const nextSearchValue = state.searchValue?.trim();
      localStorage.setItem('searchValue', nextSearchValue);
      state.setCurrentPage(undefined);
      state.setPagesCount(0);
      state.setCurrentPageNumber(0);

      //* prevent to do something if search value do not changed
      if (prevSearchValue !== nextSearchValue) {
        //* do fetch if search value is not empty
        if (nextSearchValue) {
          state.setIsLoadingTrue();
          state.setIsSearchAppliedTrue();
          state.setCurrentPageNumber(1);
          getFetchedData(nextSearchValue, state.cardsPerPage, state.sortingType, state.currentPage);
        } else {
          state.setCards([]);
          state.setIsSearchAppliedFalse();
          state.setIsErrorFalse();
        }
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    state.setSearchValue(event.target.value);
  };

  const handleNextPage = () => {
    if (state.nextPage && state.currentPageNumber < state.pagesCount) {
      state.setCurrentPage(state.nextPage);
      state.setCurrentPageNumber(state.currentPageNumber + 1);
    }
  };

  const handlePrevPage = () => {
    if (state.prevPage && state.currentPageNumber > 0) {
      state.setCurrentPage(state.prevPage);
      state.setCurrentPageNumber(state.currentPageNumber - 1);
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
          onChange={state.setSortingType}
          options={['date', 'rating', 'relevance', 'title', 'videoCount', 'viewCount']}
        >
          Sorting:
        </Dropdown>
        <Dropdown
          selected={state.cardsPerPage}
          onChange={state.setCardsPerPage}
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
              state.cards.map((card, i) => <MainCard key={`${card.id}-${i}`} {...card} />)}
        </section>
      </div>
    </main>
  );
}
