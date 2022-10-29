import React, { Component } from 'react';

interface IFileUploadProps {
  children?: string;
  placeholder?: string;
  error?: string | null;
  accept?: string;
  testId?: string;
  name: string;
}

export class FileUpload extends Component<IFileUploadProps> {
  render() {
    const { children, name, placeholder, error, accept, testId } = this.props;
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
          data-testid={testId}
        />
      </label>
    );
  }
}
