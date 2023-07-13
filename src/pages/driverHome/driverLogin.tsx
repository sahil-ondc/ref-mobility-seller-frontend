import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import APIS from 'constants/api'
import { OTPLoginRoute } from 'constants/routes'
import usePost from 'hooks/usePost'
import { DRIVER_LOGIN_VALIDATION_SCHEMA } from 'validations/loginValidation'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import OndcLogo from 'assets/images/ondc_logo.png'
import { MainWrapper } from 'styles/views/driverFlowHome'
import { IPayloadData, Props } from 'interfaces/pages'
import {
  MobileLogoWrapper,
  LoginContainer,
  LoginTextDetail,
  LoginText,
  LogInSubText,
  LoginFormWrapper,
  TextWrapper,
  ErrorMessage,
  InputWrapper,
  Label,
} from 'styles/views/signin'

const DriverLogin: React.FC<Props> = () => {
  const history = useHistory()

  const { mutateAsync } = usePost()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPayloadData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(DRIVER_LOGIN_VALIDATION_SCHEMA),
    defaultValues: {
      mobile: '',
    },
  })
  const submitData = async (data: IPayloadData) => {
    const payload = data
    const res = await mutateAsync({
      url: APIS.DRIVER_LOGIN,
      payload: payload,
    })

    if (res?.exist) {
      history.push({
        pathname: OTPLoginRoute.path,
        state: { payload },
      })
    }
  }

  return (
    <>
      <MainWrapper>
        <MobileLogoWrapper>
          <img src={OndcLogo} alt="OndcLogo" />
        </MobileLogoWrapper>
        <LoginContainer>
          <LoginTextDetail>
            <LoginText>Log In</LoginText>
            <LogInSubText>Please enter your registered mobile number below.</LogInSubText>
          </LoginTextDetail>
          <LoginFormWrapper onSubmit={handleSubmit(submitData)}>
            <InputWrapper error={errors.mobile}>
              <Label>Mobile Number*</Label>
              <TextWrapper>
                <TextInput
                  placeholder="0000-000-000"
                  control={control}
                  name="mobile"
                  error={errors.mobile}
                  type="number"
                />
                <ErrorMessage>{errors?.mobile?.message}</ErrorMessage>
              </TextWrapper>
            </InputWrapper>

            <Button type="submit" label="Continue" variant="contained" />
          </LoginFormWrapper>
        </LoginContainer>
      </MainWrapper>
    </>
  )
}

export default DriverLogin
