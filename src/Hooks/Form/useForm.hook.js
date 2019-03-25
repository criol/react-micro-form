import { useState } from 'react';
import { useFormChecking } from './useFormChecking.hook';
import { useImmutableHash } from '../Common/useImmutableHash.hook';
import { isEqualTo, isArray } from '../../Helpers/fp';

const isCheckbox = isEqualTo('checkbox');
const noopChecker = () => ({});

function toggleValueInArray(array, value) {
  if (!isArray(array)) {
    return [value];
  }
  const newArray = [...array];

  if (newArray.includes(value)) {
    newArray.splice(newArray.indexOf(value), 1);
  } else {
    newArray.push(value);
  }

  return newArray;
}

function skipTick() {
  return new Promise(resolve => setTimeout(resolve));
}

export function useForm(
  onSubmit,
  { validate = noopChecker, warn = noopChecker },
  initialValues = {},
) {
  const [values, setValues] = useState(initialValues);
  const [warnings, checkWarnings, hasWarnings] = useFormChecking(values, warn);
  const [errors, validateValues, hasErrors] = useFormChecking(values, validate);

  const [formStatus, updateFormStatus] = useImmutableHash({
    submitted: false,
    visited: false,
    touched: false,
    pristine: true,
    dirty: false,
  });

  const [fieldsStatus, updateFieldsStatus] = useImmutableHash({});
  const groupFields = {};
  const togglingFields = {};

  function handleSubmit(event) {
    event.preventDefault();
    updateFormStatus({
      submitted: true,
    });
    if (!hasErrors) {
      onSubmit(values);
    }
  }

  function resetValues(newValues) {
    setValues(newValues || initialValues);
  }

  const fields = {};

  function registerInputType(fieldName, type) {
    const checkbox = isCheckbox(type);

    if (checkbox) {
      if (fields[fieldName]) {
        groupFields[fieldName] = true;
        if (checkbox) {
          delete togglingFields[fieldName];
        }
      } else {
        fields[fieldName] = true;
        if (checkbox) {
          togglingFields[fieldName] = true;
        }
      }
    }
  }

  function changeField(fieldName, newValue) {
    const newValues = {
      ...values,
    };

    if (groupFields[fieldName]) {
      newValues[fieldName] = toggleValueInArray(newValues[fieldName], newValue);
    } else if (togglingFields[fieldName]) {
      newValues[fieldName] =
        newValues[fieldName] === undefined ? newValue : undefined;
    } else {
      newValues[fieldName] = newValue;
    }

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
    skipTick().then(() => {
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
    });
  }

  function getFieldStatus(fieldName) {
    const invalid = errors[fieldName] && !!errors[fieldName].length;
    const warned = warnings[fieldName] && !!warnings[fieldName].length;
    const { submitted } = formStatus;

    const defaultFieldStatus = {
      submitted,
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

  return [
    {
      changeField,
      changeFieldFocus,
      initialValues,
      values,
      errors,
      warnings,
      status,
      getFieldStatus,
      registerInputType,
    },
    handleSubmit,
    {
      values,
      errors,
      status,
    },
    resetValues,
  ];
}
