import { useContext } from 'react';
import { FormPageContext } from './FormPageContext';

export function useFormPageContext() {
  return useContext(FormPageContext);
}
