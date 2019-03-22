import React from 'react';
import styled from '@emotion/styled';
import { ErrorMessages } from './ErrorMessages';

const InputContainer = styled.div`
  display: flex;
  margin-bottom: 5px;
  flex-direction: column;

  &:last-child {
    margin-bottom: 0px;
  }
`;

const LabelContainer = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const LabelText = styled.label`
  color: #606060;
  margin-bottom: 5px;
  line-height: 20px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 2px;
  padding: 5px;
  border: 1px solid #ccc;

  &:focus {
    outline: none;
    border: 1px solid #0d8ade;
  }
`;

const ErrorMessagesContainer = styled.div`
  color: #f25255;
  min-height: 15px;
  font-size: 13px;
  margin-top: 5px;
}`;

export const Input = ({ inputParams, meta, label }) => (
  <InputContainer>
    <LabelContainer>
      <LabelText>{label}</LabelText>
      <StyledInput {...inputParams} />
    </LabelContainer>
    <ErrorMessagesContainer>
      <ErrorMessages
        status={meta.status}
        messages={meta.errors}
        showConditions={['touched', 'submitted']}
      />
    </ErrorMessagesContainer>
  </InputContainer>
);
