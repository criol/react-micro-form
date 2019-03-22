// code related to a specific form goes here, using the imported generic Form component
// see the SINGLE IMPLEMENTATION section for details
import React from 'react';
import styled from '@emotion/styled';
import { Input } from '../../Components/Form/Input';
import { useField, useForm } from '../../Hooks/Form';
import { validate } from './validate';
import { FieldNames } from './constants';

const InputsContainer = styled.div`
  width: 500px;
  margin-bottom: 10px;
`;

export const UserContactForm = ({ onSubmit = () => {} }) => {
  const [form, handleSubmit] = useForm(onSubmit, { validate });

  const [firstName, firstNameMeta] = useField(FieldNames.firstName, form);
  const [lastName, lastNameMeta] = useField(FieldNames.lastName, form);
  const [areaCode, areaCodeMeta] = useField(FieldNames.areaCode, form);
  const [number, numberMeta] = useField(FieldNames.phoneNumber, form);

  return (
    <form onSubmit={handleSubmit}>
      <InputsContainer>
        <Input
          inputParams={firstName}
          meta={firstNameMeta}
          label="First name*"
        />
        <Input inputParams={lastName} meta={lastNameMeta} label="Last name" />
        <Input inputParams={areaCode} meta={areaCodeMeta} label="Area code" />
        <Input inputParams={number} meta={numberMeta} label="Phone number*" />
      </InputsContainer>
      <button type="submit">submit</button>
    </form>
  );
};
