import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { useForm, useField } from '../../Hooks/Form';
import { StyledButton } from '../../Components/StyledComponents/StyledButton';
import { StyledFormContrainer } from '../../Components/StyledComponents/StyledFormContrainer';
import { StyledPre } from '../../Components/StyledComponents/StyledPre';
import { StyledH2 } from '../../Components/StyledComponents/StyledH2';
import { StyledH4 } from '../../Components/StyledComponents/StyledH4';
import { FormControl } from '../../Components/Form/FormControl';

const StyledRows = styled.div`
  display: flex;
  flex-direciton: row;
`;

const StyledRow = styled.div`
  margin-right: 30px;
`;

export const CheckRadioForm = ({ onSubmit }) => {
  const [form, handleSubmit, { values }] = useForm(onSubmit, {});
  const [singlCheckbox] = useField('singleCheckbox', form, 'yes!');
  const [checkbox1] = useField('checkbox', form, 'checkbox1');
  const [checkbox2] = useField('checkbox', form, 'checkbox2');
  const [radio1] = useField('radio', form, 'radio1');
  const [radio2] = useField('radio', form, 'radio2');

  return (
    <Fragment>
      <StyledH2>Check your preferences</StyledH2>

      <StyledFormContrainer>
        <form onSubmit={handleSubmit}>
          <StyledH4>Single checkbox</StyledH4>
          <FormControl label="please check">
            <input type="checkbox" {...singlCheckbox} />
          </FormControl>
          <StyledH4>Multiple checkboxes</StyledH4>
          <StyledRows>
            <StyledRow>
              <FormControl label="checkbox1">
                <input type="checkbox" {...checkbox1} />
              </FormControl>
            </StyledRow>
            <StyledRow>
              <FormControl label="checkbox2">
                <input type="checkbox" {...checkbox2} />
              </FormControl>
            </StyledRow>
          </StyledRows>
          <StyledH4>RadioButtons</StyledH4>
          <StyledRows>
            <StyledRow>
              <FormControl label="radio1">
                <input type="radio" {...radio1} />
              </FormControl>
            </StyledRow>
            <StyledRow>
              <FormControl label="radio2">
                <input type="radio" {...radio2} />
              </FormControl>
            </StyledRow>
          </StyledRows>
          <StyledButton type="submit">Send</StyledButton>
        </form>

        <StyledPre>{JSON.stringify(values, null, 2)}</StyledPre>
      </StyledFormContrainer>
    </Fragment>
  );
};
