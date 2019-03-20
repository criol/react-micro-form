function createValidator(check) {
  return function(errorMessage) {
    return function(value, values) {
      return check(value, values) ? null : errorMessage;
    };
  };
}

export const required = createValidator(v => !!v);

export const stringOnly = createValidator(v => !/\d/.test(v));

export const numberOnly = createValidator(v => /^\d*$/.test(v));

export const phoneNumber = createValidator(v =>
  /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/gim.test(
    v,
  ),
);
