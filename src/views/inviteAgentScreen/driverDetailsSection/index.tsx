import { useContext, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { DatePicker, Switch } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import moment from 'moment'
import axios from 'axios'
import { DashboardRoute, InviteAgentRoute } from 'constants/routes'
import { AppContext } from 'context/payloadContext'
import useFormPost from 'hooks/useFormPost'
import { DRIVER_DETAIL_SCHEMA } from 'validations/agentDetailsValidation'
import SelectField from 'components/SelectField'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import Modal from 'components/Modal'
import MapComponent from 'components/MapComponent'
import AgentModal from 'views/agentAddModal'
import { driverDetailsOptions } from 'views/inviteAgentScreen/driverDetailsSection/data'
import { ErrorMessage } from 'styles/views/signin'
import { Label } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { SendButtonWrapper } from 'styles/views/inviteAdminSection'
import { SelectWrapper } from 'styles/components/SelectField'
import Spinner from 'components/Loader'

import {
  AddDetailsWrapper,
  HeadingWrapper,
  MainHeading,
  SubHeading,
  DetailContainer,
  DetailsFormWrapper,
  DetailsWrapper,
  InputWrapper,
  LocationWrapper,
  Title,
  NotificationWrapper,
  NotificationContainer,
  NotificationTitle,
  SwitchButton,
} from 'styles/views/inviteAgentScreen/driverDetailsSection'
import { ButtonWrapper } from 'styles/views/successfulModal'

const DriverDetails = ({ next, showModal }: any) => {
  const [successModal, setSuccessModal] = useState(false)
  const [loader, setLoader] = useState(false)
  const [locality, setLocality] = useState([{}])

  const { payloadData, setPayloadData } = useContext(AppContext)
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    getValues,
    watch,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(DRIVER_DETAIL_SCHEMA),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      dob: '01/01/1990',
      deliveryExperience: '',
      building: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
      locality: '',
      emailNotification: false,
      whatsAppNotification: false,
    },
  })

  const routerLocation = useLocation()
  useEffect(() => {
    setValue('firstName', payloadData.firstName)
    setValue('lastName', payloadData.lastName)
    setValue('email', payloadData.email)
    setValue('mobile', payloadData?.mobile)
    setValue('dob', payloadData?.dob || getValues('dob'))
    setValue('deliveryExperience', payloadData?.deliveryExperience)
    setValue('building', payloadData?.addressDetails?.building)
    setValue('locality', payloadData?.addressDetails?.locality)
    setValue('city', payloadData?.addressDetails?.city)
    setValue('state', payloadData?.addressDetails?.state)
    setValue('country', payloadData?.addressDetails?.country)
    setValue('pincode', payloadData?.addressDetails?.pincode)
    setValue('emailNotification', payloadData?.emailNotification || getValues('emailNotification'))
    setValue('whatsAppNotification', payloadData?.whatsAppNotification || getValues('whatsAppNotification'))
  }, [payloadData])

  //Pincode
  const { pincode, city } = watch()

  const getAddressDetails = async () => {
    try {
      setLoader(true)
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
      if (response.data[0]?.Status === 'Error') {
        toast.error('Invalid Pin code')
        setLoader(false)
      } else if (response.data && response.data[0] && response.data[0].PostOffice) {
        const { State, Block, Country } = response.data[0].PostOffice[0]
        const postOffices = response.data[0].PostOffice
        const nameList = postOffices.map((postOffice: { Name: any }) => postOffice.Name)
        setLocality(nameList)
        setValue('locality', nameList[0])
        setValue('state', State)
        setValue('city', Block)
        setValue('country', Country)
        clearErrors('locality')
        clearErrors('state')
        clearErrors('city')
        clearErrors('country')
        setLoader(false)
      }
    } catch (err: any) {
      toast.error(`${err.response.data.error}`)
      err.response.data.error
    }
  }

  useEffect(() => {
    if (pincode?.length === 6) {
      getAddressDetails()
    }
  }, [pincode])
  const localities = []

  for (let i = 0; i < locality.length; i++) {
    const localityObject = {
      value: locality[i],
    }
    localities.push(localityObject)
  }

  const submitData = async (data: any) => {
    const payload: any = {
      ...payloadData,
      addressDetails: {
        location: {
          coordinates: [30.733315, 76.779419],
        },
        building: data?.building,
        locality: data?.locality,
        city: data?.city,
        state: data?.state,
        country: data?.country,
        pincode: data?.pincode,
      },
      email: data?.email,
      mobile: data?.mobile,
      firstName: data?.firstName,
      lastName: data?.lastName,
      dob: data?.dob,
      deliveryExperience: data?.deliveryExperience,
      emailNotification: data?.emailNotification,
      whatsAppNotification: data?.whatsAppNotification,
      currentLocation: {
        coordinates: [30.733315, 76.779419],
      },
    }
    setPayloadData(payload)
    next()
  }

  const formPost = useFormPost()
  formPost

  const dobWatchValue = watch('dob')

  const disabledDate = (current: Dayjs | null): boolean => {
    // Calculate the date 18 years ago from today
    const maxDate: Dayjs = dayjs().subtract(18, 'years')

    // Disable dates that are after the maximum allowed date
    return !!current && current.isAfter(maxDate, 'day')
  }

  return (
    <AddDetailsWrapper className="detail-form">
      {loader && <Spinner />}
      <ToastContainer />
      {routerLocation.pathname === `${InviteAgentRoute.path}` && (
        <HeadingWrapper>
          <MainHeading>Driver Details</MainHeading>
          <SubHeading>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit
          </SubHeading>
        </HeadingWrapper>
      )}
      <DetailsFormWrapper onSubmit={handleSubmit(submitData)} className="form-title">
        <DetailContainer className="driver-details">
          <DetailsWrapper>
            <InputWrapper error={errors.firstName}>
              <Label>First Name*</Label>
              <TextInput placeholder="Enter first name" control={control} name="firstName" error={errors.firstName} />
              <ErrorMessage>{errors?.firstName?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors.lastName}>
              <Label>Last Name*</Label>
              <TextInput placeholder="Enter last name" control={control} name="lastName" error={errors.lastName} />
              <ErrorMessage>{errors?.lastName?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors.email}>
              <Label>Email*</Label>
              <TextInput placeholder="Davidjohn@gmail.com" control={control} name="email" error={errors.email} />
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors.mobile}>
              <Label>Phone*</Label>
              <TextInput placeholder="9282-222-4333" control={control} name="mobile" error={errors.mobile} />
              <ErrorMessage>{errors?.mobile?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors.dob}>
              <Label>DOB*</Label>
              <Controller
                control={control}
                name="dob"
                render={({ field }) => {
                  return (
                    <DatePicker
                      {...field}
                      picker="date"
                      format={'DD/MM/YYYY'}
                      disabledDate={(current) => disabledDate(dayjs(current))}
                      onChange={(value: any) => {
                        setValue('dob', `${moment(value.$d).format('DD/MM/YYYY')}`)
                      }}
                      value={dayjs(dobWatchValue, 'DD/MM/YYYY')}
                    />
                  )
                }}
              />
              <ErrorMessage>{errors?.dob?.message}</ErrorMessage>
            </InputWrapper>
            <SelectWrapper error={errors.deliveryExperience}>
              <Label>Years of experience in delivery*</Label>
              <SelectField
                placeholder="Select Experience"
                control={control}
                name="deliveryExperience"
                options={driverDetailsOptions.experience}
                error={errors.deliveryExperience}
              />
              <ErrorMessage>{errors?.deliveryExperience?.message}</ErrorMessage>
            </SelectWrapper>
          </DetailsWrapper>
          <LocationWrapper>
            <Title>Assigned Location</Title>
            <MapComponent />
          </LocationWrapper>
          <DetailsWrapper>
            <InputWrapper error={errors.building}>
              <Label>Building*</Label>
              <TextInput
                placeholder="Building, apartment, house no"
                control={control}
                name="building"
                error={errors.building}
              />
              <ErrorMessage>{errors?.building?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors.pincode}>
              <Label>Pincode*</Label>
              <TextInput placeholder="Enter Pincode" control={control} name="pincode" error={errors.pincode} />
              <ErrorMessage>{errors?.pincode?.message}</ErrorMessage>
            </InputWrapper>
            <SelectWrapper error={errors.locality}>
              <Label>Select Location*</Label>
              <SelectField
                placeholder="Select Locatity"
                control={control}
                name="locality"
                options={localities}
                disabled={city ? false : true}
                error={errors.locality}
              />
              <ErrorMessage>{errors?.locality?.message}</ErrorMessage>
            </SelectWrapper>
            <InputWrapper error={false}>
              <Label>City*</Label>
              <TextInput placeholder="Enter City" control={control} name="city" disabled />
            </InputWrapper>
            <InputWrapper error={false}>
              <Label>State*</Label>
              <TextInput placeholder="Enter State" control={control} name="state" disabled />
            </InputWrapper>
            <InputWrapper error={false}>
              <Label>Country*</Label>
              <TextInput placeholder="Enter" control={control} name="country" disabled />
            </InputWrapper>
          </DetailsWrapper>

          <NotificationWrapper>
            <NotificationContainer>
              <NotificationTitle>Enable email notification</NotificationTitle>
              <Controller
                control={control}
                name="emailNotification"
                render={({ field }) => (
                  <SwitchButton className="toggle-button">
                    <Switch {...field} checked={field.value} />
                  </SwitchButton>
                )}
              />
            </NotificationContainer>
            <NotificationContainer>
              <NotificationTitle>Enable whatsapp notification</NotificationTitle>
              <Controller
                control={control}
                name="whatsAppNotification"
                render={({ field }) => (
                  <SwitchButton className="toggle-button">
                    <Switch {...field} checked={field.value} />
                  </SwitchButton>
                )}
              />
            </NotificationContainer>
          </NotificationWrapper>
        </DetailContainer>
        {routerLocation.pathname === `${DashboardRoute.path}` ? (
          <ButtonWrapper className="button-container">
            <Button label="Cancel" variant="contained" className="cancel" onClick={() => showModal(false)} />
            <Button type="submit" label="Continue" variant="contained" />
          </ButtonWrapper>
        ) : (
          <SendButtonWrapper>
            <Button type="submit" label="Continue" variant="contained" />
          </SendButtonWrapper>
        )}
        <Modal isOpen={successModal}>
          <AgentModal showModal={(value: boolean) => setSuccessModal(value)} />
        </Modal>
      </DetailsFormWrapper>
    </AddDetailsWrapper>
  )
}

export default DriverDetails
