import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../NotFound';

describe('NotFoundPage component', () => {
  it('render page', () => {
    render(<NotFound />);
    const pageHeading = screen.getByText(/40/i);
    expect(pageHeading).toBeInTheDocument();
  });
});
