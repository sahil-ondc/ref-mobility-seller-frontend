import * as Yup from 'yup'

export const VALIDATION_SCHEMA_EMAIL = Yup.object().shape({
  email: Yup.string().required('Please enter the email ID').trim().email('Please enter the valid email ID'),
})
const VALIDATION_SCHEMA = Yup.object().shape({
  email: Yup.string().required('Please enter the valid email ID').trim().email('Please enter the valid email ID'),
  password: Yup.string().required('Password is required'),
})
const DRIVER_LOGIN_VALIDATION_SCHEMA = Yup.object().shape({
  mobile: Yup.string()
    .required('Phone number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid phone number is required'),
})
const VALIDATION_SCHEMA_CREATE = Yup.object().shape({
  password: Yup.string()
    .trim()
    .label('Password')
    .required('Password must at least contain 1 uppercase, 1 lowercase and 1 numerical character'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.'),
})
const VALIDATION_SCHEMA_CHANGE = Yup.object().shape({
  currentPassword: Yup.string()
    .trim()
    .label('Password')
    .required('Password must at least contain 1 uppercase, 1 lowercase and 1 numerical character'),
  newPassword: Yup.string()
    .trim()
    .label('Password')
    .required('Password must at least contain 1 uppercase, 1 lowercase and 1 numerical character'),
  confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match.'),
})

export { VALIDATION_SCHEMA, VALIDATION_SCHEMA_CREATE, VALIDATION_SCHEMA_CHANGE, DRIVER_LOGIN_VALIDATION_SCHEMA }
