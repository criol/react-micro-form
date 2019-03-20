// code related to a specific form goes here, using the imported generic Form component
// see the SINGLE IMPLEMENTATION section for details
import React from 'react';
import { ErrorMessages } from '../../Components/Form/ErrorMessages';
import { useField, useForm } from '../../Hooks/Form';
import { validate } from './validate';
import { FieldNames } from './constants';

const UserContactForm = ({ onSubmit = () => {} }) => {
  const [form, handleSubmit] = useForm(onSubmit, { validate });

  const [firstName, firstNameMeta] = useField(FieldNames.firstName, form);
  const [lastName, lastNameMeta] = useField(FieldNames.lastName, form);
  const [areaCode, areaCodeMeta] = useField(FieldNames.areaCode, form);
  const [phoneNumber, phoneNumberMeta] = useField(FieldNames.phoneNumber, form);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First name *
        <input {...firstName} />
      </label>

      <ErrorMessages
        status={firstNameMeta.status}
        messages={firstNameMeta.errors}
        showConditions={['touched', 'submitted']}
      />
      <br />
      <label>
        Last name
        <input {...lastName} />
      </label>
      <ErrorMessages
        status={lastNameMeta.status}
        messages={lastNameMeta.errors}
        showConditions={['touched', 'submitted']}
      />
      <br />
      <label>
        Area code
        <input {...areaCode} />
      </label>
      <ErrorMessages
        status={areaCodeMeta.status}
        messages={areaCodeMeta.errors}
        showConditions={['touched', 'submitted']}
      />
      <br />
      <label>
        Phone number *
        <input {...phoneNumber} />
      </label>
      <ErrorMessages
        status={phoneNumberMeta.status}
        messages={phoneNumberMeta.errors}
        showConditions={['touched', 'submitted']}
      />
      <br />
      <button type="submit">submit</button>
    </form>
  );
};

export default UserContactForm;
