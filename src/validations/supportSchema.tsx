/* eslint-disable no-useless-escape */
import * as Yup from 'yup'

export const SUPPORT_SCHEMA = Yup.object().shape({
  email: Yup.string().required('Email is required').trim().email('Please enter the valid email ID'),
  phone: Yup.string()
    .required('Phone number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid phone number is required'),
  uri: Yup.string().required('Please enter URI'),
})
