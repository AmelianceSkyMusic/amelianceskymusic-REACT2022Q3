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

export function TextInput({ register, errors, children, placeholder, testId }: IProps) {
  return (
    <div className="text-input">
      <label className="text-input__label">
        {children}
        <input
          type="input"
          className="text-input__input"
          {...register}
          placeholder={placeholder}
          data-testid={testId}
        ></input>
      </label>
      <p className="text-input__error input-error">
        {(errors && errors[register.name] && errors[register.name].message) || ''}
      </p>
    </div>
  );
}
