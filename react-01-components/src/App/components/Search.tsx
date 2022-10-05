import React, { Component } from 'react';

interface ISearchProps {
  onChange: (value: string) => void;
}

interface ISearchState {
  value: string;
}

export default class Search extends Component<ISearchProps, ISearchState> {
  state: ISearchState = {
    value: '',
  };

  handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const elem = event.target as HTMLInputElement;
    this.setState({ value: elem.value });
    this.props.onChange(elem.value);
  }

  render() {
    const { value } = this.state;
    return (
      <div className="search">
        <button>Search</button>
        <input
          type="search"
          value={value}
          onChange={(event) => this.handleSearchChange(event)}
          placeholder="Search"
        ></input>
      </div>
    );
  }
}
