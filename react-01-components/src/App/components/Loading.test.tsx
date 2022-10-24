import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Search component', () => {
  it('renders learn react link', () => {
    render(<Loading />);
    const linkElement = screen.getByText(/loading/i);
    expect(linkElement).toBeInTheDocument();
  });
});
