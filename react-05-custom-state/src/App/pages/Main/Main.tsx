import './Main.scss';
import React, { useEffect } from 'react';
import api from 'App/api';
import { Search } from 'App/components/Search';
import { Loader } from 'App/components/Loader';
import { MainCard } from './MainCard';
import { useMainPageContext } from 'App/store/MainPageState';

export function Main() {
  const state = useMainPageContext();
  console.log('state:', state);

  const getFetchedData = async (searchValue: string, nextPageArg?: string) => {
    const response = await api.google.youtube.get(searchValue, nextPageArg);

    console.log('response:', response);

    if (response && !response.error) {
      if (response.items.length > 0) {
        if (nextPageArg) {
          state.setCards([...state.cards, ...response.items]);
        } else {
          state.setCards(response.items);
        }
        state.setIsErrorFalse();
      } else {
        state.setErrorMessage('Sorry! I found nothing!  ¯\\_O_o_/¯');
        state.setIsErrorTrue();
        state.setCards([]);
      }
    } else if (response && response.error) {
      state.setIsErrorTrue();
      if (response.error.code === 403) {
        state.setErrorMessage(
          "That's it! Come back tomorrow. Google quotas for queries are not infinite! ¯\\_O_o_/¯"
        );
      } else {
        state.setErrorMessage(response.error.message);
      }
    } else {
      state.setIsErrorTrue();
    }

    state.setIsSearchAppliedTrue();
    state.setIsLoadingFalse();
  };

  useEffect(() => {
    if (state.searchValue) {
      state.setIsSearchAppliedTrue();
      getFetchedData(state.searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerSearchApply = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const prevSearchValue = localStorage.getItem('searchValue');
      const nextSearchValue = state.searchValue?.trim();
      if (nextSearchValue) localStorage.setItem('searchValue', nextSearchValue);

      //* prevent to do something if search value do not changed
      if (prevSearchValue !== nextSearchValue) {
        //* do fetch if search value is not empty
        if (nextSearchValue) {
          state.setIsLoadingTrue();
          state.setIsSearchAppliedTrue();
          getFetchedData(nextSearchValue);
        } else {
          state.setCards([]);
          state.setIsSearchAppliedFalse();
        }
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    state.setSearchValue(event.target.value);
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
        <section className="cards">
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
