import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { ExampleFormContainer } from './Form/ExampleFormContainer';
import { UserContactForm } from '../Forms/UserContactForm/UserContactForm';
import { ContentToggler } from './ContentToggler/ContentToggler';
import {
  DefaultValuesForm,
  CheckRadioForm,
  SelectForm,
  CustomControlForm,
} from '../Forms/Examples';

const globalStyles = css`
  body {
    font-family: sans-serif;
  }
`;

// example of styled component
// https://emotion.sh/docs/styled
const FormHeader = styled.h1`
  color: hotpink;
`;

const FormSubHeader = styled.h2`
  color: hotpink;
`;

const onSubmit = val => {
  console.log(val);
};

const App = () => (
  <React.Fragment>
    <Global styles={globalStyles} />
    <FormHeader>Update Your Details</FormHeader>
    <UserContactForm onSubmit={onSubmit} />

    <ContentToggler
      label="Show other examples"
      labelNegative="Hide other examples"
    >
      <FormSubHeader>Default values</FormSubHeader>
      <ExampleFormContainer>
        {onChange => (
          <DefaultValuesForm onSubmit={onSubmit} onChange={onChange} />
        )}
      </ExampleFormContainer>

      <FormSubHeader>Checkboxes and radios</FormSubHeader>
      <ExampleFormContainer>
        {onChange => <CheckRadioForm onSubmit={onSubmit} onChange={onChange} />}
      </ExampleFormContainer>

      <FormSubHeader>Select fields</FormSubHeader>
      <ExampleFormContainer>
        {onChange => <SelectForm onSubmit={onSubmit} onChange={onChange} />}
      </ExampleFormContainer>

      <FormSubHeader>Custom control</FormSubHeader>
      <ExampleFormContainer>
        {onChange => (
          <CustomControlForm onSubmit={onSubmit} onChange={onChange} />
        )}
      </ExampleFormContainer>
    </ContentToggler>
  </React.Fragment>
);

export default App;
