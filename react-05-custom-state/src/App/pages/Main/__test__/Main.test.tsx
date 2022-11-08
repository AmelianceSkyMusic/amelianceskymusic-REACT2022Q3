import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Main } from '../Main';
import { responseMock } from '../../../../__mocks__/responseMock';

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
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: new LocalStorage(),
    });
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        () => Promise.resolve({ json: () => Promise.resolve(responseMock) }) as Promise<Response>
      ) as jest.Mock;
  });

  it('should set and get data to Local Storage', async () => {
    const { rerender, unmount } = render(<Main />);
    expect(screen.queryByRole('img')).toBeNull();
    userEvent.type(screen.getByPlaceholderText(/Search/i), 'Ameliance SkyMusic{enter}'); // do fetch ¯\_(ツ)_/¯ but should not do request to server
    rerender(<Main />);
    expect(screen.getByPlaceholderText(/Search/i)).toHaveDisplayValue('Ameliance SkyMusic');
    unmount();
    cleanup();
  });
});

describe('Search', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: new LocalStorage(),
    });
    localStorage.removeItem('searchValue'); // clear locals storage for fixing bugs
    jest
      .spyOn(global, 'fetch')
      .mockImplementation(
        () => Promise.resolve({ json: () => Promise.resolve(responseMock) }) as Promise<Response>
      ) as jest.Mock;
  });
  it('should search typing work', async () => {
    const { unmount } = render(<Main />);
    expect(screen.queryByRole('img')).toBeNull();
    userEvent.type(screen.getByPlaceholderText(/Search/i), 'Ameliance SkyMusic');
    expect(screen.getByPlaceholderText(/Search/i)).toHaveDisplayValue('Ameliance SkyMusic');
    unmount();
    cleanup();
  });
});
