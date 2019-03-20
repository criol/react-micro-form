import { createChecker } from '../Helpers/Validate/createChecker';
import {
  required,
  stringOnly,
  numberOnly,
  phoneNumber,
} from '../Helpers/Validate/validators';
import { FieldNames } from './constants';

export const validate = createChecker({
  [FieldNames.firstName]: [
    required('Please provide first name'),
    stringOnly('First name should be a string'),
  ],
  [FieldNames.lastName]: [stringOnly('Last name should be a string')],
  [FieldNames.areaCode]: [numberOnly('Area code can contain only numbers')],
  [FieldNames.phoneNumber]: [
    phoneNumber('Phone number is not valid'),
    required('Please prove a phone number'),
  ],
});
