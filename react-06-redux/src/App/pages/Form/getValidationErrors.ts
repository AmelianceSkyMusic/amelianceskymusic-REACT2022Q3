import { ICard, IErrorsMessage } from './types';

export function getValidationErrors(formFields: ICard) {
  const message: IErrorsMessage = {
    name: null,
    date: null,
    birthday: null,
    goodPerson: null,
    sex: null,
    age: null,
    image: null,
  };

  const isVisible: {
    name?: boolean;
    date?: boolean;
    birthday?: boolean;
    goodPerson?: boolean;
    sex?: boolean;
    age?: boolean;
    image?: boolean;
  } = {};

  if (!formFields.name) {
    message.name = '❗❗❗ ERROR: THE INPUT IS SO EMPTY! TRY AGAIN! ❗❗❗';
    isVisible.name = true;
  } else if (!formFields.name?.match(/[A-ZÀ-ÿ]/i)) {
    message.name = '❗❗❗ ERROR: THE NAME IS SO INVALID! TRY AGAIN ❗❗❗';
    isVisible.name = true;
  } else if (formFields.name && formFields.name?.trim().length <= 4) {
    message.name = '❗❗❗ ERROR: THE INPUT IS SO SHORTLY! TRY AGAIN ❗❗❗';
    isVisible.name = true;
  }

  if (!formFields.date) {
    message.date = '❗❗❗ ERROR: THE INPUT IS SO UNDEFINED! TRY AGAIN! ❗❗❗';
    isVisible.date = true;
  }

  if (!formFields.birthday) {
    message.birthday = '❗❗❗ ERROR: THE INPUT IS SO UNKNOWN! TRY AGAIN! ❗❗❗';
    isVisible.birthday = true;
  }

  if (!formFields.goodPerson) {
    message.goodPerson = '❗❗❗ ERROR: YOU ARE NOT GOOD ENOUGH! TRY AGAIN! ❗❗❗';
    isVisible.goodPerson = true;
  }

  if (!formFields.sex) {
    message.sex = '❗❗❗ ERROR: YOUR SEX NOT DEFINED ENOUGH! TRY AGAIN! ❗❗❗';
    isVisible.sex = true;
  }

  if (!formFields.age) {
    message.age = '❗❗❗ ERROR: YOU ARE SO NO HAVE AGE! TRY AGAIN! ❗❗❗';
    isVisible.age = true;
  }
  if (!formFields.image) {
    message.image = '❗❗❗ ERROR: DO YOU HAVE ANY BEAUTIFUL PICTURE? TRY AGAIN! ❗❗❗';
    isVisible.image = true;
  }

  return {
    message,
    isVisible,
  };
}
