import React from 'react';
import { render, screen } from '@testing-library/react';
import { Layout } from './Layout';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

describe('Layout component', () => {
  it('header should exist', () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
        </Routes>
      </BrowserRouter>
    );
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('footer should exist', () => {
    const { container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
        </Routes>
      </BrowserRouter>
    );
    expect(container.querySelector('footer')).toBeInTheDocument();
  });
});
