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
    values => {
      console.log('it works!', values);
    },
    { validate, warn },
    {
      lastName: 'boo',
      sex: 'male',
    },
  );

  const [firstNameField] = useField('firstName', form);
  const [lastNameField] = useField('lastName', form);
  const [radio1] = useField('sex', form, 'male');
  const [radio2] = useField('sex', form, 'female');
  const [checkbox] = useField('isPrivate', form, 'true');
  const [checkbox1] = useField('food', form, 'melon');
  const [checkbox2] = useField('food', form, 'watermelon');

  return (
    <form onSubmit={handleSubmit}>
      <div>
        render count:
        {renderCount}
      </div>
      <input {...firstNameField} />
      <input {...lastNameField} />
      <br />
      sex
      <input type="radio" {...radio1} />
      <input type="radio" {...radio2} />
      <br />
      food
      <input type="checkbox" {...checkbox1} />
      <input type="checkbox" {...checkbox2} />
      <br />
      isPrivate
      <input type="checkbox" {...checkbox} />
      <pre>{JSON.stringify(form, undefined, 2)}</pre>
      <button type="submit">submit</button>
    </form>
  );
};

export default UserContactForm;
