import './Switcher.css';
import React from 'react';

interface ISwitcherProps {
  children?: string;
  error?: string | null;
  testId?: string;
  name: string;
}

export const Switcher = React.forwardRef<HTMLInputElement, ISwitcherProps>((props, ref) => (
  <label className="toggle">
    <span className="toggle__label">{props.children}</span>
    <span className="toggle__error input-error">{props.error}</span>
    <input
      className="toggle__checkbox switcher__input"
      type="checkbox"
      name={props.name}
      ref={ref}
      data-testid={props.testId}
    ></input>
    <div className="toggle__switch"></div>
  </label>
));
