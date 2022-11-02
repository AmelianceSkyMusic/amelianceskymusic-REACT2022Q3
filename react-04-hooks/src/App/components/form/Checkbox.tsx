import React from 'react';
import { FieldValues } from 'react-hook-form';
import { FieldError } from 'react-hook-form/dist/types/errors';

interface IProps {
  register: FieldValues;
  errors: Record<string, FieldError> | undefined;
  placeholder?: string;
  children?: React.ReactNode;
  testId?: string;
}

export function Checkbox({ register, errors, children, testId }: IProps) {
  return (
    <div className="checkbox">
      <label className="checkbox__label">
        <input
          type="checkbox"
          className="checkbox__input"
          {...register}
          data-testid={testId}
        ></input>
        {children}
      </label>
      <p className="checkbox__error input-error">
        {(errors && errors[register.name] && errors[register.name].message) || ''}
      </p>
    </div>
  );
}
