import './Form.css';
import { Button } from 'App/components/form/Button';
import { Checkbox } from 'App/components/form/Checkbox';
import { DateInput } from 'App/components/form/DateInput';
import { Dropdown } from 'App/components/form/Dropdown';
import { FileUpload } from 'App/components/form/FileUpload';
import { Switcher } from 'App/components/form/Switcher';
import { TextInput } from 'App/components/form/TextInput';
import { RadioButtons } from 'App/components/form/RadioButtons';
import React, { Component } from 'react';
import { isFieldsValid } from './isFieldsValid';
import { ICard, IErrors, IErrorsIsVisible, IErrorsMessage } from './types';
import { getValidationErrors } from './getValidationErrors';
import { getCardDataFromForm } from './getCardDataFromForm';
import { isValuesValid } from './isValuesValid';

interface IFormState {
  isSubmitDisabled: boolean;
  isInitForm: boolean;
  previewImgUrl: string | null;
  errors: IErrors;
  cards: ICard[];
}

export class Form extends Component<unknown, IFormState> {
  goodPersonRef: React.RefObject<HTMLInputElement>;
  sexRef: React.RefObject<HTMLInputElement>;
  formRef: React.RefObject<HTMLFormElement>;
  initCard: ICard;
  initErrorsMessage: IErrorsMessage;
  initErrorsIsVisible: IErrorsIsVisible;

  constructor(props: unknown) {
    super(props);

    this.goodPersonRef = React.createRef();
    this.sexRef = React.createRef();
    this.formRef = React.createRef();
    this.addCardToState = this.addCardToState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.resetForm = this.resetForm.bind(this);

    this.initCard = {
      name: null,
      date: null,
      birthday: null,
      goodPerson: null,
      sex: null,
      age: null,
      image: null,
      id: null,
    };

    this.initErrorsMessage = {
      name: null,
      date: null,
      birthday: null,
      goodPerson: null,
      sex: null,
      age: null,
      image: null,
    };

    this.initErrorsIsVisible = {
      name: false,
      date: false,
      birthday: false,
      goodPerson: false,
      sex: false,
      age: false,
      image: false,
    };

    this.state = {
      isSubmitDisabled: true,
      isInitForm: true,
      previewImgUrl: null,
      errors: {
        errorsMessage: this.initErrorsMessage,
        errorsIsVisible: this.initErrorsIsVisible,
      },
      cards: [],
    };
  }

  addCardToState(formFields: ICard) {
    const { name, date, birthday, goodPerson, sex, age, image, id } = formFields;
    if (name && date && birthday && goodPerson && sex && age && image && id) {
      this.setState((state) => ({ cards: [...state.cards, formFields] }));
    }
  }

  resetForm() {
    this.formRef.current?.reset();

    if (this.goodPersonRef?.current) {
      this.goodPersonRef.current.checked = false;
    }
    if (this.sexRef?.current) {
      this.sexRef.current.checked = false;
    }

    this.setState({
      errors: {
        errorsMessage: this.initErrorsMessage,
        errorsIsVisible: this.initErrorsIsVisible,
      },
      previewImgUrl: null,
      isSubmitDisabled: true,
      isInitForm: true,
    });
  }

