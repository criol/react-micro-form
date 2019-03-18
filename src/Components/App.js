import React from 'react'
import UserContactForm from '../Forms/UserContactForm'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'

const globalStyles = css`
  body {
    font-family: sans-serif;
  }
`

// example of styled component
// https://emotion.sh/docs/styled
const FormHeader = styled.h1`
  color: hotpink;
`

const App = () => (
  <React.Fragment>
      <Global styles={globalStyles} />
      <FormHeader>Update Your Details</FormHeader>
      <UserContactForm />
  </React.Fragment>
)

export default App