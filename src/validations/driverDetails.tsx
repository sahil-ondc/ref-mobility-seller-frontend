import * as Yup from 'yup'

export const DRIVER_DETAILS_SCHEMA1 = Yup.object().shape({
  name: Yup.string()
    .required('Please enter your name')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
  phone: Yup.string()
    .required('Phone number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid phone number is required'),
  dob: Yup.string().required('Adhaar number is required'),
  adhaar: Yup.string()
    .required('Adhaar number is required')
    .matches(/^[0-9]{4}[0-9]{4}[0-9]{4}$/, 'A valid Adhaar Number is required'),
})
export const DRIVER_DETAILS_SCHEMA = Yup.object().shape({
  vehicleNumber: Yup.string()
    .required('Vehicle number is required')
    .matches(/^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/, 'A valid Vehicle number is required'),
  makeYear: Yup.string().required('Make Year is required'),
  weight: Yup.number()
    .typeError('Please enter the value')
    .required('Weight is required')
    .max(1000, 'Weight cannot be greater than 1000'),
  brandName: Yup.string(),
  ownerType: Yup.string(),
  intercity: Yup.string(),
  vehicleRegistrationDocument: Yup.string().required('Registration document is required'),
  deliveryType: Yup.array().required('Please select the delivery methods'),
})
export const UPDATE_SCHEMA = Yup.object().shape({
  status: Yup.string(),
})
export const DRIVER_UPDATE_SCHEMA = Yup.object().shape({
  status: Yup.string().required('Please select status'),
  uploadImage: Yup.string().required('Attachment is required'),
  otp: Yup.string(),
})
export const PERSONAL_DETAILS_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required('Please enter your name')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
  email: Yup.string().required('Email is required').trim().email('Please enter the valid email ID'),
  phone: Yup.string()
    .required('Phone number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid phone number is required'),
  pincode: Yup.string()
    .required('Please enter the pincode')
    .matches(/^\d{6,6}$/, 'A valid pincode is required'),
  city: Yup.string().required('Please enter the city'),
  state: Yup.string().required('Please enter the state'),
  country: Yup.string().required('Please enter the country'),
  building: Yup.string().required('Please enter the address'),
})
export const UPDATE_DETAILS_SCHEMA = Yup.object().shape({
  name: Yup.string()
    .required('Please enter your name')
    .max(20, 'max 20 letters')
    .min(5, 'min 5 letters')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
  email: Yup.string().required('Email is required').trim().email('Please enter the valid email ID'),
  phone: Yup.string()
    .required('Phone number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid phone number is required'),
})

export const OTP_LOGIN_VALIDATION = Yup.object().shape({
  otp0: Yup.string().required(),
  otp1: Yup.string().required(),
  otp2: Yup.string().required(),
  otp3: Yup.string().required(),
})

export const ACTION_SCHEMA = Yup.object().shape({
  shortDescription: Yup.string(),
  longDescription: Yup.string(),
})
