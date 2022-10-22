import './Checkbox.css';
import React, { Component } from 'react';

interface ICheckboxProps {
  children?: string;
  error?: string | null;
  testId?: string;
  name: string;
}

export class Checkbox extends Component<ICheckboxProps> {
  private input: React.RefObject<HTMLInputElement>;
  constructor(props: ICheckboxProps) {
    super(props);
    this.input = React.createRef();
  }

  render() {
    const { children, error, name, testId } = this.props;
    const { input } = this;

    return (
      <label className="checkbox">
        {children}
        <span className="checkbox__error input-error">{error}</span>
        <input
          type="checkbox"
          className="checkbox__input"
          name={name}
          ref={input}
          data-testid={testId}
        ></input>
      </label>
    );
  }
}
