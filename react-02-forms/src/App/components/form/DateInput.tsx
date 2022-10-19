import React, { Component } from 'react';

interface IDateInputProps {
  children?: string;
  name: string;
}

export class DateInput extends Component<IDateInputProps> {
  private input: React.RefObject<HTMLInputElement>;
  constructor(props: IDateInputProps) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    const { children, name } = this.props;
    const { input } = this;
    return (
      <label>
        {children}
        <input type="date" name={name} ref={input}></input>
      </label>
    );
  }
}
