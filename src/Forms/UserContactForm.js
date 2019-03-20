// code related to a specific form goes here, using the imported generic Form component
// see the SINGLE IMPLEMENTATION section for details
import React from 'react';
import { useField, useForm } from '../Hooks/Form';

let renderCount = 0;
const required = v => (v ? null : 'required');
const lengthBiggerThan = (v, l) => (v.length >= l ? null : 'tooSmall');

const validate = values => {
  return {
    firstName: [required(values.firstName)],
    lastName: [required(values.lastName)],
  };
};
const warn = values => {
  return {
    firstName: [lengthBiggerThan(values.firstName, 4)],
    lastName: [lengthBiggerThan(values.lastName, 4)],
  };
};

const UserContactForm = () => {
  renderCount += 1;

  const { form, handleSubmit } = useForm(
    () => {
      console.log('it works!');
    },
    { validate, warn },
    {
      firstName: 'lol',
      lastName: 'boo',
    },
  );

  const firstNameField = useField('firstName', form);
  const lastNameField = useField('lastName', form);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        render count:
        {renderCount}
      </div>
      <input {...firstNameField.input} />

      <input {...firstNameField.input} />
      <pre>{JSON.stringify(firstNameField.states, undefined, 2)}</pre>

      <input {...lastNameField.input} />
      <pre>{JSON.stringify(lastNameField.states, undefined, 2)}</pre>
      <pre>{JSON.stringify(form, undefined, 2)}</pre>
    </form>
  );
};

export default UserContactForm;
