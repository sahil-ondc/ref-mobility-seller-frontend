import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory, useLocation } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import zxcvbn from 'zxcvbn'
import { ChangePasswordRoute } from 'constants/routes'
import { VALIDATION_SCHEMA_CHANGE } from 'validations/loginValidation'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import Modal from 'components/Modal'
import { modalData } from 'views/successfulModal/data'
import SuccessfulModal from 'views/successfulModal'
import EyeIcon from 'assets/svg/EyeIcon'
import BackArrow from 'assets/svg/BackArrow'
import TickImage from 'assets/images/tick-image.png'
import RadioImage from 'assets/images/radiobutton.png'
import OndcLogo from 'assets/images/ondc_logo.png'
import { MobileLogoWrapper } from 'styles/views/signin'
import { IChangePassword } from 'interfaces/pages'
import {
  MainWrapper,
  ChangePasswordContainer,
  LoginContainer,
  LoginOptionsContainer,
  LoginTextDetail,
  ChangePasswordHeading,
  LoginFormWrapper,
  TextWrap,
  TextWrapper,
  InputWrapper,
  Label,
  PasswordValidationWrapper,
  Progress,
  ProgressBar,
  ValidationText,
  ValidationCotainer,
  PasswordStrengthText,
  ErrorMessage,
  ValidationWrapper,
  SvgWrapper,
} from 'styles/views/signin'

const ChangePassword = () => {
  const [width, setWidth] = useState(0)
  const [successModal, setSuccessModal] = useState(false)
  const [passwordScore, setPasswordScore] = useState<any>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConPassword, setShowConPassword] = useState(false)
  const location = useLocation()
  const router = useHistory()
  const handleBack = () => {
    router.goBack()
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA_CHANGE),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  })

  const submitData = async (payload: IChangePassword) => {
    payload
  }
  const password = watch('password', '')
  const isLengthValid = password.length >= 8
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)

  useEffect(() => {
    const score = zxcvbn(password)
    setPasswordScore((score.score * 100) / 4)
  }, [password])

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  return (
    <MainWrapper>
      {location.pathname === `${ChangePasswordRoute.path}` && (
        <MobileLogoWrapper>
          <img src={OndcLogo} alt="OndcLogo" />
        </MobileLogoWrapper>
      )}
      {/* {location.pathname === `${ProfileRoutes.path}` && ( */}

      {/* )} */}
      <ChangePasswordContainer>
        <LoginContainer>
          {width <= 767 && (
            <SvgWrapper>
              <BackArrow onClick={handleBack} />
            </SvgWrapper>
          )}
          <LoginTextDetail>
            <ChangePasswordHeading>Change Password</ChangePasswordHeading>
          </LoginTextDetail>
        </LoginContainer>
        <LoginOptionsContainer>
          <LoginFormWrapper onSubmit={handleSubmit(submitData)}>
            <InputWrapper error={errors.currentPassword}>
              <Label>Current Password*</Label>
              <TextWrap>
                <TextInput
                  error={errors.currentPassword}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password "
                  name="password"
                  control={control}
                />
                {showPassword ? (
                  <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                )}
                <ErrorMessage>{errors?.currentPassword?.message}</ErrorMessage>
              </TextWrap>
            </InputWrapper>
            <InputWrapper error={errors.password}>
              <Label>New Password*</Label>
              <TextWrap>
                <TextInput
                  error={errors.password}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password "
                  name="password"
                  control={control}
                />
                {showPassword ? (
                  <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                )}
                <ErrorMessage>{errors?.password?.message}</ErrorMessage>
              </TextWrap>
            </InputWrapper>
            <InputWrapper error={errors.confirmPassword}>
              <Label>Confirm Password*</Label>
              <TextWrapper>
                <TextInput
                  error={errors.confirmPassword}
                  type={showConPassword ? 'text' : 'password'}
                  placeholder="Enter password "
                  name="confirmPassword"
                  control={control}
                />
                {showConPassword ? (
                  <EyeIcon onClick={() => setShowConPassword(!showConPassword)} />
                ) : (
                  <EyeIcon onClick={() => setShowConPassword(!showConPassword)} />
                )}
                {errors.confirmPassword ? (
                  <ErrorMessage>{errors?.confirmPassword?.message}</ErrorMessage>
                ) : (
                  <ErrorMessage />
                )}
              </TextWrapper>
            </InputWrapper>
            <PasswordValidationWrapper>
              <ProgressBar>
                <Progress width={passwordScore} />
              </ProgressBar>
              <PasswordStrengthText>Password Strength</PasswordStrengthText>
              <ValidationCotainer>
                <ValidationWrapper>
                  {isLengthValid ? (
                    <img
                      src={TickImage}
                      style={{
                        width: '14px',
                        height: '14px',
                      }}
                      alt="Circle"
                    />
                  ) : (
                    <img
                      src={RadioImage}
                      style={{
                        width: '14px',
                        height: '14px',
                      }}
                      alt="logo"
                    />
                  )}
                  <ValidationText>Use 8 or more characters.</ValidationText>
                </ValidationWrapper>
                <ValidationWrapper>
                  {hasLetter ? (
                    <img
                      src={TickImage}
                      style={{
                        width: '14px',
                        height: '14px',
                      }}
                      alt="Circle"
                    />
                  ) : (
                    <img
                      src={RadioImage}
                      style={{
                        width: '14px',
                        height: '14px',
                      }}
                      alt="logo"
                    />
                  )}
                  <ValidationText>Use a minimum of one letter.</ValidationText>
                </ValidationWrapper>
                <ValidationWrapper>
                  {hasNumber ? (
                    <img
                      src={TickImage}
                      style={{
                        width: '14px',
                        height: '14px',
                      }}
                      alt="Circle"
                    />
                  ) : (
                    <img
                      src={RadioImage}
                      style={{
                        width: '14px',
                        height: '14px',
                      }}
                      alt="logo"
                    />
                  )}
                  <ValidationText>Use a minimum of one number.</ValidationText>
                </ValidationWrapper>
              </ValidationCotainer>
            </PasswordValidationWrapper>

            <Button type="submit" label="Update Password" variant="contained" className="pwd" />
          </LoginFormWrapper>
        </LoginOptionsContainer>
      </ChangePasswordContainer>
      <Modal isOpen={successModal}>
        <SuccessfulModal showModal={(value: boolean) => setSuccessModal(value)} modalData={modalData.passwordChange} />
      </Modal>
    </MainWrapper>
  )
}

export default ChangePassword
