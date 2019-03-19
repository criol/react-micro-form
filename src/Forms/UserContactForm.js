// code related to a specific form goes here, using the imported generic Form component
// see the SINGLE IMPLEMENTATION section for details
import React from 'react'
import Form from '../Components/Form'
import { useField, useForm } from '../Components/Form/FormHooks';

const required = v => v ? null : 'required';
 
const UserContactForm = () => {
  console.log('render')
  const { form, handleSubmit } = useForm(
    () => {},
    {
      validate: values => {
        return {
          firstName: [required(values.firstName)],
          lastName: [required(values.lastName)]
        }
      }, 
      warn: values => {
        return {
          firstName: [required(values.firstName)],
          lastName: [required(values.lastName)]
        }
      },
    },
    {
      firstName: 'lol', 
      lastName: 'boo'
    }
  );

  const firstNameField = useField('firstName', form);
  const lastNameField = useField('lastName', form);
  
  return (
    <form onSubmit={handleSubmit}>
      <input {...firstNameField.input} />

      <input {...firstNameField.input} />
      <pre>{JSON.stringify(firstNameField.states, undefined, 2)}</pre>

      <input {...lastNameField.input} />
      <pre>{JSON.stringify(lastNameField.states, undefined, 2)}</pre>
      <pre>{JSON.stringify(form, undefined, 2)}</pre>
    </form>
  );
}


export default UserContactForm