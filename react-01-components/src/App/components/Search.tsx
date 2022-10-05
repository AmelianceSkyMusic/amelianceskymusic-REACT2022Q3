import React, { Component } from 'react';

interface ISearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface ISearchState {
  value: string;
}

export default class Search extends Component<ISearchProps, ISearchState> {
  state: ISearchState = {
    value: this.props.value,
  };

  handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange(event);
    const elem = event.target as HTMLInputElement;
    this.setState({ value: elem.value });
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
