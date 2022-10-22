export interface ICard {
  name: string | null;
  date: string | null;
  birthday: string | null;
  goodPerson: string | null;
  sex: string | null;
  age: string | null;
  image: string | null;
  id: string | null;
}

export interface IFormFields {
  name: string | null;
  date: string | null;
  birthday: string | null;
  goodPerson: string | null;
  sex: string | null;
  age: string | null;
  image: string | null;
}

export interface IErrorsMessage {
  name: string | null;
  date: string | null;
  birthday: string | null;
  goodPerson: string | null;
  sex: string | null;
  age: string | null;
  image: string | null;
}

export interface IErrorsIsVisible {
  name: boolean;
  date: boolean;
  birthday: boolean;
  goodPerson: boolean;
  sex: boolean;
  age: boolean;
  image: boolean;
}

export interface IErrors {
  errorsMessage: IErrorsMessage;
  errorsIsVisible: IErrorsIsVisible;
}
