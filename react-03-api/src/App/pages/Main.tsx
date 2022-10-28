import React, { Component } from 'react';
import api from 'App/api';
import { Card } from 'App/components/Card';
import { ICard } from 'App/types/ICard';
import { Search } from 'App/components/Search';
import { Loader } from 'App/components/Loader';
import './Main.css';
import { getScrollDIrection } from 'asmlib/asm-scripts/getScrollDirection';
interface IState {
  initCards: ICard[];
  cards: ICard[];
  isLoaded: boolean;
  isScrollLoading: boolean;
  searchValue: string;
  isSearchApplied: boolean;
  isError: boolean;
  sorting:
    | null
    | 'date-posted-asc'
    | 'date-posted-desc'
    | 'date-taken-asc'
    | 'date-taken-asc'
    | 'date-taken-desc'
    | 'interestingness-desc'
    | 'interestingness-asc'
    | 'relevance';
  pages: null | number;
  page: number;
}
export class Main extends Component<unknown, IState> {
  constructor(props: unknown) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.searchApplyHandler = this.searchApplyHandler.bind(this);
    this.searchOnChangeHandler = this.searchOnChangeHandler.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
    this.state = {
      initCards: [],
      cards: [],
      isLoaded: false,
      isScrollLoading: false,
      searchValue: localStorage.getItem('searchValue') || '',
      isSearchApplied: false,
      sorting: null,
      pages: null,
      page: 1,
      isError: false,
    };
  }

  async fetchData(pageIncrement: number) {
    if (this.state.searchValue.trim() !== '') {
      try {
        const response = await api.flickr.getPhotos({
          text: this.state.searchValue,
          page:
            this.state.pages && this.state.page + pageIncrement > this.state.pages
              ? 1
              : this.state.page + pageIncrement,
          sort: 'relevance',
          perPage: 200,
        });
        const { photo, pages, page } = response.photos;

        console.log(`page: ${page}/${pages} ?`);

        this.setState((state) => ({
          initCards: photo,
          page:
            state.pages && state.page + pageIncrement > state.pages
              ? 1
              : state.page + pageIncrement,
          pages: pages,
          cards: [...state.cards, ...photo],
          isLoaded: true,
          isScrollLoading: false,
          isSearchApplied: false,
        }));
      } catch (error) {
        this.setState({ isError: true, isLoaded: true, isSearchApplied: false });
      }
    }
  }

  async componentDidMount() {
    if (this.state.searchValue.trim() !== '') {
      this.setState({ isSearchApplied: true });
    }
    this.fetchData(0);
    document.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandler);
  }

  async searchApplyHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      localStorage.setItem('searchValue', this.state.searchValue);
      this.setState({ isLoaded: false });
      if (this.state.searchValue.trim() !== '') {
        this.setState({ isSearchApplied: true, cards: [] });
      }
      this.fetchData(0);
    }
  }

  searchOnChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const elem = event.target as HTMLInputElement;
    const searchValue = elem.value;
    this.setState({ searchValue: searchValue });
  }

  scrollHandler(event: Event) {
    const target = event?.target as Document;
    const scrollHeight = target.documentElement.scrollHeight;
    const scrollTop = target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;
    const scrollDirection = getScrollDIrection();
    if (
      !this.state.isScrollLoading &&
      scrollDirection &&
      scrollHeight - (scrollTop + innerHeight) < 100
    ) {
      this.setState({ isScrollLoading: true });
      this.fetchData(1);
    }
  }

  render() {
    const { cards, isLoaded, isScrollLoading, searchValue, isError, isSearchApplied } = this.state;

    return (
      <div className="main-page">
        <h1>ПОШУКАЙ</h1>
        <Search
          value={searchValue}
          onApply={this.searchApplyHandler}
          onChange={this.searchOnChangeHandler}
        />

        <div className="cards">
          {isError && <p>Something went wrong!</p>}
          {isLoaded
            ? cards?.length > 0 &&
              cards.map((card, i) => <Card key={`${card.id}-${i}`} {...card} />)
            : isSearchApplied && <Loader />}
        </div>
        {cards?.length > 0 && isScrollLoading && <h2>LOADING...</h2>}
      </div>
    );
  }
}
