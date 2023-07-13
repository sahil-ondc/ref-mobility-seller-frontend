import * as Yup from 'yup'

export const AGENTDETAILSVALIDATION_SCHEMA = Yup.object().shape({
  admins: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required('Please enter your name')
        .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
      email: Yup.string()
        .required('Email is required')
        .trim()
        .email('A valid email address is required')
        .test('unique-emails', 'Emails must be unique', function (value) {
          const admins = (this as any).from
          const checkAdmins = admins.flatMap((admin: { value: { admins: any } }) => admin?.value?.admins ?? [])

          const emailCount = checkAdmins.reduce((count: number, admin: { email: string | undefined }) => {
            if (admin.email === value) {
              count += 1
            }

            return count
          }, 0)
          return emailCount <= 1
        }),

      mobile: Yup.string()
        .required('Phone number is required')
        .max(10, 'max 10 digits')
        .matches(/^[6789]\d{9}$/, 'A valid phone number is required')
        .test('unique-phones', 'Phone numbers must be unique', function (value) {
          const admins = (this as any).from
          const checkAdmins = admins[1]?.value?.admins
          const mobileCount = checkAdmins.reduce((count: number, admin: { mobile: string | undefined }) => {
            if (admin.mobile === value) {
              count += 1
            }

            return count
          }, 0)
          return mobileCount <= 1
        }),
    }),
  ),
})

export const AGENTKYCDETAILSVALIDATION_SCHEMA = Yup.object().shape({
  panNumber: Yup.string(),
  aadhaarNumber: Yup.string()
    .required('Adhaar number is required')
    .matches(/^[0-9]{4}[0-9]{4}[0-9]{4}$/, 'A valid Adhaar Number is required'),
  drivingLicense: Yup.string().required('Please upload the license'),
})

export const AGENT_KYC_SCHEMA_STEP1 = Yup.object().shape({
  name: Yup.string()
    .required('Please enter your name')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
  email: Yup.string().required('Email is required').trim().email('A valid email address is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .max(10, 'max 10 digits')
    .matches(/^[6789]\d{9}$/, 'A valid phone number is required'),
})

export const KYC_DOCUMENTS_SCHEMA = Yup.object().shape({
  addressProof: Yup.string().required('Please upload address proof'),
  IDproof: Yup.string().required('Please upload ID proof'),
  PANcard: Yup.string().required('Please upload PAN card'),
})

export const BANKDETAILSVALIDATION_SCHEMA = Yup.object().shape({
  bankName: Yup.string(),
  branchName: Yup.string(),
  name: Yup.string()
    .required('Please enter account holder name')
    .matches(/^(?! )[a-zA-Z ]+$/, 'A valid account holder name is required'),
  accountNumber: Yup.string()
    .required('Please enter account number')
    .matches(/^\d{9,18}$/, 'A valid account number is required'),
  code: Yup.string()
    .required('Please enter IFSC Code')
    .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'A valid IFSC Code is required'),
  cancelledCheque: Yup.string().required('Please upload cancelled cheque'),
})

const DRIVER_DETAIL_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .required('Please enter the first name ')
    .matches(/^[A-Za-z'-]{1,50}$/, 'This field only accepts alphabetical characters'),
  lastName: Yup.string()
    .required('Please enter the last name ')
    .matches(/^(?! )[a-zA-Z ]+$/, 'This field only accepts alphabetical characters'),
  email: Yup.string().required('Email is required').trim().email('Please enter the valid email ID'),
  mobile: Yup.string()
    .required('Phone number is required')
    .max(10, 'Maximun 10 digits are required')
    .matches(/^[6789]\d{9}$/, 'A valid phone number is required'),
  dob: Yup.string().required('Please select DOB').nullable(),
  deliveryExperience: Yup.string().required('Please select years of experience'),
  building: Yup.string().required('Please enter the address'),
  pincode: Yup.string()
    .required('Please enter the pincode')
    .matches(/^\d{6,6}$/, 'A valid pincode is required'),
  city: Yup.string(),
  state: Yup.string(),
  locality: Yup.string().required('Please select the locality'),
})

export { DRIVER_DETAIL_SCHEMA }
