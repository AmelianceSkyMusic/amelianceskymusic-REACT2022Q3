import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from '../Form';

describe('Page', () => {
  it('should render page', () => {
    render(<Form />);
    const form = screen.getByTestId('form');
    expect(form).toBeInTheDocument();
  });
});

describe('Submit button', () => {
  let submitButton: HTMLInputElement;
  global.URL.createObjectURL = jest.fn();

  beforeEach(() => {
    render(<Form />);
    submitButton = screen.getByText(/Create Card/i);
  });

  it('submit button should exist', () => {
    expect(submitButton).toBeInTheDocument();
  });

  it('should be disabled on render', () => {
    expect(submitButton).toBeDisabled();
  });

  it('should be enabled after change input', () => {
    expect(submitButton).toBeDisabled();
    const firstName: HTMLInputElement = screen.getByTestId('first-name');
    userEvent.type(firstName, 'Amliance SkyMusic{enter}');
    expect(submitButton).toBeEnabled();
  });
});

describe('Your Name text input', () => {
  it('should be able to type into text input', () => {
    render(<Form />);
    const firstName: HTMLInputElement = screen.getByTestId('first-name');
    userEvent.type(firstName, 'Amliance SkyMusic');
    expect(firstName.value).toBe('Amliance SkyMusic');
  });
});

describe('Your Favorite Date date input', () => {
  it('should be able to set date', () => {
    render(<Form />);
    const birthday: HTMLInputElement = screen.getByTestId('birthday');
    fireEvent.change(birthday, { target: { value: '2012-12-12' } });
    expect(birthday.value).toBe('2012-12-12');
  });
});

describe('Your Birthday Date date input', () => {
  it('should be able to select date', () => {
    render(<Form />);
    const framework: HTMLSelectElement = screen.getByTestId('framework');
    fireEvent.change(framework, { target: { value: 'React' } });
    expect(framework.value).toBe('React');
  });
});

describe('I Am A Good Person checkbox input', () => {
  it('should be able to check checkbox', () => {
    render(<Form />);
    const good: HTMLInputElement = screen.getByTestId('good');
    expect(good.checked).toBe(false);
    userEvent.click(good);
    expect(good.checked).toBe(true);
  });
});

describe('Male/Female switcher input based on checkbox', () => {
  it('should be able to change switcher', () => {
    render(<Form />);
    const showSex: HTMLInputElement = screen.getByTestId('show-sex');
    expect(showSex.checked).toBe(false);
    userEvent.click(showSex);
    expect(showSex.checked).toBe(true);
  });
});

describe('Your Age radiobutton inputs', () => {
  it('should be able to select radio button', () => {
    render(<Form />);
    const showSex: HTMLInputElement = screen.getByTestId('show-sex');
    userEvent.click(showSex);
    const sex = screen.getByLabelText('Male');
    expect(sex).not.toBeChecked();
    userEvent.click(sex);
    expect(sex).toBeChecked();
  });
});
