import { Checkbox } from 'App/components/form/Checkbox';
import { DateInput } from 'App/components/form/DateInput';
import { Dropdown } from 'App/components/form/Dropdown';
import { FileUpload } from 'App/components/form/FileUpload';
import { Switcher } from 'App/components/form/Switcher';
import { TextInput } from 'App/components/form/TextInput';
import React, { Component } from 'react';

interface IFormProps {
  formRef: React.RefObject<HTMLFormElement>;
}

export class Form extends Component {
  formRef: React.RefObject<HTMLFormElement>;
  constructor(props: IFormProps) {
    super(props);
    this.formRef = React.createRef();
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const formFields = this?.formRef?.current?.getFields();
    console.log('formFields', formFields);
  }

  getInputValue() {
    console.log('hello');
  }
  render() {
    // const { textInputRef } = this;
    return (
      <div className="form-page">
        <h1 className="">Form</h1>
        <form onSubmit={this.handleSubmit} className="form" ref={this.formRef}>
          <TextInput name="form-name" placeholder="please, type your name">
            Name:
          </TextInput>

          {/* <label>Today Date:</label> */}
          {/* <DateInput></DateInput> */}

          {/* <label>Your Birthday:</label> */}
          {/* <Dropdown></Dropdown> */}

          {/* <label>I agree:</label> */}
          {/* <Checkbox></Checkbox> */}

          {/* <Switcher></Switcher> */}
          {/* <label>Male/Female</label> */}

          {/* <label>Avatarka:</label> */}
          {/* <FileUpload></FileUpload> */}
          <input type="submit" className="form__submit" />
        </form>
      </div>
    );
  }
}
