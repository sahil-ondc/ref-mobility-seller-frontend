import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
import APIS from 'constants/api'
import { VALIDATION_SCHEMA_EMAIL } from 'validations/loginValidation'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import ForgotEmailSent from 'pages/forgotEmailSent'
import OndcLogo from 'assets/images/ondc_logo.png'
import {
  RightSection,
  LoginContainer,
  LoginOptionsContainer,
  LoginTextDetail,
  LoginText,
  LogInSubText,
  LoginFormWrapper,
  TextWrapper,
  InputWrapper,
  Label,
  MobileLogoWrapper,
  ErrorMessage,
} from 'styles/views/signin'
import { IPayloadData } from 'interfaces/views'

const ForgotPasswordSection = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA_EMAIL),
    defaultValues: {
      email: '',
    },
  })

  const { mutateAsync } = usePost()

  const submitData = async (data: IPayloadData) => {
    const payload = data
    try {
      const response = await mutateAsync({
        url: APIS.FORGOT_PASSWORD,
        payload: payload,
      })
      if (response.message === 'forgot password email sent') {
        setEmailSent(true)
      }
    } catch (err) {
      err
    }
  }

  return (
    <>
      {!emailSent ? (
        <RightSection>
          <MobileLogoWrapper>
            <img src={OndcLogo} alt="OndcLogo" />
          </MobileLogoWrapper>

          <LoginContainer>
            <LoginTextDetail>
              <LoginText>Forgot Password?</LoginText>
              <LogInSubText>Please enter your registered email below</LogInSubText>
            </LoginTextDetail>
            <LoginOptionsContainer>
              <LoginFormWrapper onSubmit={handleSubmit(submitData)}>
                <InputWrapper error={errors.email}>
                  <Label>Email*</Label>
                  <TextWrapper>
                    <TextInput
                      error={errors.email}
                      type="text"
                      placeholder="Enter email "
                      control={control}
                      name="email"
                    />
                    <ErrorMessage>{errors?.email?.message}</ErrorMessage>
                  </TextWrapper>
                </InputWrapper>

                <Button type="submit" label="Submit" variant="contained" />
              </LoginFormWrapper>
            </LoginOptionsContainer>
          </LoginContainer>
        </RightSection>
      ) : (
        <ForgotEmailSent />
      )}
    </>
  )
}

export default ForgotPasswordSection
