import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFoundPage } from '../NotFoundPage';

describe('NotFoundPage component', () => {
  it('render page', () => {
    render(<NotFoundPage />);
    const pageHeading = screen.getByText(/404/i);
    expect(pageHeading).toBeInTheDocument();
  });
});
