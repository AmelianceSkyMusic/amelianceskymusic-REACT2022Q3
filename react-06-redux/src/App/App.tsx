import './App.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { About } from './pages/About';
import { Main } from './pages/Main';
import { Form } from './pages/Form';
import { NotFound } from './pages/NotFound';
import { MainCardPageLayout } from './pages/Main/MainCardPageLayout';
import { MainCardPage } from './pages/Main/MainCardPage';
import { store } from './store/store';
import { Provider } from 'react-redux';

export function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="about" element={<About />} />
            <Route path="form" element={<Form />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/" element={<MainCardPageLayout />}>
            <Route path="card/:id" element={<MainCardPage />} />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}
