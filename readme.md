# React-hooks-form


### basic usage
```jsx
function FancyForm({ onSubmit }) {
  const [form, handleSubmit] = useForm(onSubmit);
  const [inputProps] = useField('inputName', form);
    
  return (
    <form onSubmit={handleSubmit}>
      <input {...inputProps} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

*for other examples please visit [example folder](https://github.com/criol/react-hook-form/tree/master/src/Forms/Examples)*


## API

### useForm
##### arguments

```javascript
useForm({onSubmit, onChange}, {validate, warn}, initialValues)
```
`onSubmit` - Callback function. Will be called with all values after successful submission. Required. 

`onChange` - Callback function. Will be called with all values after any value change.

`validate` - Checker function. Receives all values, should return a hash: `{fieldName: errorString | [...errorStrings]`. Result of this function can block submit.

`warn` - Checker function. Receives all values, should return a hash: `{fieldName: errorString | [...errorStrings]`. Result of this function **never** blocks submit.

`initialValues` - Hash `{fieldName: value}` to define initial values for a form.



```javascript
useForm(
  {
    onSubmit: values => {
      console.log('Submit!', values);
    },
    onChange: values => {
      console.log('Submit!', values);
    },
  },
  {
    validate: values => {
      return {
        password: !values.password ? 'required' : null,
      };
    },
    warn: values => {
      return {
        password: values.password.length < 5 ? 'password is too short' : null,
      };
    },
  },
  {
    password: '#x}S%[3sQM3)5c/G',
  }
)
```

##### return values

```javascript
const [form, handleSubmit, {
  values, 
  errors, 
  warnings, 
  status
}, resetValues]  = useForm(...);
```

`form` - Form object, needs to be passed to *useField* hook.

`handleSubmit` - Submit method-handler. Should be passed as a `onSubmit` prop to `<form/>`. `<form onSubmit={handleSubmit}/>`.

`values` - Hash `{fieldName: value}` with actual values of the fields.

`errors` - Hash `{fieldName: errorString | [...errorStrings]` with a result of validate function.

`warnings` - Hash `{fieldName: errorString | [...errorStrings]` with a result of warn function.

`status` - Hash which is listed below.
```
status: {
  submitted: boolean,
  visited: boolean, // true if any field was focused once
  touched: boolean, // true if any field was blured once
  pristine: boolean,
  dirty: boolean,
  hasErrors: boolean,
  hasWarnings: boolean
}
```

### useField
##### arguments
```javascript
useField(fieldName, form, fixedValue, emptyValue)
```

`fieldName` - A name of the field, main key and identificator of a field. Used in validate and warn functions, initialValues and got passed to all callbacks. String. Required.

`form` - Form object. Populated by *useForm* hook. Required.

`fixedValue` - When provided makes value never changed. Usually used by checkboxes or radios. `const [newsLetterInputParams] = useField('newsLetter', form, 'subscribe')`

`emptyValue` - Specify a value if the field is empty.
 

##### return values
```javascript
const [props, {errors, warnings, status}] = useField(...);
```

`props` - A hash with props which should be spread in to input-like node. `<input type="checkbox" {...props} />`

`errors` - An array with actual error strings related to current field.

`warnings` - An array with actual warning strings related to current field.

`status` - Hash which is listed below.
```
status: {
  submitted: boolean,  // true if form was submitted
  visited: boolean,    // true if field was focused
  touched: boolean,    // true if field was blured
  pristine: boolean,   // true if value haven't change
  dirty: !pristine,
  valid; boolean,      // true if no actual errors
  invalid: !valid,
  unwarned: boolean,   // true if no actual warnings
  warned: !unwarned,
}
```


### nice to have (roadmap)

 - [ ] Better API for many fields.

 - [ ] Async validate/warning

 - [ ] Extend form API by onSubmitFail and setFormErrors.

 - [ ] Extend field and form API by onChange, onFocus, onBlur hooks.

 - [ ] A callback for normalization of the field value

 - [ ] A special hook for dynamically set fields.

 - [ ] Internal error handling to improve API experience.

