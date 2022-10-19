import React, { Component } from 'react';

interface ITextInputProps {
  children?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  error?: string | null;
  name: string;
}

export class TextInput extends Component<ITextInputProps> {
  private input: React.RefObject<HTMLInputElement>;
  constructor(props: ITextInputProps) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    const { children, name, placeholder, required, error, pattern, minLength, maxLength } =
      this.props;
    const { input } = this;
    return (
      <label className="text-input">
        {children}
        <span className="text-input__error input-error">{error}</span>
        <input
          className="text-input__input"
          type="input"
          name={name}
          placeholder={placeholder}
          ref={input}
          required={required}
          pattern={pattern}
          minLength={minLength}
          maxLength={maxLength}
        ></input>
      </label>
    );
  }
}
