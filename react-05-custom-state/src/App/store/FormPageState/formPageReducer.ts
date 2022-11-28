import { IFormCard, IFormInputs, IFormPageState } from './FormPageStateTypes';

export type TFormPageActions =
  | { type: 'setForm'; payload: IFormInputs }
  | { type: 'resetForm' }
  | { type: 'addCard'; payload: IFormCard };

export const formPageReducer = (
  state: IFormPageState,
  action: TFormPageActions
): IFormPageState => {
  switch (action.type) {
    case 'setForm':
      return { ...state, form: action.payload };
    case 'resetForm':
      return { ...state, form: { ...state.initForm } };
    case 'addCard':
      return { ...state, cards: [...state.cards, action.payload] };
    default:
      return state;
  }
};
