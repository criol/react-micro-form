import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { useForm, useField } from '../../Hooks/Form';
import { StyledInput } from '../../Components/StyledComponents/StyledInput';
import { StyledButton } from '../../Components/StyledComponents/StyledButton';
import { StyledFormContrainer } from '../../Components/StyledComponents/StyledFormContrainer';
import { StyledPre } from '../../Components/StyledComponents/StyledPre';
import { StyledH2 } from '../../Components/StyledComponents/StyledH2';
import { StyledButtonInline } from '../../Components/StyledComponents/StyledButtonInline';

const InputWithMargin = styled(StyledInput)`
  margin-bottom: 10px;
`;

const ButtonWithMargin = styled(StyledButton)`
  margin-right: 10px;
`;

export const DefaultValuesForm = ({ onSubmit }) => {
  const [form, handleSubmit, { values }, resetToInitialValues] = useForm(
    onSubmit,
    {},
    {
      input1: 'this',
      input2: 'is',
      input3: 'default',
      input4: 'value',
    },
  );

  const [input1] = useField('input1', form);
  const [input2] = useField('input2', form);
  const [input3] = useField('input3', form);
  const [input4] = useField('input4', form);

  return (
    <Fragment>
      <StyledH2>Default values</StyledH2>

      <StyledFormContrainer>
        <form onSubmit={handleSubmit}>
          <InputWithMargin {...input1} />

          <InputWithMargin {...input2} />

          <InputWithMargin {...input3} />

          <InputWithMargin {...input4} />

          <ButtonWithMargin type="submit">Send</ButtonWithMargin>

          <StyledButtonInline type="button" onClick={resetToInitialValues}>
            Reset
          </StyledButtonInline>
        </form>

        <StyledPre>{JSON.stringify(values, null, 2)}</StyledPre>
      </StyledFormContrainer>
    </Fragment>
  );
};
