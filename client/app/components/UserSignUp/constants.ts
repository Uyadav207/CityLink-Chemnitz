import * as yup from 'yup';
// import 'yup-phone';
import { isValidPhoneNumber } from 'react-phone-number-input';
import YupPassword from 'yup-password';

YupPassword(yup);

const INITIAL_VALUES = {
  Username: '',
  Firstname: '',
  Lastname: '',
  Email: '',
  PhoneNumber: '',
  Password: '',
  ConfirmPassword: '',
};

const VALIDATION = yup.object({
  Username: yup.string().trim().required('Username is required'),
  Firstname: yup.string().trim().required('Firstname is required'),
  Lastname: yup.string().trim().required('Lastname is required'),
  Email: yup.string().trim().required('Email is required').email(),
  PhoneNumber: yup
    .string()
    .trim()
    .required('Phone number is required')
    .test('validation', 'Invalid Phone Number', (PhoneNumber = '') =>
      isValidPhoneNumber(PhoneNumber)
    ),
  Password: yup.string().required('Password is required').password(),
  ConfirmPassword: yup
    .string()
    .trim()
    .required('Confirm Password is required')
    .oneOf([yup.ref('Password')], 'Passwords must match'),
});

export { VALIDATION, INITIAL_VALUES };
