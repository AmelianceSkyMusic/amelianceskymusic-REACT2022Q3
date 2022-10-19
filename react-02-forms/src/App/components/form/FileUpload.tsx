import React, { Component } from 'react';

interface IFileUploadProps {
  children?: string;
  placeholder?: string;
  error?: string | null;
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
    const { children, name, placeholder, error, accept } = this.props;
    const { input } = this;
    return (
      <label className="file-upload">
        {children}
        <span className="file-upload__error input-error">{error}</span>
        <input
          className="file-upload__input"
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
