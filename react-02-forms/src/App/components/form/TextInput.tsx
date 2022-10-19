import React, { Component } from 'react';

interface ITextInputProps {
  children?: string;
  placeholder?: string;
  name: string;
}

export class TextInput extends Component<ITextInputProps> {
  private input: React.RefObject<HTMLInputElement>;
  constructor(props: ITextInputProps) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    const { children, name, placeholder } = this.props;
    const { input } = this;
    return (
      <label>
        {children}
        <span>ERROR: THE INPUT IS SO EMPTY</span>
        <input type="input" name={name} placeholder={placeholder} ref={input}></input>
      </label>
    );
  }
}
