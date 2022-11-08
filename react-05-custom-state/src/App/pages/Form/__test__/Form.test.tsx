import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form } from '../Form';

// describe('Page', () => {
//   it('should render page', () => {
//     render(<Form />);
//     const form = screen.getByTestId('form');
//     expect(form).toBeInTheDocument();
//   });
// });

// describe('Submit button', () => {
//   let submitButton: HTMLInputElement;
//   global.URL.createObjectURL = jest.fn();

//   beforeEach(() => {
//     render(<Form />);
//     submitButton = screen.getByText(/Create Card/i);
//   });

//   it('submit button should exist', () => {
//     expect(submitButton).toBeInTheDocument();
//   });

//   it('should be disabled on render', () => {
//     expect(submitButton).toBeDisabled();
//   });

//   // it('should be disabled after card create', () => {
//   //   expect(submitButton).toBeDisabled();
//   //   const firstName: HTMLInputElement = screen.getByTestId('first-name');
//   //   fireEvent.change(firstName, { target: { value: 'Amliance SkyMusic' } });
//   //   const birthday: HTMLInputElement = screen.getByTestId('birthday');
//   //   fireEvent.change(birthday, { target: { value: '2012-12-12' } });
//   //   const framework: HTMLSelectElement = screen.getByTestId('framework');
//   //   fireEvent.change(framework, { target: { value: 'React' } });
//   //   const good: HTMLInputElement = screen.getByTestId('good');
//   //   userEvent.click(good);
//   //   const showSex: HTMLInputElement = screen.getByTestId('show-sex');
//   //   userEvent.click(showSex);
//   //   const sex = screen.getByLabelText('Male');
//   //   userEvent.click(sex);
//   //   const avatar = new File(['image'], 'image.png', { type: 'image/png' });
//   //   const fileInput: HTMLInputElement = screen.getByTestId('avatar');
//   //   userEvent.upload(fileInput, avatar);
//   //   userEvent.click(submitButton);
//   //   expect(submitButton).toBeDisabled();
//   // });

//   it('should be enabled after change input', () => {
//     expect(submitButton).toBeDisabled();
//     const firstName: HTMLInputElement = screen.getByTestId('first-name');
//     userEvent.type(firstName, 'Amliance SkyMusic{enter}');
//     expect(submitButton).toBeEnabled();
//   });

//   // it('should be disabled after press reset button', () => {
//   //   expect(submitButton).toBeDisabled();
//   //   const textInput: HTMLInputElement = screen.getByTestId('first-name');
//   //   fireEvent.change(textInput, { target: { value: 'Amliance SkyMusic' } });
//   //   expect(submitButton).toBeEnabled();
//   //   const resetButton = screen.getByText(/reset/i);
//   //   fireEvent.click(resetButton);
//   //   expect(submitButton).toBeDisabled();
//   // });
// });

// describe('Your Name text input', () => {
//   it('should be able to type into text input', () => {
//     render(<Form />);
//     const firstName: HTMLInputElement = screen.getByTestId('first-name');
//     userEvent.type(firstName, 'Amliance SkyMusic');
//     expect(firstName.value).toBe('Amliance SkyMusic');
//   });
// });

// describe('Your Favorite Date date input', () => {
//   it('should be able to set date', () => {
//     render(<Form />);
//     const birthday: HTMLInputElement = screen.getByTestId('birthday');
//     fireEvent.change(birthday, { target: { value: '2012-12-12' } });
//     expect(birthday.value).toBe('2012-12-12');
//   });
// });

// describe('Your Birthday Date date input', () => {
//   it('should be able to select date', () => {
//     render(<Form />);
//     const framework: HTMLSelectElement = screen.getByTestId('framework');
//     fireEvent.change(framework, { target: { value: 'React' } });
//     expect(framework.value).toBe('React');
//   });
// });

// describe('I Am A Good Person checkbox input', () => {
//   it('should be able to check checkbox', () => {
//     render(<Form />);
//     const good: HTMLInputElement = screen.getByTestId('good');
//     expect(good.checked).toBe(false);
//     userEvent.click(good);
//     expect(good.checked).toBe(true);
//   });
// });

// describe('Male/Female switcher input based on checkbox', () => {
//   it('should be able to change switcher', () => {
//     render(<Form />);
//     const showSex: HTMLInputElement = screen.getByTestId('show-sex');
//     expect(showSex.checked).toBe(false);
//     userEvent.click(showSex);
//     expect(showSex.checked).toBe(true);
//   });
// });

// describe('Your Age radiobutton inputs', () => {
//   it('should be able to select radio button', () => {
//     render(<Form />);
//     const showSex: HTMLInputElement = screen.getByTestId('show-sex');
//     userEvent.click(showSex);
//     const sex = screen.getByLabelText('Male');
//     expect(sex).not.toBeChecked();
//     userEvent.click(sex);
//     expect(sex).toBeChecked();
//   });
// });

