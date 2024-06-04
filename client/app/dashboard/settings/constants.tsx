import * as yup from 'yup';
// import 'yup-phone';
import { isValidPhoneNumber } from 'react-phone-number-input';
import YupPassword from 'yup-password';

YupPassword(yup);

const USER_INITIAL_VALUES = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
};

const CONTACT_INITIAL_VALUES = {
  street: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
};

const USER_VALIDATION = yup.object({
  username: yup.string().trim().required('Username is required'),
  firstName: yup.string().trim().required('Firstname is required'),
  lastName: yup.string().trim().required('Lastname is required'),
  email: yup.string().trim().required('Email is required').email(),
  // phoneNumber: yup
  //   .string()
  //   .trim()
  //   .required('Phone number is required')
  //   .test('validation', 'Invalid Phone Number', (phoneNumber = '') =>
  //     isValidPhoneNumber(phoneNumber)
  //   ),
});

const CONTACT_VALIDATION = yup.object({
  street: yup.string().trim().required('Street is required'),
  city: yup.string().trim().required('City is required'),
  state: yup.string().trim().required('State is required'),
  zipCode: yup.string().trim().required('Zip Code is required'),
  country: yup.string().trim().required('Country is required'),
});

export {
  USER_INITIAL_VALUES,
  USER_VALIDATION,
  CONTACT_INITIAL_VALUES,
  CONTACT_VALIDATION,
};
