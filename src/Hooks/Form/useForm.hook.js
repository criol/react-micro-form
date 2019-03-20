import { useState } from 'react';
import { useFormChecking } from './useFormChecking.hook';
import { useImmutableHash } from '../Common/useImmutableHash.hook';

export function useForm(onSubmit, { validate, warn }, initialValues) {
  const [values, setValues] = useState(initialValues);
  const [warnings, checkWarnings, hasWarnings] = useFormChecking(values, warn);
  const [errors, validateValues, hasErrors] = useFormChecking(values, validate);

  const [formStatus, updateFormStatus] = useImmutableHash({
    visited: false,
    touched: false,
    pristine: true,
    dirty: false,
  });

  const [fieldsStatus, updateFieldsStatus] = useImmutableHash({});

  function changeField(fieldName, newValue) {
    const newValues = {
      ...values,
      [fieldName]: newValue,
    };

    setValues(newValues);
    validateValues(newValues);
    checkWarnings(newValues);

    updateFieldsStatus({
      [fieldName]: {
        ...fieldsStatus[fieldName],
        dirty: true,
        pristine: false,
      },
    });

    updateFormStatus({
      dirty: true,
      pristine: false,
    });
  }

  function changeFieldFocus(fieldName, isFocused) {
    if (isFocused) {
      updateFormStatus({
        visited: true,
      });

      updateFieldsStatus({
        [fieldName]: {
          ...fieldsStatus[fieldName],
          visited: true,
        },
      });
    } else {
      updateFormStatus({
        touched: true,
      });

      updateFieldsStatus({
        [fieldName]: {
          ...fieldsStatus[fieldName],
          touched: true,
        },
      });
    }
  }

  function getFieldStatus(fieldName) {
    const invalid = errors[fieldName] && !!errors[fieldName].length;
    const warned = warnings[fieldName] && !!warnings[fieldName].length;

    const defaultFieldStatus = {
      visited: false,
      touched: false,
      pristine: true,
      dirty: false,
      valid: !invalid,
      invalid,
      unwarned: !warned,
      warned,
    };

    return {
      ...defaultFieldStatus,
      ...fieldsStatus[fieldName],
    };
  }

  const status = {
    ...formStatus,
    hasErrors,
    hasWarnings,
  };

  return {
    form: {
      changeField,
      changeFieldFocus,
      initialValues,
      values,
      errors,
      warnings,
      status,
      getFieldStatus,
    },
    handleSubmit: onSubmit,
    values,
    errors,
    status,
  };
}
