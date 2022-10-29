import React, { Component } from 'react';
import { RadioButton } from './RadioButton';

interface IRadioButtonsProps {
  children?: string;
  error?: string | null;
  options: string[];
  testId?: string;
  name: string;
}

export class RadioButtons extends Component<IRadioButtonsProps> {
  render() {
    const { children, error, options, testId, name } = this.props;
    return (
      <div className="radio-buttons" data-testid={testId}>
        {children}
        <span className="radio-buttons__error input-error">{error}</span>
        {options.map((optionValue) => (
          <RadioButton key={optionValue} name={name}>
            {optionValue}
          </RadioButton>
        ))}
      </div>
    );
  }
}
