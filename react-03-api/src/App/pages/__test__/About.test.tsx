import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../About';
describe('About component', () => {
  it('render page', () => {
    render(<About />);
    const pageHeading = screen.getByText(/about/i);
    expect(pageHeading).toBeInTheDocument();
  });
});
