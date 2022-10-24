import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Main } from '../Main';
import api from 'App/api';
class LocalStorage {
  store: { [key: string]: string };
  constructor() {
    this.store = {};
  }
  getItem(key: string) {
    return this.store[key] || null;
  }
  setItem(key: string, value: string) {
    this.store[key] = value.toString();
  }
  removeItem(key: string) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}
describe('Local Storage', () => {
  Object.defineProperty(window, 'localStorage', {
    value: new LocalStorage(),
  });
  it('should set and get data', async () => {
    const { rerender } = render(<Main />);
    await screen.findAllByText(/nike/i);
    userEvent.type(screen.getByPlaceholderText('Search'), 'Nike');
    rerender(<Main />);
    expect(screen.getByPlaceholderText('Search')).toHaveDisplayValue('Nike');
    userEvent.clear(screen.getByPlaceholderText('Search'));
    userEvent.type(screen.getByPlaceholderText('Search'), 'Reebok');
    rerender(<Main />);
    expect(screen.getByPlaceholderText('Search')).toHaveDisplayValue('Reebok');
    userEvent.click(screen.getByRole('button'));
  });
});
describe('Fetch', () => {
  it('should return data', async () => {
    const response = await api.google.getSheetData({
      sheetId: '11IF6n311xG3ycdE_mOQaZizL7NFzeynvFu2ni1sghQ0',
    });
    expect(response).not.toBeNull();
  });
  it('should return error', async () => {
    const response = await api.google.getSheetData({
      sheetId: '00000000000000',
    });
    expect(response).toBeUndefined();
  });
});
