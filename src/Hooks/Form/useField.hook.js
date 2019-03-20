import { useRef, useEffect } from 'react';

function isChecked(value, fixedValue) {
  console.log(value, fixedValue);

  return (
    value === fixedValue || (Array.isArray(value) && value.includes(fixedValue))
  );
}

export function useField(fieldName, form, fixedValue) {
  const ref = useRef(null);
  const formValue = form.values[fieldName];
  const checked = isChecked(formValue, fixedValue);

  useEffect(() => {
    form.registerInputType(fieldName, ref.current.type);
  });

  return [
    {
      onChange: e => {
        form.changeField(fieldName, e.target.value);
      },
      onFocus: () => {
        form.changeFieldFocus(fieldName, true);
      },
      onBlur: () => {
        form.changeFieldFocus(fieldName, false);
      },
      value: fixedValue || form.values[fieldName],
      checked,
      name: fieldName,
      ref,
    },
    {
      errors: form.errors[fieldName],
      warnings: form.warnings[fieldName],
      status: form.getFieldStatus(fieldName),
    },
  ];
}
