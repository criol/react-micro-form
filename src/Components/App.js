import React from 'react';
import { Global, css } from '@emotion/core';
import styled from '@emotion/styled';
import { UserContactForm } from '../Forms/UserContactForm/UserContactForm';

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

const App = () => (
  <React.Fragment>
    <Global styles={globalStyles} />
    <FormHeader>Update Your Details</FormHeader>
    <UserContactForm
      onSubmit={val => alert(JSON.stringify(val, undefined, 2))}
    />
  </React.Fragment>
);

export default App;
