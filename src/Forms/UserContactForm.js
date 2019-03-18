// code related to a specific form goes here, using the imported generic Form component
// see the SINGLE IMPLEMENTATION section for details
import React from 'react'
import Form from '../Components/Form'
import { useField, useForm } from '../Components/Form/FormHooks';

const UserContactForm = () => {
  const { form, handleSubmit } = useForm(() => {
    console.log('it works');
  });

  const firstNameField = useField('firstName', form, (value) => !value ? ['required'] : null);
  return (
    <form onSubmit={handleSubmit}>
      <input {...firstNameField.input} />
      <pre>{JSON.stringify(firstNameField.states, undefined, 2)}</pre>
      {firstNameField.errors.map(v=>v)}

    </form>
  );
}


export default UserContactForm