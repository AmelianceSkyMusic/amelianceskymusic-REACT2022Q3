import React, { Component } from 'react';
import { RadioButton } from './RadioButton';

interface IRadioButtonsProps {
  children?: string;
  error?: string | null;
  options: string[];
  name: string;
}

export class RadioButtons extends Component<IRadioButtonsProps> {
  constructor(props: IRadioButtonsProps) {
    super(props);
  }
  render() {
    const { children, error, options } = this.props;
    return (
      <div className="radio-buttons">
        {children}
        <span className="radio-buttons__error input-error">{error}</span>
        {options.map((optionValue) => (
          <RadioButton key={optionValue} name="age">
            {optionValue}
          </RadioButton>
        ))}
      </div>
    );
  }
}
