import React, { Component } from 'react';
import api from 'App/api';
import { Card } from 'App/components/Card';
import { ICard } from 'App/types/ICard';
import { Search } from 'App/components/Search';
import { Loading } from 'App/components/Loading';
import './Main.css';

interface IState {
  initCards: ICard[];
  cards: ICard[];
  isLoaded: boolean;
  searchValue: string;
  error: string | null;
}
export class Main extends Component {
  state: IState = {
    initCards: [],
    cards: [],
    isLoaded: false,
    searchValue: localStorage.getItem('searchValue') || '',
    error: null,
  };

  async componentDidMount() {
    try {
      const response = await api.google
        .getSheetData({
          sheetId: '11IF6n311xG3ycdE_mOQaZizL7NFzeynvFu2ni1sghQ0',
        })
        .then((res) => api.google.convertors.convertDataToArrayOfObjects(res));
      this.setState({ initCards: response, cards: response, isLoaded: true });
    } catch (error) {
      this.setState({ error: error });
    }
  }

  componentWillUnmount() {
    localStorage.setItem('searchValue', this.state.searchValue);
  }

  handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const elem = event.target;
    const searchValue = elem.value;
    this.setState({ searchValue: searchValue });
  }

  handleSearchButtonApply() {
    const tempInitCards = [...this.state.initCards];
    const searchValue = this.state.searchValue;
    const filteredCards = tempInitCards.filter((card) => {
      return card.name?.toLowerCase().includes(searchValue.toLowerCase());
    });
    this.setState({ cards: filteredCards });
  }

  render() {
    const { cards, isLoaded, searchValue, error } = this.state;

    return (
      <div className="main-page">
        <h1>Main</h1>
        <Search
          value={searchValue}
          onChange={this.handleSearchChange.bind(this)}
          onSearchApply={this.handleSearchButtonApply.bind(this)}
        />

        <div className="cards">
          {error && <p>Something went wrong!</p>}
          {isLoaded ? (
            cards?.length > 0 && cards.map((card) => <Card key={card.id} {...card} />)
          ) : (
            <Loading />
          )}
        </div>
      </div>
    );
  }
}
