export function useField(fieldName, form) {
  return {
    input: {
      onChange: e => {
        form.changeField(fieldName, e.target.value);
      },
      onFocus: () => {
        form.changeFieldFocus(fieldName, true);
      },
      onBlur: () => {
        form.changeFieldFocus(fieldName, false);
      },
      value: form.values[fieldName] || '',
    },
    errors: form.errors[fieldName],
    warnings: form.warnings[fieldName],
    status: form.getFieldStatus(fieldName),
  };
}
