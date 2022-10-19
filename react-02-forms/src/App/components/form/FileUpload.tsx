import React, { Component } from 'react';

interface IFileUploadProps {
  children?: string;
  placeholder?: string;
  accept?: string;
  name: string;
}

export class FileUpload extends Component<IFileUploadProps> {
  private input: React.RefObject<HTMLInputElement>;

  constructor(props: IFileUploadProps) {
    super(props);
    this.input = React.createRef();
    this.state = {
      image: null,
    };
  }

  render() {
    const { children, name, placeholder, accept } = this.props;
    const { input } = this;
    return (
      <label>
        {children}
        <input
          type="file"
          name={name}
          placeholder={placeholder}
          accept={accept || ''}
          ref={input}
        />
      </label>
    );
  }
}
