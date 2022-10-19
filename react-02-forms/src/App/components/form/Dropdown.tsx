import React, { Component } from 'react';

interface IDropdownProps {
  children?: string;
  options: string[];
  name: string;
}

export class Dropdown extends Component<IDropdownProps> {
  private input: React.RefObject<HTMLSelectElement>;
  constructor(props: IDropdownProps) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    const { children, options, name } = this.props;
    const { input } = this;
    return (
      <label>
        {children}
        <select name={name} ref={input}>
          {options.map((optionValue) => (
            <option key={optionValue} value={optionValue}>
              {optionValue}
            </option>
          ))}
        </select>
      </label>
    );
  }
}
