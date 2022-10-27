import React, { Component } from 'react';

interface ISearchProps {
  value: string;
  onApply: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
interface ISearchState {
  searchValue: string;
}

export class Search extends Component<ISearchProps, ISearchState> {
  constructor(props: ISearchProps) {
    super(props);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.state = {
      searchValue: this.props.value,
    };
  }

  handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const elem = event.target as HTMLInputElement;
    this.setState({ searchValue: elem.value });
    this.props.onChange(event);
  }

  render() {
    const { onApply } = this.props;
    const { searchValue } = this.state;
    return (
      <div className="search">
        <input
          type="search"
          value={searchValue}
          onKeyDown={onApply}
          onChange={this.handleSearchChange}
          placeholder="Search"
        ></input>
      </div>
    );
  }
}
