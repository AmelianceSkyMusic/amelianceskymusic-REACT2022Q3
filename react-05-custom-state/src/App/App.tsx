import './App.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './pages/About';
import { Main } from './pages/Main';
import { Form } from './pages/Form';
import { NotFound } from './pages/NotFound';
import { MainPageProvider } from './store/MainPageState';

export function App() {
  return (
    <MainPageProvider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="about" element={<About />} />
            <Route path="form" element={<Form />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </MainPageProvider>
  );
}
