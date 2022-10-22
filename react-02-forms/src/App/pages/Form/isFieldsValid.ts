import { IErrorsMessage } from './types';

export function isFieldsValid(validatedFieldObject: IErrorsMessage) {
  const hasNoErrors = Object.values(validatedFieldObject).every((el) => el === null);
  return hasNoErrors;
}
