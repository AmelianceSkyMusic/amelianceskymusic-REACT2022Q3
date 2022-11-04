import './Search.scss';
import React from 'react';
import { useState } from 'react';

interface ISearchProps {
  value?: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function Search({ value, onChange, onKeyDown, placeholder = 'Search...' }: ISearchProps) {
  const [inputValue, setInputValue] = useState(value || '');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const elem = event.target as HTMLInputElement;
    setInputValue(elem.value);
    onChange(event);
  };

  return (
    <input
      className="p1 search"
      type="search"
      value={inputValue}
      onKeyDown={onKeyDown}
      onChange={handleSearchChange}
      placeholder={placeholder}
    ></input>
  );
}
