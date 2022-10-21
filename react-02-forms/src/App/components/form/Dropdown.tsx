import './Dropdown.css';
import React, { Component } from 'react';

interface IDropdownProps {
  children?: string;
  options: string[];
  error?: string | null;
  title?: string;
  testId?: string;
  name: string;
}

export class Dropdown extends Component<IDropdownProps> {
  private input: React.RefObject<HTMLSelectElement>;
  constructor(props: IDropdownProps) {
    super(props);
    this.input = React.createRef();
  }
  render() {
    const { children, options, title, error, name, testId } = this.props;
    const { input } = this;
    return (
      <label className="dropdown">
        {children}
        <span className="dropdown__error input-error">{error}</span>
        <select
          className="dropdown__select"
          name={name}
          ref={input}
          defaultValue={title}
          data-testid={testId}
        >
          {title && (
            <option className="dropdown__option" value={title} disabled>
              {title}
            </option>
          )}
          {options.map((optionValue) => (
            <option className="dropdown__option" key={optionValue} value={optionValue}>
              {optionValue}
            </option>
          ))}
        </select>
      </label>
    );
  }
}