// describe('Upload Your Avatarka file input', () => {
//   it('should be able to upload a file', () => {
//     render(<Form />);
//     const img = new File(['image'], 'image.png', { type: 'image/png' });
//     const avatar: HTMLInputElement = screen.getByTestId('avatar');
//     userEvent.upload(avatar, img);
//     if (avatar.files) {
//       expect(avatar.files[0]).toStrictEqual(img);
//       expect(avatar.files.item(0)).toStrictEqual(img);
//       expect(avatar.files).toHaveLength(1);
//     }
//   });
// });

describe('Validation', () => {
  // let submitButton: HTMLInputElement;
  // let textInput: HTMLInputElement;

  // beforeEach(() => {
  //   render(<Form />);
  //   // submitButton = screen.getByText(/Create Your Beautiful Card/i);
  //   submitButton = screen.getByText(/Create Card/i);
  //   // textInput = screen.getByPlaceholderText(/please, type your name/i);
  //   textInput = screen.getByTestId('first-name');
  // });

  it('Should show error if input is empty', async () => {
    render(<Form />);
    const textInput = screen.getByTestId('first-name');
    const submitButton = screen.getByText(/Create Card/i);
    await waitFor(() => {
      fireEvent.input(textInput, { target: { value: 'asm' } });
      fireEvent.submit(submitButton);
      expect(screen.findByText(/Field is so empty/i)).toBeInTheDocument();
    });
    screen.debug();
  });

  // it('Should show error if using invalid characters', () => {
  //   fireEvent.change(textInput, { target: { value: 'Реакт' } });
  //   expect(textInput.value).toBe('Реакт');
  //   fireEvent.click(submitButton);
  //   const errorMessage = screen.getByText(
  //     /❗❗❗ ERROR: THE NAME IS SO INVALID! TRY AGAIN ❗❗❗/i
  //   );
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it('Should show error if insufficient number of characters is entered', () => {
  //   fireEvent.change(textInput, { target: { value: 'ASM' } });
  //   expect(textInput.value).toBe('ASM');
  //   fireEvent.click(submitButton);
  //   const errorMessage = screen.getByText(
  //     /❗❗❗ ERROR: THE INPUT IS SO SHORTLY! TRY AGAIN ❗❗❗/i
  //   );
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it('Should show error if favorite date is not set', () => {
  //   fireEvent.change(textInput, { target: { value: 'ASM' } });
  //   fireEvent.click(submitButton);
  //   const errorMessage = screen.getByText(
  //     /❗❗❗ ERROR: THE INPUT IS SO UNDEFINED! TRY AGAIN! ❗❗❗/i
  //   );
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it('Should show error if checkbox not checked', () => {
  //   fireEvent.change(textInput, { target: { value: 'ASM' } });
  //   fireEvent.click(submitButton);
  //   const errorMessage = screen.getByText(
  //     /❗❗❗ ERROR: YOU ARE NOT GOOD ENOUGH! TRY AGAIN! ❗❗❗/i
  //   );
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it('Should show error if sex is not set', () => {
  //   fireEvent.change(textInput, { target: { value: 'ASM' } });
  //   fireEvent.click(submitButton);
  //   const errorMessage = screen.getByText(
  //     /❗❗❗ ERROR: YOUR SEX NOT DEFINED ENOUGH! TRY AGAIN! ❗❗❗/i
  //   );
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it('Should show error if age is not set', () => {
  //   fireEvent.change(textInput, { target: { value: 'ASM' } });
  //   fireEvent.click(submitButton);
  //   const errorMessage = screen.getByText(
  //     /❗❗❗ ERROR: YOU ARE SO NO HAVE AGE! TRY AGAIN! ❗❗❗/i
  //   );
  //   expect(errorMessage).toBeInTheDocument();
  // });

  // it('Should show error if image is not uploaded', () => {
  //   fireEvent.change(textInput, { target: { value: 'ASM' } });
  //   fireEvent.click(submitButton);
  //   const errorMessage = screen.getByText(
  //     /❗❗❗ ERROR: DO YOU HAVE ANY BEAUTIFUL PICTURE\? TRY AGAIN! ❗❗❗/i
  //   );
  //   expect(errorMessage).toBeInTheDocument();
  // });
});

// describe('Card', () => {
//   it('should create card', () => {
//     render(<Form />);
//     const submitButton = screen.getByText(/Create Your Beautiful Card/i);
//     const textInput: HTMLInputElement = screen.getByTestId('name-text-input');
//     fireEvent.change(textInput, { target: { value: 'AmlianceSkyMusic' } });
//     const dateInput: HTMLInputElement = screen.getByTestId('date-date-input');
//     fireEvent.change(dateInput, { target: { value: '2012-12-12' } });
//     const dropdownInput: HTMLSelectElement = screen.getByTestId('birthday-dropdown-input');
//     fireEvent.change(dropdownInput, { target: { value: '01 January' } });
//     const checkboxInput: HTMLInputElement = screen.getByTestId('good-person-checkbox-input');
//     fireEvent.click(checkboxInput);
//     const switcherInput: HTMLInputElement = screen.getByTestId('sex-switcher-input');
//     fireEvent.click(switcherInput);
//     const radioInput = screen.getByLabelText('55');
//     fireEvent.click(radioInput);
//     const file = new File(['image'], 'image.png', { type: 'image/png' });
//     const fileInput: HTMLInputElement = screen.getByTestId('image-file-input');
//     userEvent.upload(fileInput, file);
//     fireEvent.click(submitButton);
//     const card = screen.getByText(/I am a good person/i);
//     expect(card).toBeInTheDocument();
//   });
// });

// describe('Validation', () => {
//   // let firstName: HTMLInputElement;

//   // beforeEach(async () => {
//   // await act(async () => {
//   //   render(<Form />);
//   // });
//   // render(<Form />);
//   // firstName = screen.getByTestId('first-name');
//   // });

//   // it('Should show error if input is empty', () => {
//   //   userEvent.clear(firstName);
//   //   userEvent.type(firstName, ' ');
//   //   expect(firstName.value).toBe(' ');
//   //   expect(submitButton).toBeInTheDocument();
//   //   userEvent.click(submitButton);
//   //   const errorMessage = screen.getByText(/Field is so empty! Please, type more characters!/i);
//   //   expect(errorMessage).toBeInTheDocument();
//   // });

//   it('Should show error if insufficient number of characters is entered', () => {
//     render(<Form />);

//     const submitButton: HTMLInputElement = screen.getByTestId('create-card');
//     expect(submitButton).toBeInTheDocument();
//     const firstName: HTMLInputElement = screen.getByTestId('first-name');
//     userEvent.type(firstName, 'Ameliance SkyMusic');
//     expect(firstName.value).toBe('Ameliance SkyMusic');
//     userEvent.click(submitButton);

//     screen.debug();
//     const errorMessage = screen.getByText(/Min length are 2 characters!/i);
//     expect(errorMessage).toBeInTheDocument();
//   });

//   // it('Should show error if using invalid characters', () => {
//   //   userEvent.type(firstName, 'Амелианс Скаймьюзик');
//   //   expect(firstName.value).toBe('Амелианс Скаймьюзик');
//   //   fireEvent.click(submitButton);
//   //   const errorMessage = screen.getByText(/Please, use only A-Z a-z characters!/i);
//   //   expect(errorMessage).toBeInTheDocument();
//   // });

//   //   it('Should show error if favorite date is not set', () => {
//   //     userEvent.type(firstName, 'Amliance SkyMusic');
//   //     fireEvent.click(submitButton);
//   //     const errorMessage = screen.getByText(
//   //       /Please, select a date!/i
//   //     );
//   //     expect(errorMessage).toBeInTheDocument();
//   //   });

//   //   it('Should show error if checkbox not checked', () => {
//   //     userEvent.type(firstName, 'Amliance SkyMusic');
//   //     fireEvent.click(submitButton);
//   //     const errorMessage = screen.getByText(
//   //       /❗❗❗ ERROR: YOU ARE NOT GOOD ENOUGH! TRY AGAIN! ❗❗❗/i
//   //     );
//   //     expect(errorMessage).toBeInTheDocument();
//   //   });

//   //   it('Should show error if sex is not set', () => {
//   //     userEvent.type(firstName, 'Amliance SkyMusic');
//   //     fireEvent.click(submitButton);
//   //     const errorMessage = screen.getByText(
//   //       /❗❗❗ ERROR: YOUR SEX NOT DEFINED ENOUGH! TRY AGAIN! ❗❗❗/i
//   //     );
//   //     expect(errorMessage).toBeInTheDocument();
//   //   });

//   //   it('Should show error if age is not set', () => {
//   //     userEvent.type(firstName, 'Amliance SkyMusic');
//   //     fireEvent.click(submitButton);
//   //     const errorMessage = screen.getByText(
//   //       /❗❗❗ ERROR: YOU ARE SO NO HAVE AGE! TRY AGAIN! ❗❗❗/i
//   //     );
//   //     expect(errorMessage).toBeInTheDocument();
//   //   });

//   //   it('Should show error if image is not uploaded', () => {
//   //     userEvent.type(firstName, 'Amliance SkyMusic');
//   //     fireEvent.click(submitButton);
//   //     const errorMessage = screen.getByText(
//   //       /❗❗❗ ERROR: DO YOU HAVE ANY BEAUTIFUL PICTURE\? TRY AGAIN! ❗❗❗/i
//   //     );
//   //     expect(errorMessage).toBeInTheDocument();
//   //   });
// });
