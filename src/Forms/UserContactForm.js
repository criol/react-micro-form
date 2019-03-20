// code related to a specific form goes here, using the imported generic Form component
// see the SINGLE IMPLEMENTATION section for details
import React from 'react';
import { useField, useForm } from '../Hooks/Form';

let renderCount = 0;
const required = v => (v ? null : 'required');
const lengthBiggerThan = (v = '', l) =>
  v.length >= l ? null : `tooSmall (should be ${l})`;

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
      <div>status</div>
      <pre>{JSON.stringify(firstNameField.status, undefined, 2)}</pre>
      <div>errors</div>
      <pre>{JSON.stringify(firstNameField.errors, undefined, 2)}</pre>
      <div>warnings</div>
      <pre>{JSON.stringify(firstNameField.warnings, undefined, 2)}</pre>
      <input {...lastNameField.input} />
      <div>status</div>
      <pre>{JSON.stringify(lastNameField.status, undefined, 2)}</pre>
      <div>errors</div>
      <pre>{JSON.stringify(lastNameField.errors, undefined, 2)}</pre>
      <div>warnings</div>
      <pre>{JSON.stringify(lastNameField.warnings, undefined, 2)}</pre>

      <pre>{JSON.stringify(form, undefined, 2)}</pre>
    </form>
  );
};

export default UserContactForm;
