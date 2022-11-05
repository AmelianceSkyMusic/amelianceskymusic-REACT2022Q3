import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '../Search';

const handleSearchApply = jest.fn();
const handleSearchOnChange = jest.fn();

describe('Search component', () => {
  it('search render', () => {
    render(<Search value="" onKeyDown={handleSearchApply} onChange={handleSearchOnChange} />);
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should onChange works', () => {
    render(<Search value="" onKeyDown={handleSearchApply} onChange={handleSearchOnChange} />);
    userEvent.type(screen.getByRole('searchbox'), 'Cars');
    expect(handleSearchOnChange).toHaveBeenCalledTimes(4);
  });

  it('typing in searchbox work', () => {
    render(<Search value="" onKeyDown={handleSearchApply} onChange={handleSearchOnChange} />);
    expect(screen.queryByDisplayValue(/react/i)).toBeNull();
    userEvent.type(screen.getByRole('searchbox'), 'Cars');
    expect(screen.queryByDisplayValue(/cars/i)).toBeInTheDocument();
  });
});
