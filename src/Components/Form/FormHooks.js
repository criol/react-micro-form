import { useState } from 'react';

const noop = () => {};



export function useForm (onSubmit, {validate, warn}, initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(validate(values));
  const [warnings, setWarnings] = useState(warn(values));
  const [state, setState] = useState({
    touched: false,
    valid: true,
  });

  function changeField(fieldName, newValue) {
    const newValues = {
      ...values,
      [fieldName]: newValue
    }
    setValues(newValues);
    const errors = validate(newValues);
    setErrors(errors);
    setWarnings(warn(newValues));
  }

  function changeFieldFocus(fieldName, isFocused) {
    if (isFocused) {
      setState({
        ...state,
        touched: true
      });
    }
  }

  const form = {
    changeField,
    changeFieldFocus,
    initialValues,
    values,
    errors,
    warnings,
    state
  }

  return {
    form,
    handleSubmit: noop,
    values,
    errors,
    state
  }
}


export function useField (fieldName, form) {
  return {
    input: {
      onChange: (e) => {
        form.changeField(fieldName, e.target.value)
      },
      onFocus: e => {
        form.changeFieldFocus(fieldName, true)
      },
      onBlur: e => {
        form.changeFieldFocus(fieldName, false)
      },
      value: form.values[fieldName]
    },
    errors: form.errors[fieldName],
    warnings: form.warnings[fieldName],
  }
}