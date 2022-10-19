import React, { Component } from 'react';
import { RadioButton } from './RadioButton';

interface IRadioButtonsProps {
  children?: string;
  options: string[];
  name: string;
}

export class RadioButtons extends Component<IRadioButtonsProps> {
  constructor(props: IRadioButtonsProps) {
    super(props);
  }
  render() {
    const { children, options } = this.props;
    return (
      <div className="radio-buttons">
        {children}
        {options.map((optionValue) => (
          <RadioButton key={optionValue} name="age">
            {optionValue}
          </RadioButton>
        ))}
      </div>
    );
  }
}
