import './Switcher.css';
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

export function Switcher({ register, errors, children, testId }: IProps) {
  return (
    <div className="switcher">
      <label className="switcher__container">
        <input type="checkbox" className="switcher__checkbox" {...register} data-testid={testId} />
        <div className="switcher__element"></div>
        <span className="switcher__label">{children}</span>
      </label>
      <p className="text-input__error input-error">
        {(errors && errors[register.name] && errors[register.name].message) || ''}
      </p>
    </div>
  );
}
