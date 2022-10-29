import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from '../Form';

describe('Page', () => {
  it('should render page', () => {
    render(<Form />);
    const pageHeading = screen.getByRole('heading', { name: /form/i });
    expect(pageHeading).toBeInTheDocument();
  });
});

describe('Submit button', () => {
  let submitButton: HTMLInputElement;

  beforeEach(() => {
    render(<Form />);
    submitButton = screen.getByText(/Create Your Beautiful Card/i);
  });

  it('submit button should exist', () => {
    expect(submitButton).toBeInTheDocument();
  });

  it('should be disabled on render', () => {
    expect(submitButton).toBeDisabled();
  });

  it('should be disabled after card create', async () => {
    expect(submitButton).toBeDisabled();
    const textInput: HTMLInputElement = screen.getByTestId('name-text-input');
    fireEvent.change(textInput, { target: { value: 'AmlianceSkyMusic' } });
    const dateInput: HTMLInputElement = screen.getByTestId('date-date-input');
    fireEvent.change(dateInput, { target: { value: '2012-12-12' } });
    const dropdownInput: HTMLSelectElement = screen.getByTestId('birthday-dropdown-input');
    fireEvent.change(dropdownInput, { target: { value: '01 January' } });
    const checkboxInput: HTMLInputElement = screen.getByTestId('good-person-checkbox-input');
    fireEvent.click(checkboxInput);
    const switcherInput: HTMLInputElement = screen.getByTestId('sex-switcher-input');
    fireEvent.click(switcherInput);
    const radioInput = screen.getByLabelText('55');
    fireEvent.click(radioInput);
    const file = new File(['image'], 'image.png', { type: 'image/png' });
    const fileInput: HTMLInputElement = screen.getByTestId('image-file-input');
    userEvent.upload(fileInput, file);
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
  });

  it('should be enabled after change input', () => {
    expect(submitButton).toBeDisabled();
    const textInput: HTMLInputElement = screen.getByPlaceholderText(/please, type your name/i);
    fireEvent.change(textInput, { target: { value: 'AmlianceSkyMusic' } });
    expect(submitButton).toBeEnabled();
  });

  it('should be disabled after press reset button', () => {
    expect(submitButton).toBeDisabled();
    const textInput: HTMLInputElement = screen.getByPlaceholderText(/please, type your name/i);
    fireEvent.change(textInput, { target: { value: 'AmlianceSkyMusic' } });
    expect(submitButton).toBeEnabled();
    const resetButton = screen.getByText(/Reset Current Form/i);
    fireEvent.click(resetButton);
    expect(submitButton).toBeDisabled();
  });
});

describe('Your Name text input', () => {
  it('should be able to type into text input', () => {
    render(<Form />);
    const textInput: HTMLInputElement = screen.getByTestId('name-text-input');
    fireEvent.change(textInput, { target: { value: 'AmlianceSkyMusic' } });
    expect(textInput.value).toBe('AmlianceSkyMusic');
  });
});

describe('Your Favorite Date date input', () => {
  it('should be able to set date', () => {
    render(<Form />);
    const dateInput: HTMLInputElement = screen.getByTestId('date-date-input');
    fireEvent.change(dateInput, { target: { value: '2012-12-12' } });
    expect(dateInput.value).toBe('2012-12-12');
  });
});

describe('Your Birthday Date date input', () => {
  it('should be able to select date', () => {
    render(<Form />);
    const dropdownInput: HTMLSelectElement = screen.getByTestId('birthday-dropdown-input');
    fireEvent.change(dropdownInput, { target: { value: '01 January' } });
    expect(dropdownInput.value).toBe('01 January');
  });
});

describe('I Am A Good Person checkbox input', () => {
  it('should be able to check checkbox', () => {
    render(<Form />);
    const checkboxInput: HTMLInputElement = screen.getByTestId('good-person-checkbox-input');
    expect(checkboxInput.checked).toBe(false);
    fireEvent.click(checkboxInput);
    expect(checkboxInput.checked).toBe(true);
  });
});

describe('Male/Female switcher input based on checkbox', () => {
  it('should be able to change switcher', () => {
    render(<Form />);
    const switcherInput: HTMLInputElement = screen.getByTestId('sex-switcher-input');
    expect(switcherInput.checked).toBe(false);
    fireEvent.click(switcherInput);
    expect(switcherInput.checked).toBe(true);
  });
});

describe('Your Age radiobutton inputs', () => {
  it('should be able to select radio button', () => {
    render(<Form />);
    const radioInput = screen.getByLabelText('55');
    expect(radioInput).not.toBeChecked();
    fireEvent.click(radioInput);
    expect(radioInput).toBeChecked();
  });
});

