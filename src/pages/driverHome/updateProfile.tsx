import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { AppContext } from 'context/payloadContext'
import usePost from 'hooks/usePost'
import APIS from 'constants/api'
import { UPDATE_DETAILS_SCHEMA } from 'validations/driverDetails'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import { ErrorMessage } from 'styles/views/signin'
import BackArrow from 'assets/svg/BackArrow'
import OndcLogo from 'assets/images/ondc_logo.png'
import { Label } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { MobileLogoWrapper, TextWrapper } from 'styles/views/signin'
import { IUpdateProfile } from 'interfaces/pages'
import {
  UpdateDetailsContainer,
  PersonalDetailsWrapper,
  InputWrapper,
} from 'styles/views/inviteAgentScreen/driverDetailsSection'
import { UpdateButtonWrapper } from 'styles/views/dashboard'

const UpdateProfile = () => {
  const { userInfo } = useContext(AppContext)

  const { mutateAsync } = usePost()
  const router = useHistory()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(UPDATE_DETAILS_SCHEMA),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  useEffect(() => {
    setValue('name', userInfo?.name)
    setValue('email', userInfo?.email)
    setValue('phone', userInfo?.mobile ? userInfo?.mobile.replace('+91', '') : userInfo?.mobile)
  }, [userInfo])

  const submitData = async (data: IUpdateProfile) => {
    const payload = {
      name: data?.name,
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

  const handleBack = () => {
    router.goBack()
  }

  useEffect(() => {
    return () => {
      window.location.reload()
    }
  }, [])
  return (
    <UpdateDetailsContainer>
      <MobileLogoWrapper>
        <img src={OndcLogo} alt="OndcLogo" />
      </MobileLogoWrapper>
      <BackArrow onClick={handleBack} />
      <PersonalDetailsWrapper onSubmit={handleSubmit(submitData)}>
        <InputWrapper error={errors?.name}>
          <Label>Name</Label>
          <TextWrapper>
            <TextInput placeholder="Enter Name" control={control} name="name" error={errors?.name} />
            <ErrorMessage>{errors?.name?.message}</ErrorMessage>
          </TextWrapper>
        </InputWrapper>
        <InputWrapper error={false}>
          <Label>Email ID*</Label>
          <TextWrapper>
            <TextInput placeholder="Enter Email" control={control} name="email" disabled />
          </TextWrapper>
        </InputWrapper>
        <InputWrapper error={false}>
          <Label>Phone*</Label>
          <TextWrapper>
            <TextInput placeholder="0000-000-000" control={control} name="phone" disabled />
          </TextWrapper>
        </InputWrapper>
        <UpdateButtonWrapper>
          <Button label="Update" variant="contained" type="submit" />
        </UpdateButtonWrapper>
      </PersonalDetailsWrapper>
    </UpdateDetailsContainer>
  )
}

export default UpdateProfile
