import React from 'react';
import './Checkbox.css';

interface ICheckboxProps {
  children?: string;
  error?: string | null;
  testId?: string;
  name: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, ICheckboxProps>((props, ref) => (
  <label className="checkbox">
    {props.children}
    <span className="checkbox__error input-error">{props.error}</span>
    <input
      type="checkbox"
      className="checkbox__input"
      name={props.name}
      ref={ref}
      data-testid={props.testId}
    ></input>
  </label>
));
