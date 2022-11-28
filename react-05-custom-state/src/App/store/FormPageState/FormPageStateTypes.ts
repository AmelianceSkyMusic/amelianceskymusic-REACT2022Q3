export interface IFormInputs {
  firstName: string;
  birthday: string;
  framework: string;
  good: boolean;
  showSex: boolean;
  sex: string | undefined;
  avatar: FileList | undefined;
}

export interface IFormCard {
  firstName: string;
  birthday: string;
  framework: string;
  good: boolean;
  sex: string;
  avatar: string;
  id: number;
}

export interface IFormPageState {
  form: IFormInputs;
  initForm: IFormInputs;
  cards: IFormCard[];
}
