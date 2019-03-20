export function flow(...funcs) {
  return function(arg) {
    let result = arg;

    funcs.forEach(func => {
      result = func(result);
    });

    return result;
  };
}

export function split(...funcs) {
  return function(arg) {
    let result = [];

    funcs.forEach(func => {
      result = [...result, func(arg)];
    });

    return result;
  };
}

export function map(mapperFunc) {
  return function(array) {
    return array.map(mapperFunc);
  };
}

export function some(filterFunc) {
  return function(array) {
    return array.some(filterFunc);
  };
}

export function filterOutValues(...values) {
  return function(array) {
    return array.filter(v => !values.includes(v));
  };
}

export function containsValues(value) {
  return function(array) {
    return array.includes(value);
  };
}

export function objectKeys(obj) {
  return Object.keys(obj);
}

export function objectValues(obj) {
  return Object.values(obj);
}

export function combineObject([keyArr, valuesArr]) {
  const result = {};

  keyArr.forEach((key, i) => {
    result[key] = valuesArr[i];
  });

  return result;
}
