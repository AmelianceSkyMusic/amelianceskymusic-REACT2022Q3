import './RadioButton.css';
import React, { Component } from 'react';

interface IRadioButtonProps {
  children?: string;
  name: string;
}

export class RadioButton extends Component<IRadioButtonProps> {
  private input: React.RefObject<HTMLInputElement>;
  constructor(props: IRadioButtonProps) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    const { children, name } = this.props;
    const { input } = this;
    return (
      <label className="radio-button">
        <span className="radio-button__label"></span>
        {children}
        <input
          className="radio-button__input"
          type="radio"
          name={name}
          value={children}
          ref={input}
        ></input>
      </label>
    );
  }
}
