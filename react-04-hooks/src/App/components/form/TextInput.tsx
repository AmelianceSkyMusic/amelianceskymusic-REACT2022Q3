import React, { Component } from 'react';

interface ITextInputProps {
  children?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  error?: string | null;
  testId?: string;
  name: string;
}

export class TextInput extends Component<ITextInputProps> {
  render() {
    const { children, name, placeholder, required, error, pattern, minLength, maxLength, testId } =
      this.props;
    return (
      <label className="text-input">
        {children}
        <span className="text-input__error input-error">{error}</span>
        <input
          className="text-input__input"
          type="input"
          name={name}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
          data-testid={testId}
        ></input>
      </label>
    );
  }
}
