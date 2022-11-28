import { useReducer } from 'react';
import { formPageReducer, TFormPageActions } from './formPageReducer';

import { IFormCard, IFormInputs, IFormPageState } from './FormPageStateTypes';

export interface TFormPageReducerActions {
  setForm: (form: IFormInputs) => void;
  resetForm: () => void;
  addCard: (card: IFormCard) => void;
}

export function useFormPageReducer(initialState: IFormPageState) {
  const [state, dispatch] = useReducer<React.Reducer<IFormPageState, TFormPageActions>>(
    formPageReducer,
    initialState
  );

  const stateValues = {
    form: state.form,
    initForm: state.initForm,
    cards: state.cards,
  };

  const mainReducerActions = {
    setForm: (form: IFormInputs) => dispatch({ type: 'setForm', payload: form }),
    resetForm: () => dispatch({ type: 'resetForm' }),
    addCard: (card: IFormCard) => dispatch({ type: 'addCard', payload: card }),
  };

  return {
    ...stateValues,
    ...mainReducerActions,
  };
}
