import './FormCard.scss';
import './Form.scss';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextInput } from 'App/components/form/TextInput';
import { FileImgUpload } from 'App/components/form/FileImgUpload';
import { DateInput } from 'App/components/form/DateInput';
import { Dropdown } from 'App/components/form/Dropdown';
import { Checkbox } from 'App/components/form/Checkbox';
import { Switcher } from 'App/components/form/Switcher';
import { RadioButtons } from 'App/components/form/RadioButtons';

import { FormCard } from './FormCard';
import asm from 'asmlib/asm-scripts';
import { IFormInputs } from 'App/store/FormPageState/FormPageStateTypes';
import { useFormPageContext } from 'App/store/FormPageState/useFormPageContext';

export function Form() {
  const state = useFormPageContext();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<IFormInputs>({
    mode: 'onSubmit',
    defaultValues: {
      ...state?.form,
      firstName: state?.form.firstName,
      birthday: state?.form.birthday,
      framework: state?.form.framework,
      good: state?.form.good,
      showSex: state?.form.showSex,
      sex: state?.form.sex,
      avatar: undefined,
    },
  });

  const isValidFixed = asm.isObjectEmpty(errors); //* fix isValid default has false

  const firstName = register('firstName', {
    required: 'Field is so empty! Please, type more characters!',
    minLength: { value: 2, message: 'Min length are 2 characters!' },
    pattern: { value: /^[A-Za-z]+$/i, message: 'Please, use only A-Z a-z characters!' },
  });

  const birthday = register('birthday', { required: 'Please, select a date!' });
  const framework = register('framework', { required: 'Please, chose a course!' });
  const good = register('good', { required: 'Please, check checkbox!' });
  const showSex = register('showSex', { required: 'Please, chose a sex!' });
  const sex = register('sex', { required: 'Please, chose a sex!' });
  const avatar = register('avatar', { required: 'Please, select an image!' });

  const showSexWatch = watch('showSex');

  const handleReset = () => {
    reset();
  };

  const handleFormChange = () => {
    state?.setForm({
      firstName: watch('firstName'),
      birthday: watch('birthday'),
      framework: watch('framework'),
      good: watch('good'),
      showSex: watch('showSex'),
      sex: watch('sex'),
      avatar: watch('avatar'),
    });
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    const imageObject = (data.avatar as FileList)[0];

    const image = URL.createObjectURL(imageObject);
    state?.addCard({
      firstName: data.firstName,
      birthday: data.birthday.replaceAll('-', ' '),
      framework: data.framework.trim(),
      good: data.good,
      sex: data.sex as string,
      avatar: image,
      id: state.cards.length + 1,
    });
    handleReset();
  };

  return (
    <main className="form-page main">
      <div className="container">
        <form
          className="form"
          onSubmit={handleSubmit(onSubmit)}
          onChange={handleFormChange}
          data-testid="form"
        >
          <TextInput register={firstName} errors={errors} testId="first-name">
            Your Name*:
          </TextInput>
          <DateInput register={birthday} errors={errors} testId="birthday">
            Your Birthday*:
          </DateInput>
          <Dropdown
            options={['React', 'React ', 'React  ', 'React   ', 'React    ']}
            register={framework}
            errors={errors}
            testId="framework"
          >
            Your Favorite Framework*:
          </Dropdown>
          <Checkbox register={good} errors={errors} label="I am a good person" testId="good">
            Your kind*:
          </Checkbox>
          <Switcher register={showSex} errors={errors} label="Show" testId="show-sex">
            Show additional input*:
          </Switcher>
          {showSexWatch && (
            <RadioButtons labels={['Male', 'Female']} register={sex} errors={errors} testId="sex">
              Chose your sex*:
            </RadioButtons>
          )}
          <FileImgUpload
            watch={watch}
            register={avatar}
            errors={errors}
            accept=".jpg, .jpeg, .png"
            testId="avatar"
          >
            Select your avatar:*
          </FileImgUpload>
          <div className="form__buttons">
            <button type="button" className="button secondary" onClick={handleReset}>
              Reset
            </button>
            <input
              className="button"
              type="submit"
              disabled={!isDirty || !isValidFixed}
              value="Create Card"
              data-testid="create-card"
            />
          </div>
        </form>

        {state && state.cards.length > 0 && (
          <section className="form-cards row">
            {state.cards.length > 0 &&
              state.cards.map((card) => <FormCard key={card.id} card={card} />)}
          </section>
        )}
      </div>
    </main>
  );
}
