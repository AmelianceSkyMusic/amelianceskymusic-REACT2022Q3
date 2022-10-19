import './Checkbox.css';
import React, { Component } from 'react';

interface ICheckboxProps {
  children?: string;
  error?: string | null;
  name: string;
}

export class Checkbox extends Component<ICheckboxProps> {
  private input: React.RefObject<HTMLInputElement>;
  constructor(props: ICheckboxProps) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    const { children, error, name } = this.props;
    const { input } = this;
    return (
      <label className="checkbox">
        {children}
        <span className="checkbox__error input-error">{error}</span>
        <input type="checkbox" className="checkbox__input" name={name} ref={input}></input>
      </label>
    );
  }
}