  onChangeHandler(event: React.FormEvent<HTMLFormElement>) {
    const form = this?.formRef?.current as HTMLFormElement;

    // *----- get changed field -----
    const eventTarget = event.target as HTMLInputElement;
    const currentFieldName = eventTarget?.name;

    // *----- get image -----
    const formData = new FormData(form);
    const imageObject = formData.get('image') || null;
    const image =
      imageObject && imageObject instanceof File && imageObject.name
        ? URL.createObjectURL(imageObject)
        : null;

    const isVisibleCurrent = { ...this.state.errors.errorsIsVisible, [currentFieldName]: false };

    const isVisibleValues = Object.values(isVisibleCurrent);

    const isAnyErrors = isValuesValid(isVisibleValues);

    if (this.state.isSubmitDisabled === true && (isAnyErrors || this.state.isInitForm)) {
      this.setState((state) => ({
        errors: {
          errorsMessage: { ...state.errors.errorsMessage, [currentFieldName]: null },
          errorsIsVisible: { ...isVisibleCurrent },
        },
        previewImgUrl: image,
        isSubmitDisabled: false,
      }));
    } else {
      this.setState((state) => ({
        errors: {
          errorsMessage: { ...state.errors.errorsMessage, [currentFieldName]: null },
          errorsIsVisible: { ...isVisibleCurrent },
        },
        previewImgUrl: image,
      }));
    }
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = this?.formRef?.current as HTMLFormElement;
    const cardData = getCardDataFromForm(form);

    const validationErrors = getValidationErrors(cardData);
    const { message, isVisible } = validationErrors;

    const hasNoErrors = isFieldsValid(message);

    const isVisibleCurrent = { ...this.state.errors.errorsIsVisible, ...isVisible };

    if (hasNoErrors) {
      this.addCardToState(cardData);
      this.resetForm();
      alert('Congratulations! You are good enough! Card is on page!');
    } else {
      this.setState({
        errors: {
          errorsMessage: { ...message },
          errorsIsVisible: { ...isVisibleCurrent },
        },
        isSubmitDisabled: !hasNoErrors,
        isInitForm: false,
      });
    }
  }

