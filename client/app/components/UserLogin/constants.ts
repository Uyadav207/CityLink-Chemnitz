import * as yup from 'yup';

const INITIAL_VALUES = {
  Username: '',
  Password: '',
};

const VALIDATION = yup.object({
  Username: yup.string().trim().required('Username is required'),
  Password: yup.string().trim().required('Password is required'),
});

export { VALIDATION, INITIAL_VALUES };
