import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loader } from '../Loader';

describe('Search component', () => {
  it('renders learn react link', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
