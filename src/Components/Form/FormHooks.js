import { useState } from 'react';

import { 
  flow, 
  split, 
  combineObject, 
  map, 
  some,
  filterOutValues, 
  objectKeys, 
  objectValues,
  containsValues
} from '../../Helpers/fp';

const errorFilterer = flow(
  split(
    flow(
      objectKeys
    ),
    flow(
      objectValues,
      map(filterOutValues(null, '', undefined)),
    ),
  ),
  combineObject
);

window.errorFilterer = flow(
  split(
    flow(
      objectKeys
    ),
    flow(
      objectValues,
      map(filterOutValues(null, '', undefined)),
    ),
  ),
  combineObject
);
function useFormChecking(values, checkFunction) {
  const [errors, setErrors] = useState(
    errorFilterer(checkFunction(values))
  );

  function doCheck(vals) {
    setErrors(
      errorFilterer(checkFunction(vals))
    );
  }
  return [
    errors,
    doCheck,
    flow(objectValues, x=> {console.log(x); return x}, some(v => v.length), x=> {console.log(x); return x})(errors)
  ]
}

export function useForm (onSubmit, {validate, warn}, initialValues) {
  const [ values, setValues ] = useState(initialValues);
  const [ warnings, setWarnings, hasWarnings ] = useFormChecking(values, warn);
  const [ errors, setErrors, hasErrors ] = useFormChecking(values, validate);
  
  const [ formStates, setFormStates ] = useState({
    touched: false,
  });

  function changeField(fieldName, newValue) {
    const newValues = {
      ...values,
      [fieldName]: newValue
    }
    setValues(newValues);
    setErrors(newValues);
    setWarnings(newValues);
  }

  function changeFieldFocus(fieldName, isFocused) {
    if (isFocused) {
      setFormStates({
        ...formStates,
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
    state: {
      ...formStates,
      hasErrors,
      hasWarnings
    }
  }

  return {
    form,
    handleSubmit: onSubmit,
    values,
    errors,
    state: {
      ...formStates,
      hasErrors,
      hasWarnings
    }
  }
}


export function useField (fieldName, form) {
  return {
    input: {
      onChange: (e) => {
        form.changeField(fieldName, e.target.value);
      },
      onFocus: e => {
        form.changeFieldFocus(fieldName, true);
      },
      onBlur: e => {
        form.changeFieldFocus(fieldName, false);
      },
      value: form.values[fieldName]
    },
    errors: form.errors[fieldName],
    warnings: form.warnings[fieldName],
  }
}