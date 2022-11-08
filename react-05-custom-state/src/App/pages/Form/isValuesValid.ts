export function isValuesValid<T>(values: T[]) {
  const isValid = values.every((el) => el === false);
  return isValid;
}