  render() {
    const { cards, isSubmitDisabled, previewImgUrl, errors } = this.state;

    const { formRef, goodPersonRef, sexRef } = this;

    return (
      <div className="form-page">
        <h1 className="">Form</h1>
        <form
          onSubmit={this.handleSubmit}
          onChange={this.onChangeHandler}
          className="form"
          ref={formRef}
        >
          <Button className="form__submit" name="submitButton" isDisabled={isSubmitDisabled}>
            Create Your Beautiful Card
          </Button>

          <TextInput
            name="name"
            placeholder="please, type your name"
            error={errors.errorsMessage.name}
            testId="name-text-input"
          >
            Your Name*:
          </TextInput>

          <DateInput name="date" error={errors.errorsMessage.date} testId="date-date-input">
            Your Favorite Date*:
          </DateInput>

          <Dropdown
            name="birthday"
            title="Select day"
            options={[
              '01 April',
              '01 August',
              '01 December',
              '01 February',
              '01 January',
              '01 July',
              '01 June',
              '01 March',
              '01 May',
              '01 November',
              '01 October',
              '01 September',
              '02 April',
              '02 August',
              '02 December',
              '02 February',
              '02 January',
              '02 July',
              '02 June',
              '02 March',
              '02 May',
              '02 November',
              '02 October',
              '02 September',
              '03 April',
              '03 August',
              '03 December',
              '03 February',
              '03 January',
              '03 July',
              '03 June',
              '03 March',
              '03 May',
              '03 November',
              '03 October',
              '03 September',
              '04 April',
              '04 August',
              '04 December',
              '04 February',
              '04 January',
              '04 July',
              '04 June',
              '04 March',
              '04 May',
              '04 November',
              '04 October',
              '04 September',
              '05 April',
              '05 August',
              '05 December',
              '05 February',
              '05 January',
              '05 July',
              '05 June',
              '05 March',
              '05 May',
              '05 November',
              '05 October',
              '05 September',
              '06 April',
              '06 August',
              '06 December',
              '06 February',
              '06 January',
              '06 July',
              '06 June',
              '06 March',
              '06 May',
              '06 November',
              '06 October',
              '06 September',
              '07 April',
              '07 August',
              '07 December',
              '07 February',
              '07 January',
              '07 July',
              '07 June',
              '07 March',
              '07 May',
              '07 November',
              '07 October',
              '07 September',
              '08 April',
              '08 August',
              '08 December',
              '08 February',
              '08 January',
              '08 July',
              '08 June',
              '08 March',
              '08 May',
              '08 November',
              '08 October',
              '08 September',
              '09 April',
              '09 August',
              '09 December',
              '09 February',
              '09 January',
              '09 July',
              '09 June',
              '09 March',
              '09 May',
              '09 November',
              '09 October',
              '09 September',
              '10 April',
              '10 August',
              '10 December',
              '10 February',
              '10 January',
              '10 July',
              '10 June',
              '10 March',
              '10 May',
              '10 November',
              '10 October',
              '10 September',
              '11 April',
              '11 August',
              '11 December',
              '11 February',
              '11 January',
              '11 July',
              '11 June',
              '11 March',
              '11 May',
              '11 November',
              '11 October',
              '11 September',
              '12 April',
              '12 August',
              '12 December',
              '12 February',
              '12 January',
              '12 July',
              '12 June',
              '12 March',
              '12 May',
              '12 November',
              '12 October',
              '12 September',
              '13 April',
              '13 August',
              '13 December',
              '13 February',
              '13 January',
              '13 July',
              '13 June',
              '13 March',
              '13 May',
              '13 November',
              '13 October',
              '13 September',
              '14 April',
              '14 August',
              '14 December',
              '14 February',
              '14 January',
              '14 July',
              '14 June',
              '14 March',
              '14 May',
              '14 November',
              '14 October',
              '14 September',
              '15 April',
              '15 August',
              '15 December',
              '15 February',
              '15 January',
              '15 July',
              '15 June',
              '15 March',
              '15 May',
              '15 November',
              '15 October',
              '15 September',
              '16 April',
              '16 August',
              '16 December',
              '16 February',
              '16 January',
              '16 July',
              '16 June',
              '16 March',
              '16 May',
              '16 November',
              '16 October',
              '16 September',
              '17 April',
              '17 August',
              '17 December',
              '17 February',
              '17 January',
              '17 July',
              '17 June',
              '17 March',
              '17 May',
              '17 November',
              '17 October',
              '17 September',
              '18 April',
              '18 August',
              '18 December',
              '18 February',
              '18 January',
              '18 July',
              '18 June',
              '18 March',
              '18 May',
              '18 November',
              '18 October',
              '18 September',
              '19 April',
              '19 August',
              '19 December',
              '19 February',
              '19 January',
              '19 July',
              '19 June',
              '19 March',
              '19 May',
              '19 November',
              '19 October',
              '19 September',
              '20 April',
              '20 August',
              '20 December',
              '20 February',
              '20 January',
              '20 July',
              '20 June',
              '20 March',
              '20 May',
              '20 November',
              '20 October',
              '20 September',
              '21 April',
              '21 August',
              '21 December',
              '21 February',
              '21 January',
              '21 July',
              '21 June',
              '21 March',
              '21 May',
              '21 November',
              '21 October',
              '21 September',
              '22 April',
              '22 August',
              '22 December',
              '22 February',
              '22 January',
              '22 July',
              '22 June',
              '22 March',
              '22 May',
              '22 November',
              '22 October',
              '22 September',
              '23 April',
              '23 August',
              '23 December',
              '23 February',
              '23 January',
              '23 July',
              '23 June',
              '23 March',
              '23 May',
              '23 November',
              '23 October',
              '23 September',
              '24 April',
              '24 August',
              '24 December',
              '24 February',
              '24 January',
              '24 July',
              '24 June',
              '24 March',
              '24 May',
              '24 November',
              '24 October',
              '24 September',
              '25 April',
              '25 August',
              '25 December',
              '25 February',
              '25 January',
              '25 July',
              '25 June',
              '25 March',
              '25 May',
              '25 November',
              '25 October',
              '25 September',
              '26 April',
              '26 August',
              '26 December',
              '26 February',
              '26 January',
              '26 July',
              '26 June',
              '26 March',
              '26 May',
              '26 November',
              '26 October',
              '26 September',
              '27 April',
              '27 August',
              '27 December',
              '27 February',
              '27 January',
              '27 July',
              '27 June',
              '27 March',
              '27 May',
              '27 November',
              '27 October',
              '27 September',
              '28 April',
              '28 August',
              '28 December',
              '28 February',
              '28 January',
              '28 July',
              '28 June',
              '28 March',
              '28 May',
              '28 November',
              '28 October',
              '28 September',
              '29 April',
              '29 August',
              '29 December',
              '29 February',
              '29 January',
              '29 July',
              '29 June',
              '29 March',
              '29 May',
              '29 November',
              '29 October',
              '29 September',
              '30 April',
              '30 August',
              '30 December',
              '30 February',
              '30 January',
              '30 July',
              '30 June',
              '30 March',
              '30 May',
              '30 November',
              '30 October',
              '30 September',
              '31 April',
              '31 August',
              '31 December',
              '31 February',
              '31 January',
              '31 July',
              '31 June',
              '31 March',
              '31 May',
              '31 November',
              '31 October',
              '31 September',
            ]}
            error={errors.errorsMessage.birthday}
            testId="birthday-dropdown-input"
          >
            Your Birthday*:
          </Dropdown>

          <Checkbox
            name="goodPerson"
            error={errors.errorsMessage.goodPerson}
            ref={goodPersonRef}
            testId="good-person-checkbox-input"
          >
            I Am A Good Person*:
          </Checkbox>

          <Switcher
            name="sex"
            error={errors.errorsMessage.sex}
            ref={sexRef}
            testId="sex-switcher-input"
          >
            Male/Female*:
          </Switcher>

          <RadioButtons
            name="age"
            options={[
              '150',
              '149',
              '148',
              '147',
              '146',
              '145',
              '144',
              '143',
              '142',
              '141',
              '140',
              '139',
              '138',
              '137',
              '136',
              '135',
              '134',
              '133',
              '132',
              '131',
              '130',
              '129',
              '128',
              '127',
              '126',
              '125',
              '124',
              '123',
              '122',
              '121',
              '120',
              '119',
              '118',
              '117',
              '116',
              '115',
              '114',
              '113',
              '112',
              '111',
              '110',
              '109',
              '108',
              '107',
              '106',
              '105',
              '104',
              '103',
              '102',
              '101',
              '100',
              '99',
              '98',
              '97',
              '96',
              '95',
              '94',
              '93',
              '92',
              '91',
              '90',
              '89',
              '88',
              '87',
              '86',
              '85',
              '84',
              '83',
              '82',
              '81',
              '80',
              '79',
              '78',
              '77',
              '76',
              '75',
              '74',
              '73',
              '72',
              '71',
              '70',
              '69',
              '68',
              '67',
              '66',
              '65',
              '64',
              '63',
              '62',
              '61',
              '60',
              '59',
              '58',
              '57',
              '56',
              '55',
              '54',
              '53',
              '52',
              '51',
              '50',
              '49',
              '48',
              '47',
              '46',
              '45',
              '44',
              '43',
              '42',
              '41',
              '40',
              '39',
              '38',
              '37',
              '36',
              '35',
              '34',
              '33',
              '32',
              '31',
              '30',
              '29',
              '28',
              '27',
              '26',
              '25',
              '24',
              '23',
              '22',
              '21',
              '20',
              '19',
              '18',
              '17',
              '16',
              '15',
              '14',
              '13',
              '12',
              '11',
              '10',
              '9',
              '8',
              '7',
              '6',
              '5',
              '4',
              '3',
              '2',
              '1',
            ]}
            error={errors.errorsMessage.age}
            testId="age-radio-input"
          >
            Your Age*:
          </RadioButtons>

          <FileUpload
            name="image"
            accept=".jpg, .jpeg, .png"
            error={errors.errorsMessage.image}
            testId="image-file-input"
          >
            Upload Your Avatarka*:
          </FileUpload>
          {previewImgUrl && (
            <img className="form__img-preview" src={previewImgUrl} alt={previewImgUrl} />
          )}
        </form>
        <button onClick={this.resetForm}>Reset Current Form</button>
        <>
          {cards.length > 0 &&
            cards.map((card) => (
              <div key={card.id} className="form-card" data-testid="card">
                <h2>Your Name: {card.name}</h2>
                <p>Your Favorite Date: {card.date}</p>
                <p>Your Birthday: {card.birthday}</p>
                <p>{card.goodPerson && 'I am a good person'}</p>
                <p>Male/Female: {card.sex ? 'yes' : 'no'}</p>
                <p>Your Age: {card.age}</p>
                {card.image && <img src={card.image} alt={card.image} />}
              </div>
            ))}
        </>
      </div>
    );
  }
}