describe('Upload Your Avatarka file input', () => {
  it('should be able to upload a file', () => {
    render(<Form />);
    const file = new File(['image'], 'image.png', { type: 'image/png' });
    const fileInput: HTMLInputElement = screen.getByTestId('image-file-input');
    userEvent.upload(fileInput, file);
    if (fileInput.files) {
      expect(fileInput.files[0]).toStrictEqual(file);
      expect(fileInput.files.item(0)).toStrictEqual(file);
      expect(fileInput.files).toHaveLength(1);
    }
  });
});

describe('Card', () => {
  it('should create card', () => {
    render(<Form />);
    const submitButton = screen.getByText(/Create Your Beautiful Card/i);
    const textInput: HTMLInputElement = screen.getByTestId('name-text-input');
    fireEvent.change(textInput, { target: { value: 'AmlianceSkyMusic' } });
    const dateInput: HTMLInputElement = screen.getByTestId('date-date-input');
    fireEvent.change(dateInput, { target: { value: '2012-12-12' } });
    const dropdownInput: HTMLSelectElement = screen.getByTestId('birthday-dropdown-input');
    fireEvent.change(dropdownInput, { target: { value: '01 January' } });
    const checkboxInput: HTMLInputElement = screen.getByTestId('good-person-checkbox-input');
    fireEvent.click(checkboxInput);
    const switcherInput: HTMLInputElement = screen.getByTestId('sex-switcher-input');
    fireEvent.click(switcherInput);
    const radioInput = screen.getByLabelText('55');
    fireEvent.click(radioInput);
    const file = new File(['image'], 'image.png', { type: 'image/png' });
    const fileInput: HTMLInputElement = screen.getByTestId('image-file-input');
    userEvent.upload(fileInput, file);
    fireEvent.click(submitButton);
    const card = screen.getByText(/I am a good person/i);
    expect(card).toBeInTheDocument();
  });
});

describe('Validation', () => {
  let submitButton: HTMLInputElement;
  let textInput: HTMLInputElement;

  beforeEach(() => {
    render(<Form />);
    submitButton = screen.getByText(/Create Your Beautiful Card/i) as HTMLInputElement;
    textInput = screen.getByPlaceholderText(/please, type your name/i) as HTMLInputElement;
  });

  it('Should show error if input is empty', () => {
    fireEvent.change(textInput, { target: { value: 'asm' } });
    fireEvent.change(textInput, { target: { value: '' } });
    expect(textInput.value).toBe('');
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      /❗❗❗ ERROR: THE INPUT IS SO EMPTY! TRY AGAIN! ❗❗❗/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Should show error if using invalid characters', () => {
    fireEvent.change(textInput, { target: { value: 'Реакт' } });
    expect(textInput.value).toBe('Реакт');
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      /❗❗❗ ERROR: THE NAME IS SO INVALID! TRY AGAIN ❗❗❗/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Should show error if insufficient number of characters is entered', () => {
    fireEvent.change(textInput, { target: { value: 'ASM' } });
    expect(textInput.value).toBe('ASM');
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      /❗❗❗ ERROR: THE INPUT IS SO SHORTLY! TRY AGAIN ❗❗❗/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Should show error if favorite date is not set', () => {
    fireEvent.change(textInput, { target: { value: 'ASM' } });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      /❗❗❗ ERROR: THE INPUT IS SO UNDEFINED! TRY AGAIN! ❗❗❗/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Should show error if checkbox not checked', () => {
    fireEvent.change(textInput, { target: { value: 'ASM' } });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      /❗❗❗ ERROR: YOU ARE NOT GOOD ENOUGH! TRY AGAIN! ❗❗❗/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Should show error if sex is not set', () => {
    fireEvent.change(textInput, { target: { value: 'ASM' } });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      /❗❗❗ ERROR: YOUR SEX NOT DEFINED ENOUGH! TRY AGAIN! ❗❗❗/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Should show error if age is not set', () => {
    fireEvent.change(textInput, { target: { value: 'ASM' } });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      /❗❗❗ ERROR: YOU ARE SO NO HAVE AGE! TRY AGAIN! ❗❗❗/i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('Should show error if image is not uploaded', () => {
    fireEvent.change(textInput, { target: { value: 'ASM' } });
    fireEvent.click(submitButton);
    const errorMessage = screen.getByText(
      /❗❗❗ ERROR: DO YOU HAVE ANY BEAUTIFUL PICTURE\? TRY AGAIN! ❗❗❗/i
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
