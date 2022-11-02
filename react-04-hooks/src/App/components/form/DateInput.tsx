import React from 'react';
import { FieldValues } from 'react-hook-form';
import { FieldError } from 'react-hook-form/dist/types/errors';

interface IProps {
  register: FieldValues;
  errors: Record<string, FieldError> | undefined;
  children?: React.ReactNode;
  testId?: string;
}

export function DateInput({ register, errors, children, testId }: IProps) {
  return (
    <div className="date-input">
      <label className="date-input__label">
        {children}
        <input type="date" className="date-input__input" {...register} data-testid={testId}></input>
      </label>
      <p className="date-input__error input-error">
        {(errors && errors[register.name] && errors[register.name].message) || ''}
      </p>
    </div>
  );
}
