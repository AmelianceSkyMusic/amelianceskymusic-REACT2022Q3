import React, { Component } from 'react';

interface IDateInputProps {
  children?: string;
  error?: string | null;
  testId?: string;
  name: string;
}

export class DateInput extends Component<IDateInputProps> {
  render() {
    const { children, name, error, testId } = this.props;
    return (
      <label className="date-input">
        {children}
        <span className="date-input__error input-error">{error}</span>
        <input type="date" className="date-input__input" name={name} data-testid={testId}></input>
      </label>
    );
  }
}
