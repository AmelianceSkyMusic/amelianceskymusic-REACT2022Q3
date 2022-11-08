import './Main.scss';
import React, { useEffect, useRef, useState } from 'react';
import api from 'App/api';
import { IVideoItem } from 'App/types/IYoutubeResponse';
import { Search } from 'App/components/Search';
import { Loader } from 'App/components/Loader';
import { MainCard } from './MainCard';
import { useMainPageContext } from 'App/store/MainPageContext';

export function Main() {
  const state = useMainPageContext();
  console.log('state:', state);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cards, setCards] = useState<IVideoItem[]>([]);

  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '');

  const [isSearchApplied, setIsSearchApplied] = useState(false);

  const getFetchedData = async (searchValue: string, nextPageArg?: string) => {
    const response = await api.google.youtube.get(searchValue, nextPageArg);

    if (response && !response.error) {
      if (nextPageArg) {
        setCards((prevCards) => [...prevCards, ...response.items]);
      } else {
        setCards(response.items);
      }
    } else if (response && response.error) {
      setIsError(true);
      if (response.error.code === 403) {
        setErrorMessage(
          "That's it! Come back tomorrow. Google quotas for queries are not infinite! ¯\\_(ツ)_/¯"
        );
      } else {
        setErrorMessage(response.error.message);
      }
    } else {
      setIsError(true);
    }

    setIsSearchApplied(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (state) {
      setIsSearchApplied(true);
      getFetchedData(searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlerSearchApply = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const prevSearchValue = localStorage.getItem('searchValue');
      const nextSearchValue = searchValue.trim();

      localStorage.setItem('searchValue', nextSearchValue);

      //* prevent to do something if search value do not changed
      if (prevSearchValue !== nextSearchValue) {
        //* do fetch if search value is not empty
        if (nextSearchValue) {
          setIsLoading(true);
          setIsSearchApplied(true);
          getFetchedData(nextSearchValue);
        } else {
          setCards([]);
          setIsSearchApplied(false);
        }
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <main className="main-page main">
      <div className="container">
        <h1 className="h1">ПОШУКАЙ</h1>
        <Search value={searchValue} onChange={handleSearchChange} onKeyDown={handlerSearchApply} />
        <section className="cards">
          {isError && (
            <h3 className="h3 error">{errorMessage || 'Sorry! Something went wrong!'}</h3>
          )}
          {isLoading
            ? isSearchApplied && <Loader />
            : cards?.length > 0 &&
              cards.map((card, i) => <MainCard key={`${card.id}-${i}`} {...card} />)}
        </section>
      </div>
    </main>
  );
}
