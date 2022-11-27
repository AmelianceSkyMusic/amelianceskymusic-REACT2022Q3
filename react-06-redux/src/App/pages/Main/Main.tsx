import './Main.scss';
import React, { useEffect } from 'react';
import { Search } from 'App/components/Search';
import { Loader } from 'App/components/Loader';
import { MainCard } from './MainCard';
import { Dropdown } from 'App/components/Dropdown';
import { useTypedSelector } from 'App/store/hooks/useTypedSelector';
import { useTypedDispatch } from 'App/store/hooks/useTypedDispatch';
import { IVideoItem } from 'App/types/IYoutubeResponse';
import { mainPageSlice } from 'App/store/mainPage/mainPageSlice';
import { fetchYoutube } from 'App/store/mainPage/actions/fetchYoutube';

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
    dispatch(
      fetchYoutube({
        search: searchValue,
        goToPageToken: nextPage,
        maxResults,
        order,
      })
    );

    dispatch(actions.setIsSearchAppliedTrue());
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

      //* prevent to do something if search value do not changed
      if (prevSearchValue !== nextSearchValue) {
        //* do fetch if search value is not empty
        if (nextSearchValue) {
          dispatch(actions.setIsSearchAppliedTrue());
          getFetchedData(nextSearchValue, state.cardsPerPage, state.sortingType, state.currentPage);
        } else {
          dispatch(actions.setIsSearchAppliedFalse());
        }
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.setSearchValue(event.target.value));
  };
  const handleSortingChange = (select: string) => {
    dispatch(actions.setSortingType(select));
  };
  const handleCardsPerpageChange = (select: string) => {
    dispatch(actions.setCardsPerPage(select));
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
          onChange={handleSortingChange}
          options={['date', 'rating', 'relevance', 'title', 'videoCount', 'viewCount']}
          disabled={!!state.error}
        >
          Sorting:
        </Dropdown>
        <Dropdown
          selected={state.cardsPerPage}
          onChange={handleCardsPerpageChange}
          options={['1', '2', '3', '4', '5']}
          disabled={!!state.error}
        >
          Cards per page:
        </Dropdown>
        <div className="pages">
          <button
            className="button first-page"
            disabled={!state.prevPage || !!state.error}
            onClick={handlePrevPage}
          >
            Prev
          </button>
          <h4 className="h4">
            {state.currentPageNumber} / {state.pagesCount}
          </h4>
          <button
            className="button next-page"
            disabled={!state.nextPage || !!(state.pagesCount < 1) || !!state.error}
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
        <section className="cards row">
          {state.error && <h3 className="h3 error">{state.error}</h3>}
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
