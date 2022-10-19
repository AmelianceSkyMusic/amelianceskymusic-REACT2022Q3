import React, { Component } from 'react';

interface IDateInputProps {
  children?: string;
  error?: string | null;
  name: string;
}

export class DateInput extends Component<IDateInputProps> {
  private input: React.RefObject<HTMLInputElement>;
  constructor(props: IDateInputProps) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    const { children, name, error } = this.props;
    const { input } = this;
    return (
      <label className="date-input">
        {children}
        <span className="date-input__error input-error">{error}</span>
        <input className="date-input__input" type="date" name={name} ref={input}></input>
      </label>
    );
  }
}
