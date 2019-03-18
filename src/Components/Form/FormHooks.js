import { useState } from 'react';

export function useForm (onSubmit) {
  console.log(useState);
  const [allInputs, setInputs] = useState({});
  let fields = {}

  return {
    form: {
      registerField: (fieldName, field) => {
        // setInputs({
        //   ...allInputs,
        //   fieldName: input
        // });
        fields[fieldName] = field;
      }
    },
    handleSubmit: (e) => {
      Object.entries(fields).forEach(([name, field]) => {

      })
      e.preventDefault();
      const errors = Object.entries(fields).reduce((acc, [name, field]) => {
        console.log(field.suportMethods.forceValidation());
        return [...acc, ...field.suportMethods.forceValidation()];
      }, []);
      console.log(errors);
      !errors.length && onSubmit && onSubmit();
    },
  }
}


export function useField (fieldName, form, validate) {
  const [ value, setValue] = useState('');
  const [ touched, setTouched ] = useState(false);
  const input = {
    name: fieldName,
    onChange: (e) => {
      setValue(e.target.value);
    },
    onFocus: (e) => {
      setTouched(true)
    },
    value
  };
  const suportMethods = {
    forceValidation: () => {
      return useValidate(value, validate);
    },
  }
  form.registerField(fieldName, {input, suportMethods});
  const [ errors ] = useValidate(value, validate);
  
  return {
    input,
    states: {
      touched,
      hasErrors: !!errors.length
    },
    errors
  }
}

export function useValidate(value, validateFunction) {
  return [
    validateFunction(value) || []
  ]
}