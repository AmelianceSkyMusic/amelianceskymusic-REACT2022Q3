import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout } from './components/Layout';
import { About } from './pages/About';
import { Main } from './pages/Main';
import { NotFoundPage } from './pages/NotFoundPage';

export class App extends Component {
  render() {
    return (
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    );
  }
}
