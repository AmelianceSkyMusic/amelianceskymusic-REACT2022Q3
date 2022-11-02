import React from 'react';
import { FieldValues } from 'react-hook-form';
import { FieldError } from 'react-hook-form/dist/types/errors';

interface IProps {
  register: FieldValues;
  errors: Record<string, FieldError> | undefined;
  values: (string | number)[];
  placeholder?: string;
  children?: React.ReactNode;
  testId?: string;
}

export function RadioButtons({ register, errors, values, children, testId }: IProps) {
  return (
    <div className="radio-buttons">
      <span className="radio-buttons__title">{children}</span>
      {values.map((value, i) => (
        <div key={i} className="radio-button">
          <label className="radio-button__label">
            <input
              type="radio"
              className="radio-button__input"
              {...register}
              value={value.toString()}
              data-testid={testId}
            ></input>
            {value}
          </label>
        </div>
      ))}
      <p className="radio-buttons__error input-error">
        {(errors && errors[register.name] && errors[register.name].message) || ''}
      </p>
    </div>
  );
}
