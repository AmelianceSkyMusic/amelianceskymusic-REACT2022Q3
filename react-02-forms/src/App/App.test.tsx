import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { App } from './App';

describe('App component', () => {
  it('app should render navigation', () => {
    render(<App />, { wrapper: BrowserRouter });
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout.getAttribute('href')).toBe('/about');
  });
  it('show 404 if bad route', () => {
    const badRoute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });
});
