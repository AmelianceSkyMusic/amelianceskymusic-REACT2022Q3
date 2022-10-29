import React, { Component } from 'react';

interface IButtonProps {
  children?: string;
  className?: string;
  isDisabled?: boolean;
  name: string;
}

export class Button extends Component<IButtonProps> {
  render() {
    const { children, className, isDisabled, name } = this.props;
    return (
      <input
        type="submit"
        className={className}
        name={name}
        value={children}
        disabled={isDisabled}
      />
    );
  }
}
