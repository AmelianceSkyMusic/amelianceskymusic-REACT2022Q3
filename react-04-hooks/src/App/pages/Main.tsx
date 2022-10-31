import React, { useEffect, useRef, useState } from 'react';
import api from 'App/api';
import { Card } from 'App/components/Card';
import { IVideoItem } from 'App/types/IYoutubeResponse';
import { Search } from 'App/components/Search';
import { Loader } from 'App/components/Loader';
import './Main.css';
import { getScrollDIrection } from 'asmlib/asm-scripts/getScrollDirection';

export function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cards, setCards] = useState<IVideoItem[]>([]);

  const [cardsCount, setCardsCount] = useState(0);
  const cardsCountRef = useRef<number>();
  cardsCountRef.current = cardsCount;

  const [isLastPage, setIsLastPage] = useState(false);
  const isLastPageRef = useRef<boolean>();
  isLastPageRef.current = isLastPage;

  const [nextPage, setNextPage] = useState<string | undefined>();
  const nextPageRef = useRef<string | undefined>();
  nextPageRef.current = nextPage;

  const [isScrollLoading, setIsScrollLoading] = useState(false);
  const isScrollLoadingRef = useRef<boolean>();
  isScrollLoadingRef.current = isScrollLoading;

  const [searchValue, setSearchValue] = useState(localStorage.getItem('searchValue') || '');
  const searchValueRef = useRef<string>();
  searchValueRef.current = searchValue;
  const [isSearchApplied, setIsSearchApplied] = useState(false);

  const getFetchedData = async (searchValue: string, nextPageArg?: string) => {
    const response = await api.google.youtube.get(searchValue, nextPageArg);
    if (response && !response.error) {
      if (nextPageArg) {
        setCards((prevCards) => [...prevCards, ...response.items]);
      } else {
        setCards(response.items);
      }

      const currentCardsCount = (cardsCountRef.current as number) + response.items.length;
      const totalCardsCount = response.pageInfo.totalResults;
      setCardsCount((prevCardsCount) => prevCardsCount + response.items.length);

      if (currentCardsCount < totalCardsCount) {
        setIsLastPage(false);
      } else {
        setIsLastPage(true);
      }

      setNextPage(response.nextPageToken);
      setIsSearchApplied(true);
      setIsScrollLoading(false);
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

    setIsLoading(false);
  };

  useEffect(() => {
    if (searchValueRef.current) {
      getFetchedData(searchValueRef.current);
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
          console.log('do fetch');
          setIsLoading(true);
          getFetchedData(nextSearchValue);
        } else {
          console.log('clear');
          setCards([]);
          setIsSearchApplied(true);
        }
      }
    }
  };

  const scrollHandler = (event: Event) => {
    const target = event?.target as Document;
    const scrollHeight = target.documentElement.scrollHeight;
    const scrollTop = target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    const scrollDirection = getScrollDIrection();
    if (
      !isLastPageRef.current &&
      !isScrollLoadingRef.current &&
      scrollDirection === 'DOWN' &&
      scrollHeight - (scrollTop + innerHeight) < 100
    ) {
      setIsScrollLoading(true);
      if (searchValueRef.current) {
        getFetchedData(searchValueRef.current, nextPageRef.current);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function cleanup() {
      document.removeEventListener('scroll', scrollHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <main className="main-page">
      <h1>ПОШУКАЙ</h1>
      <Search value={searchValue} onChange={handleSearchChange} onKeyDown={handlerSearchApply} />
      <section className="cards">
        {isError && <h3 className="h3 error">{errorMessage || 'Sorry! Something went wrong!'}</h3>}
        {isLoading
          ? isSearchApplied && <Loader />
          : cards?.length > 0 && cards.map((card, i) => <Card key={`${card.id}-${i}`} {...card} />)}
      </section>
      {cards?.length > 0 && isScrollLoading && !isLastPage && <h2>LOADING...</h2>}
    </main>
  );
}
