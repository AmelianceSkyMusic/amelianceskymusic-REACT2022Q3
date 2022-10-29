import './RadioButton.css';
import React, { Component } from 'react';

interface IRadioButtonProps {
  children?: string;
  name: string;
}

export class RadioButton extends Component<IRadioButtonProps> {
  render() {
    const { children, name } = this.props;
    return (
      <label className="radio-button">
        <span className="radio-button__label"></span>
        {children}
        <input className="radio-button__input" type="radio" name={name} value={children}></input>
      </label>
    );
  }
}
