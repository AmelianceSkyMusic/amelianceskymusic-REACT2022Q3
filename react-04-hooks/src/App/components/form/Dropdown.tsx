import React from 'react';
import { FieldValues } from 'react-hook-form';
import { FieldError } from 'react-hook-form/dist/types/errors';

interface IProps {
  options: string[];
  register: FieldValues;
  errors: Record<string, FieldError> | undefined;
  placeholder?: string;
  children?: React.ReactNode;
  testId?: string;
}

export function Dropdown({ options, register, errors, children, testId }: IProps) {
  return (
    <div className="dropdown">
      <label className="dropdown__label">
        {children}
        <select className="dropdown__select" {...register} data-testid={testId}>
          <option className="dropdown__option"> </option>
          {options.map((optionValue) => (
            <option className="dropdown__option" key={optionValue} value={optionValue}>
              {optionValue}
            </option>
          ))}
        </select>
      </label>
      <p className="dropdown__error input-error">
        {(errors && errors[register.name] && errors[register.name].message) || ''}
      </p>
    </div>
  );
}
