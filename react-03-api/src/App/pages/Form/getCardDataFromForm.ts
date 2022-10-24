import { getRandomNumber } from 'asmlib/asm-scripts';
import { ICard } from './types';

export function getCardDataFromForm(form: HTMLFormElement): ICard {
  const formData = new FormData(form);

  const name = formData.get('name')?.toString() || null;
  const date = formData.get('date')?.toString() || null;
  const birthday = formData.get('birthday')?.toString() || null;
  const goodPerson = formData.get('goodPerson')?.toString() || null;
  const sex = formData.get('sex')?.toString() || null;
  const age = formData.get('age')?.toString() || null;
  const imageObject = formData.get('image') || null;
  const image =
    imageObject && imageObject instanceof File && imageObject.name
      ? URL.createObjectURL(imageObject)
      : null;
  const id = getRandomNumber(100_000_000_000, 999_999_999_999).toString();

  const getCardDataFromForm = {
    name,
    date,
    birthday,
    goodPerson,
    sex,
    age,
    image,
    id,
  };
  return getCardDataFromForm;
}
