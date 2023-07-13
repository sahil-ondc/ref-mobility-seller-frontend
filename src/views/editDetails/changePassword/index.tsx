import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import zxcvbn from 'zxcvbn'
import { yupResolver } from '@hookform/resolvers/yup'
import usePost from 'hooks/usePost'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import { VALIDATION_SCHEMA_CHANGE } from 'validations/loginValidation'
import EyeIcon from 'assets/svg/EyeIcon'
import TickImage from 'assets/images/tick-image.png'
import RadioImage from 'assets/images/radiobutton.png'
import APIS from 'constants/api'
import {
  ChangePasswordWrapper,
  HeadingWrapper,
  PasswordContainer,
  LoginTextDetail,
  PasswordHeading,
  PasswordSubHeading,
  LoginFormWrapper,
  TextWrap,
  TextWrapper,
  PasswordInputWrapper,
  Label,
  PasswordValidationWrapper,
  Progress,
  PasswordStrengthBar,
  ValidationText,
  ValidationCotainer,
  PasswordStrengthText,
  ErrorMessage,
  ValidationWrapper,
} from 'styles/views/signin'
import { EditButtonWrapper } from 'styles/views/dashboard'
import { PasswordWrapper } from 'styles/views/inviteAgentScreen/driverDetailsSection'

const ChangePassword = () => {
  const [passwordScore, setPasswordScore] = useState<any>()
  const [showPassword, setShowPassword] = useState(false)
  const [showConPassword, setShowConPassword] = useState(false)
  const { mutateAsync } = usePost()

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: yupResolver(VALIDATION_SCHEMA_CHANGE),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const submitData = async (payload: any) => {
    const { currentPassword, newPassword } = payload
    reset()
    await mutateAsync({
      url: APIS.CHANGE_PASSWORD,
      payload: {
        currentPassword,
        newPassword,
      },
    })
  }
  const password = watch('newPassword', '')
  const isLengthValid = password.length >= 8
  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /\d/.test(password)

  useEffect(() => {
    const score = zxcvbn(password)
    setPasswordScore((score.score * 100) / 4)
  }, [password])

  return (
    <ChangePasswordWrapper>
      <HeadingWrapper>
        <LoginTextDetail>
          <PasswordHeading>Your Password</PasswordHeading>
          <PasswordSubHeading>Amet minim mollit non deserunt ullamco est quat sunt nostrud amet.</PasswordSubHeading>
        </LoginTextDetail>
      </HeadingWrapper>
      <PasswordContainer>
        <LoginFormWrapper onSubmit={handleSubmit(submitData)}>
          <PasswordWrapper>
            <PasswordInputWrapper error={errors.currentPassword}>
              <Label>Current Password*</Label>
              <TextWrap>
                <TextInput
                  error={errors.currentPassword}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password "
                  name="currentPassword"
                  control={control}
                />
                {showPassword ? (
                  <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                )}
                <ErrorMessage>{errors?.currentPassword?.message}</ErrorMessage>
              </TextWrap>
            </PasswordInputWrapper>
            <PasswordInputWrapper error={errors.newPassword}>
              <Label>New Password*</Label>
              <TextWrap>
                <TextInput
                  error={errors.newPassword}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password "
                  name="newPassword"
                  control={control}
                />
                {showPassword ? (
                  <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                )}
                <ErrorMessage>{errors?.newPassword?.message}</ErrorMessage>
              </TextWrap>
            </PasswordInputWrapper>
            <PasswordInputWrapper error={errors.confirmPassword}>
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
            </PasswordInputWrapper>
            <PasswordValidationWrapper>
              <PasswordStrengthBar>
                <Progress width={passwordScore} />
              </PasswordStrengthBar>
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
          </PasswordWrapper>
          <EditButtonWrapper>
            <Button label="Cancel" variant="contained" className="cancel" />
            <Button label="Save" variant="contained" />
          </EditButtonWrapper>
        </LoginFormWrapper>
      </PasswordContainer>
    </ChangePasswordWrapper>
  )
}

export default ChangePassword
