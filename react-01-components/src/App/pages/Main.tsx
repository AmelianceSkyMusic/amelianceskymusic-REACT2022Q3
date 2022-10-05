import './Main.css';
import api from 'App/api';
import { Card } from 'App/components/Card';
import { ICard } from 'App/types/ICard';
import React, { Component } from 'react';
import Search from 'App/components/Search';

interface IState {
  cards: ICard[];
  isLoaded: boolean;
  searchValue: string;
}
export class Main extends Component {
  state: IState = {
    cards: [],
    isLoaded: false,
    searchValue: '',
  };

  async componentDidMount() {
    const searchValue = localStorage.getItem('searchValue');
    console.log('searchValue:', searchValue);

    if (searchValue) this.setState({ searchValue: searchValue });

    try {
      const response = await api.google.getSheetData({
        sheetId: '11IF6n311xG3ycdE_mOQaZizL7NFzeynvFu2ni1sghQ0',
      });
      const dataArr = api.google.convertors.convertDataToArrayOfObjects(response);
      this.setState({ cards: dataArr, isLoaded: true });
    } catch (error) {
      console.log('error: ', error);
    }
  }

  componentWillUnmount() {
    localStorage.setItem('searchValue', this.state.searchValue);
  }

  handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const elem = event.target as HTMLInputElement;
    console.log(elem);
    this.setState({ value: elem.value });
  }

  render() {
    const { cards, isLoaded, searchValue } = this.state;

    return (
      <div className="main-page">
        <h1>Main</h1>
        <Search value={searchValue} onChange={this.handleSearchChange.bind(this)}></Search>
        <div className="cards">
          {isLoaded ? (
            cards?.length > 0 && cards.map((card) => <Card key={card.id} {...card} />)
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  }
}
