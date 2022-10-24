import React, { Component } from 'react';

interface ISearchProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchApply: () => void;
}

export class Search extends Component<ISearchProps> {
  handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.onChange(event);
    const elem = event.target as HTMLInputElement;
    this.setState({ value: elem.value });
  }

  render() {
    const { value } = this.props;
    return (
      <div className="search">
        <button onClick={this.props.onSearchApply}>Search</button>
        <input
          type="search"
          value={value}
          onChange={this.handleSearchChange}
          placeholder="Search"
        ></input>
      </div>
    );
  }
}
