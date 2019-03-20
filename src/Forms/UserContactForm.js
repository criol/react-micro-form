// code related to a specific form goes here, using the imported generic Form component
// see the SINGLE IMPLEMENTATION section for details
import React from 'react';
import { useField, useForm } from '../Hooks/Form';
import { validate } from './validate';
import { FieldNames } from './constants';

let renderCount = 0;

const warn = () => ({});

const UserContactForm = () => {
  renderCount += 1;

  const { form, handleSubmit } = useForm(
    values => {
      console.log('it works!', values);
    },
    { validate, warn },
    {
      lastName: 'boo',
      sex: 'male',
    },
  );

  const [firstName, firstNameMeta] = useField(FieldNames.firstName, form);
  const [lastName, lastNameMeta] = useField(FieldNames.lastName, form);
  const [areaCode, areaCodeMeta] = useField(FieldNames.areaCode, form);
  const [phoneNumber, phoneNumberMeta] = useField(FieldNames.phoneNumber, form);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        render count:
        {renderCount}
      </div>
      <input {...firstName} />
      {firstNameMeta.errors.map(error => (
        <div>{error}</div>
      ))}
      <br />
      <input {...lastName} />
      {lastNameMeta.errors.map(error => (
        <div>{error}</div>
      ))}
      <br />
      <input {...areaCode} />
      {areaCodeMeta.errors.map(error => (
        <div>{error}</div>
      ))}
      <br />
      <input {...phoneNumber} />
      {phoneNumberMeta.errors.map(error => (
        <div>{error}</div>
      ))}
      <button type="submit">submit</button>
    </form>
  );
};

export default UserContactForm;
