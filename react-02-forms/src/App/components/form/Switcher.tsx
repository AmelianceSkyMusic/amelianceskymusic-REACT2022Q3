import './Switcher.css';
import React, { Component } from 'react';

interface ISwitcherProps {
  children?: string;
  error?: string | null;
  testId?: string;
  name: string;
}

export class Switcher extends Component<ISwitcherProps> {
  private input: React.RefObject<HTMLInputElement>;
  constructor(props: ISwitcherProps) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    const { children, error, name, testId } = this.props;
    const { input } = this;
    return (
      <label className="toggle">
        <span className="toggle__label">{children}</span>
        <span className="toggle__error input-error">{error}</span>
        <input
          className="toggle__checkbox switcher__input"
          type="checkbox"
          name={name}
          ref={input}
          data-testid={testId}
        ></input>
        <div className="toggle__switch"></div>
      </label>
    );
  }
}
