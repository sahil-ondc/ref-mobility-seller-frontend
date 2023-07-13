import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { yupResolver } from '@hookform/resolvers/yup'
import APIS from 'constants/api'
import { ForgotPasswordRoute, InviteScreenRoute } from 'constants/routes'
import ROLES from 'constants/role'
import usePost from 'hooks/usePost'
import { VALIDATION_SCHEMA } from 'validations/loginValidation'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import OndcLogo from 'assets/images/ondc_logo.png'
import LoginImage from 'assets/images/login_image.png'
import EyeIcon from 'assets/svg/EyeIcon'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'
import { ILoginData } from 'interfaces/views'
import {
  LoginMainContainer,
  LeftSection,
  MobileLogoWrapper,
  LogoWrapper,
  RightSection,
  WecomeInformation,
  ImageWrap,
  WelComeTextInfo,
  WelcomeHeading,
  WelcomeDetail,
  LoginContainer,
  LoginOptionsContainer,
  LoginTextDetail,
  LoginText,
  LogInSubText,
  LoginFormWrapper,
  TextWrapper,
  ErrorMessage,
  InputWrapper,
  Label,
  ForgotText,
  LoginOptions,
  OrText,
  LinkOption,
} from 'styles/views/signin'

export interface Props {
  history: RouteComponentProps['history']
}

const Login: React.FC<Props> = () => {
  const [showPassword, setShowPassword] = useState(false)
  const router = useHistory()

  const { mutateAsync } = usePost()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ILoginData>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const submitData = async (data: ILoginData) => {
    const payload = data
    const res = await mutateAsync({
      url: APIS.LOG_IN,
      payload: payload,
    })
    if (res) {
      const checkRole = res.data.currentUser.role?.name
      const checkEnable = res.data.currentUser.enabled
      await localStorage.setItem('accessToken', res.data.token)
      reset()

      if (checkEnable && [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(checkRole)) {
        router.push(InviteScreenRoute.path)
      }

      window.location.reload()
    }
  }

  const navigateToAbout = () => {
    router.push(`${ForgotPasswordRoute.path}`)
  }

  const credentialResponse = async (response: any) => {
    if (response?.credential) {
      const res = await mutateAsync({
        url: APIS.GOOGLE_LOG_IN,
        payload: {
          googleAccessToken: response?.credential,
        },
      })
      if (res) {
        const checkRole = res.data.currentUser.role?.name
        const checkEnable = res.data.currentUser.enabled
        localStorage.setItem('accessToken', res.data.token)

        if (checkEnable && [ROLES.SUPER_ADMIN, ROLES.ADMIN].includes(checkRole)) {
          router.push(InviteScreenRoute.path)
        }

        window.location.reload()
      }
    }
  }

  return (
    <>
      <LoginMainContainer>
        <LeftSection>
          <LogoWrapper>
            <img src={OndcLogo} alt="OndcLogo" />
          </LogoWrapper>
          <WecomeInformation>
            <ImageWrap>
              <img src={LoginImage} alt="LoginImage" />
            </ImageWrap>
            <WelComeTextInfo>
              <WelcomeHeading>Welcome back!</WelcomeHeading>
              <WelcomeDetail>
                Your Ultimate Mobility Solution! Streamline and optimize your logistics operations with ease.
              </WelcomeDetail>
            </WelComeTextInfo>
          </WecomeInformation>
        </LeftSection>

        <RightSection>
          <MobileLogoWrapper>
            <img src={OndcLogo} alt="OndcLogo" />
          </MobileLogoWrapper>
          <LoginContainer>
            <LoginTextDetail>
              <LoginText>Log In</LoginText>
              <LogInSubText>Please enter your registered email below.</LogInSubText>
            </LoginTextDetail>
          </LoginContainer>
          <LoginOptionsContainer>
            <LoginFormWrapper onSubmit={handleSubmit(submitData)}>
              <InputWrapper error={errors.email}>
                <Label>Email ID*</Label>
                <TextWrapper>
                  <TextInput
                    error={errors.email}
                    type="text"
                    placeholder="Enter email "
                    control={control}
                    name="email"
                  />
                  {errors.email ? <ErrorMessage>{errors?.email?.message}</ErrorMessage> : <ErrorMessage />}
                </TextWrapper>
              </InputWrapper>
              <InputWrapper error={errors.password}>
                <Label>Password*</Label>
                <TextWrapper>
                  <TextInput
                    error={errors.password}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password "
                    name="password"
                    control={control}
                  />
                  {showPassword ? (
                    <CloseEyeIcon onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                  )}
                  <ErrorMessage>{errors?.password?.message}</ErrorMessage>
                </TextWrapper>
              </InputWrapper>
              <ForgotText>
                <span onClick={navigateToAbout}> Forgot password?</span>
              </ForgotText>
              <Button type="submit" label="Login" variant="contained" />
            </LoginFormWrapper>
            <LoginOptions>
              <OrText>OR</OrText>
              <LinkOption>
                <GoogleOAuthProvider clientId="349346279910-vop474oc8rp5j4v9nhtv9934bhr0702n.apps.googleusercontent.com">
                  <GoogleLogin onSuccess={credentialResponse} width="100%" />
                </GoogleOAuthProvider>
              </LinkOption>
            </LoginOptions>
          </LoginOptionsContainer>
        </RightSection>
      </LoginMainContainer>
    </>
  )
}

export default Login
