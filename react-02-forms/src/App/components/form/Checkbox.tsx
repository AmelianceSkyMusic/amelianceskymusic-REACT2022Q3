import React, { Component } from 'react';

interface ICheckboxProps {
  children?: string;
  name: string;
}

export class Checkbox extends Component<ICheckboxProps> {
  private input: React.RefObject<HTMLInputElement>;
  constructor(props: ICheckboxProps) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    const { children, name } = this.props;
    const { input } = this;
    return (
      <label>
        {children}
        <input type="checkbox" name={name} ref={input}></input>
      </label>
    );
  }
}
