import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';
import { Main } from 'App/pages/Main';

const onChange = jest.fn();
const onSearchApply = jest.fn();

describe('Search component', () => {
  it('search render', () => {
    render(<Search value="" onChange={onChange} onSearchApply={onSearchApply} />);
  });

  it('should onChange works', () => {
    render(<Search value="" onChange={onChange} onSearchApply={onSearchApply} />);
    userEvent.type(screen.getByRole('searchbox'), 'react');
    expect(onChange).toHaveBeenCalledTimes(5);
  });

  it('typing in searchbox work', () => {
    render(<Search value="" onChange={onChange} onSearchApply={onSearchApply} />);
    expect(screen.queryByDisplayValue(/nike/i)).toBeNull();
    userEvent.type(screen.getByRole('searchbox'), 'Nike');
    expect(screen.queryByDisplayValue(/nike/i)).toBeInTheDocument();
  });

  it('Search works', async () => {
    render(<Main />);
    screen.queryAllByText(/reebok/i);
    screen.queryAllByText(/nike/i);
    const itemsNike = await screen.findAllByText(/nike/i);
    itemsNike.forEach((item) => {
      expect(item).toBeInTheDocument();
    });
    screen.queryAllByText(/reebok/i);
  });

  it('button exist on page', () => {
    render(<Search value="" onChange={onChange} onSearchApply={onSearchApply} />);
    screen.getByRole('button', { name: /search/i });
  });
});
