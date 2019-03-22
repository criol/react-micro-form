import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { UserContactForm } from '../Forms/UserContactForm/UserContactForm';
import { ContentToggler } from './ContentToggler/ContentToggler';
import { DefaultValuesForm } from '../Forms/DefaultValuesForm/DefaultValuesForm';

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

const onSubmit = val => alert(JSON.stringify(val, undefined, 2));

const App = () => (
  <React.Fragment>
    <Global styles={globalStyles} />
    <FormHeader>Update Your Details</FormHeader>
    <UserContactForm onSubmit={onSubmit} />
    <ContentToggler
      label="Show other examples"
      labelNegative="Hide other examples"
    >
      <DefaultValuesForm onSubmit={onSubmit} />
    </ContentToggler>
  </React.Fragment>
);

export default App;
