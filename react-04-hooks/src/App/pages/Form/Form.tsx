import './Form.css';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextInput } from 'App/components/form/TextInput';
import { FileImgUpload } from 'App/components/form/FileImgUpload';
import { DateInput } from 'App/components/form/DateInput';
import { Dropdown } from 'App/components/form/Dropdown';
import { Checkbox } from 'App/components/form/Checkbox';
import { Switcher } from 'App/components/form/Switcher';
import { RadioButtons } from 'App/components/form/RadioButtons';
import { IFormCardData } from './IFormCardData';
import { FormCard } from './FormCard';

interface IFormInputs {
  firstName: string;
  birthday: string;
  framework: string;
  agree: boolean;
  showSex: boolean;
  sex: boolean;
  avatar: FileList;
}

export function Form() {
  const [cards, setCards] = useState<IFormCardData[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({ mode: 'onSubmit' });

  const firstName = register('firstName', {
    required: 'Field is so empty! Please, type more characters',
    minLength: { value: 2, message: 'The minimum password length must be 2 characters' },
    pattern: { value: /^[A-Za-z]+$/i, message: 'Please, use only A-Z a-z characters!' },
  });

  const birthday = register('birthday', { required: 'Please, select a date' });
  const framework = register('framework', { required: 'Please, chose a course' });
  const agree = register('agree', { required: 'Please, check checkbox' });
  const showSex = register('showSex', { required: 'Please, chose a sex' });
  const sex = register('sex', { required: 'Please, chose a sex' });
  const avatar = register('avatar', { required: 'Please, select an image' });

  const showSexWatch = watch('showSex');

  const handleReset = () => {
    reset();
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    const imageObject = data.avatar[0];
    const image = URL.createObjectURL(imageObject);
    setCards((prev) => [
      ...prev,
      {
        firstName: data.firstName,
        birthday: data.firstName,
        framework: data.framework,
        agree: data.agree,
        sex: data.sex,
        avatar: image,
        id: prev.length + 1,
      },
    ]);
    handleReset();
  };

  // const isEmpty = Object.keys(errors).length > 0 ? true : false;

  return (
    <section className="form-page">
      <h2>Form</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <TextInput register={firstName} errors={errors} testId="name-text-input">
          Your Name*:
        </TextInput>
        <DateInput register={birthday} errors={errors} testId="name-text-input">
          Your Birthday*:
        </DateInput>
        <Dropdown
          options={['React', 'Angular', 'Vue']}
          register={framework}
          errors={errors}
          testId="name-text-input"
        >
          Your Favorite Framework*:
        </Dropdown>
        <Checkbox register={agree} errors={errors} testId="name-text-input">
          I am a good person*
        </Checkbox>
        <Switcher register={showSex} errors={errors} testId="name-text-input">
          Show sex*:
        </Switcher>
        {showSexWatch && (
          <RadioButtons
            values={['Male', 'Female']}
            register={sex}
            errors={errors}
            testId="name-text-input"
          >
            Chose your sex*:
          </RadioButtons>
        )}
        <FileImgUpload
          watch={watch}
          register={avatar}
          errors={errors}
          accept=".jpg, .jpeg, .png"
          testId="image-file-input"
        >
          Select your avatar:*
        </FileImgUpload>

        <input type="submit" disabled={isValid} />
      </form>
      <button onClick={handleReset}>Reset</button>
      <div>{cards.length > 0 && cards.map((card) => <FormCard key={card.id} card={card} />)}</div>
    </section>
  );
}
