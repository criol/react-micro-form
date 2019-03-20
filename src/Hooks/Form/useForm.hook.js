import { useState } from 'react';
import { useFormChecking } from './useFormChecking.hook';

export function useForm(onSubmit, { validate, warn }, initialValues) {
  const [values, setValues] = useState(initialValues);
  const [warnings, setWarnings, hasWarnings] = useFormChecking(values, warn);
  const [errors, setErrors, hasErrors] = useFormChecking(values, validate);

  const [formStates, setFormStates] = useState({
    touched: false,
  });

  function changeField(fieldName, newValue) {
    const newValues = {
      ...values,
      [fieldName]: newValue,
    };

    setValues(newValues);
    setErrors(newValues);
    setWarnings(newValues);
  }

  function changeFieldFocus(fieldName, isFocused) {
    if (isFocused) {
      setFormStates({
        ...formStates,
        touched: true,
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
    state: {
      ...formStates,
      hasErrors,
      hasWarnings,
    },
  };

  return {
    form,
    handleSubmit: onSubmit,
    values,
    errors,
    state: {
      ...formStates,
      hasErrors,
      hasWarnings,
    },
  };
}
