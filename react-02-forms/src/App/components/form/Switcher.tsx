import './Switcher.css';
import React, { Component } from 'react';

interface ISwitcherProps {
  children?: string;
  name: string;
}

export class Switcher extends Component<ISwitcherProps> {
  private input: React.RefObject<HTMLInputElement>;
  constructor(props: ISwitcherProps) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    const { children, name } = this.props;
    const { input } = this;
    return (
      <label className="toggle">
        <span className="toggle-label">{children}</span>
        <input className="toggle-checkbox" type="checkbox" name={name} ref={input}></input>
        <div className="toggle-switch"></div>
      </label>
    );
  }
}
