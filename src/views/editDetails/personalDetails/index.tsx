import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PERSONAL_DETAILS_SCHEMA } from 'validations/driverDetails'
import { useContext, useEffect } from 'react'
import { AppContext } from 'context/payloadContext'
import APIS from 'constants/api'
import usePost from 'hooks/usePost'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import { ErrorMessage } from 'styles/views/signin'
import BackArrow from 'assets/svg/BackArrow'
import { Label } from 'styles/views/inviteAgentScreen/agentDetailSection'
import {
  PersonalDetailsContainer,
  PersonalDetailsWrapper,
  DetailSection,
  DetailsContainer,
  InputWrapper,
  SelectInputWrapper,
} from 'styles/views/inviteAgentScreen/driverDetailsSection'
import { EditButtonWrapper } from 'styles/views/dashboard'

const PersonalDetails = () => {
  const { userInfo } = useContext(AppContext)
  const { mutateAsync } = usePost()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(PERSONAL_DETAILS_SCHEMA),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      building: '',
      pincode: '',
      city: '',
      state: '',
      country: '',
    },
  })
  useEffect(() => {
    setValue('name', userInfo?.name)
    setValue('email', userInfo?.email)
    setValue('phone', userInfo?.mobile ? userInfo?.mobile.replace('+91', '') : userInfo?.mobile)
  }, [userInfo])

  const submitData = async (data: any) => {
    const payload = {
      name: data?.name,
      building: data?.building,
      pincode: data?.pincode,
      city: data?.city,
      state: data?.state,
      country: data?.country,
    }
    try {
      await mutateAsync({
        url: APIS.UPDATE_PROFILE,
        payload: payload,
      })
    } catch (error) {
      error
    }
  }

  return (
    <PersonalDetailsContainer>
      <BackArrow />
      <PersonalDetailsWrapper onSubmit={handleSubmit(submitData)}>
        <DetailSection>
          <DetailsContainer>
            <InputWrapper error={errors?.name}>
              <Label>Name</Label>
              <TextInput placeholder="Enter Name" control={control} name="name" error={errors?.name} />
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors?.email}>
              <Label>Email ID*</Label>
              <TextInput placeholder="Enter Email" control={control} name="email" error={errors?.email} disabled />
              <ErrorMessage>{errors?.email?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors?.phone}>
              <Label>Phone*</Label>
              <TextInput placeholder="0000-000-000" control={control} name="phone" error={errors?.phone} disabled />
              <ErrorMessage>{errors?.phone?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors?.city}>
              <Label>City*</Label>
              <TextInput placeholder="Enter City" control={control} name="city" error={errors?.city} />
              <ErrorMessage>{errors?.city?.message}</ErrorMessage>
            </InputWrapper>
            <InputWrapper error={errors?.building}>
              <Label>Building*</Label>
              <TextInput
                placeholder="Building, apartment, house no"
                control={control}
                name="building"
                error={errors?.building}
              />
              <ErrorMessage>{errors?.building?.message}</ErrorMessage>
            </InputWrapper>
            <SelectInputWrapper error={errors?.state}>
              <Label>State*</Label>
              <TextInput placeholder="Enter State" control={control} name="state" error={errors?.state} />
              <ErrorMessage>{errors?.state?.message}</ErrorMessage>
            </SelectInputWrapper>
            <InputWrapper error={errors?.pincode}>
              <Label>Pincode*</Label>
              <TextInput placeholder="Enter Pincode" control={control} name="pincode" error={errors?.pincode} />
              <ErrorMessage>{errors?.pincode?.message}</ErrorMessage>
            </InputWrapper>
            <SelectInputWrapper error={errors?.country}>
              <Label>Country*</Label>
              <TextInput placeholder="Enter Country" control={control} name="country" error={errors?.country} />
              <ErrorMessage>{errors?.country?.message}</ErrorMessage>
            </SelectInputWrapper>
          </DetailsContainer>
        </DetailSection>
        <EditButtonWrapper>
          <Button label="Cancel" variant="contained" className="cancel" />
          <Button label="Save" variant="contained" type="submit" />
        </EditButtonWrapper>
      </PersonalDetailsWrapper>
    </PersonalDetailsContainer>
  )
}

export default PersonalDetails
