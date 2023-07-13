import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { message } from 'antd'
import APIS from 'constants/api'
import { AppContext } from 'context/payloadContext'
import usePost from 'hooks/usePost'
import { AGENTKYCDETAILSVALIDATION_SCHEMA } from 'validations/agentDetailsValidation'
import DragFile from 'components/Drag'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import { dragData } from 'components/Drag/data'
import EyeIcon from 'assets/svg/EyeIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { ErrorMessage, TextWrapper, FileName, FileWrapper, FileIconWrapper } from 'styles/views/signin'
import {
  AgentDetailWrapper,
  FormWrapper,
  HeadingWrapper,
  InputWrapper,
  Label,
  MainHeading,
  SubHeading,
  DetailWrapper,
  ButtonContainer,
} from 'styles/views/inviteAgentScreen/agentDetailSection'
import CloseEyeIcon from 'assets/svg/CloseEyeIcon'

const KYCDetails = ({ next }: any) => {
  const { payloadData, setPayloadData } = useContext(AppContext)
  const [ispreview, setIsPreviewed] = useState<{ [key: string]: boolean }>({})
  const [showPassword, setShowPassword] = useState(false)
  const {
    handleSubmit,
    control,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(AGENTKYCDETAILSVALIDATION_SCHEMA),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      panNumber: '',
      aadhaarNumber: '',
      drivingLicense: '',
    },
  })
  useEffect(() => {
    setValue('email', payloadData.email)
    setValue('firstName', payloadData.firstName)
    setValue('lastName', payloadData.lastName)
    setValue('phone', payloadData.mobile)
    setValue('panNumber', payloadData?.KYCDetails?.PANdetails)
    setValue('aadhaarNumber', payloadData?.KYCDetails?.aadhaarNumber)
    setValue('drivingLicense', payloadData?.KYCDetails?.drivingLicense)
    if (payloadData?.KYCDetails?.drivingLicense !== undefined) {
      setIsPreviewed(() => ({
        ['drivingLicense']: true,
      }))
    }
  }, [payloadData])
  const submitData = (data: any) => {
    const payload = {
      ...payloadData,
      KYCDetails: {
        ...payloadData?.KYCDetails,
        PANdetails: data?.panNumber,
        aadhaarNumber: data?.aadhaarNumber,
        drivingLicense: data?.drivingLicense,
      },
    }
    if (data) {
      setPayloadData(payload)
      next()
    }
  }

  const { mutateAsync } = usePost()

  const Upload = async (name: string, e: any) => {
    const { file, onSuccess } = e
    const formData = new FormData()
    formData.append('image', file)
    name

    const fileSizeInBytes = e?.file?.size
    const fileSizeInMB = fileSizeInBytes / 1048576

    const supportedTypes = ['application/pdf', 'image/jpeg', 'image/jpg']
    const isFileTypeSupported = supportedTypes.includes(e?.file?.type)

    if (isFileTypeSupported && fileSizeInMB <= 2) {
      try {
        e.onProgress({ percent: 0 })
        const response = await mutateAsync({
          url: APIS.UPLOAD_FILE,
          payload: formData,
        })
        e.onProgress({ percent: 100 })
        onSuccess(response?.data?.message)
        setValue('drivingLicense', response?.data?.url)
        if (response?.data?.url) {
          setIsPreviewed(() => ({
            ['drivingLicense']: true,
          }))
        }

        clearErrors('drivingLicense')
      } catch (error) {
        message.error(`${e.file.name} file upload failed.`)
      }
    }
  }
  const fileUrl = getValues('drivingLicense')
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      return
    }

    window.open(file.url, '_blank')
  }
  const handlePreviewClick = () => {
    const file: any = {
      url: fileUrl,
    }
    handlePreview(file)
  }
  const handleRemove = (name: string) => {
    setValue('drivingLicense', '')
    setIsPreviewed(() => ({
      [name]: false,
    }))
  }

  return (
    <AgentDetailWrapper>
      <HeadingWrapper>
        <MainHeading>Add KYC Details</MainHeading>
        <SubHeading>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit
        </SubHeading>
      </HeadingWrapper>

      <FormWrapper onSubmit={handleSubmit(submitData)}>
        <DetailWrapper>
          <InputWrapper error={false}>
            <Label>First Name*</Label>
            <TextWrapper>
              <TextInput placeholder="Enter name" control={control} name="firstName" disabled />
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={false}>
            <Label> Last Name*</Label>
            <TextWrapper>
              <TextInput placeholder="Enter name" control={control} name="lastName" disabled />
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={false}>
            <Label>Email ID*</Label>
            <TextWrapper>
              <TextInput placeholder="Enter email" control={control} name="email" disabled />
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={false}>
            <Label>Phone*</Label>
            <TextWrapper>
              <TextInput placeholder="0000-000-000 " control={control} name="phone" disabled />
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={errors.panNumber}>
            <Label>Pan Number</Label>
            <TextWrapper>
              <TextInput
                placeholder="ABCTY1234D"
                control={control}
                name="panNumber"
                error={errors.panNumber}
                type={showPassword ? 'text' : 'password'}
                maxLength={10}
                autocomplete={'off'}
              />
              {showPassword ? (
                <CloseEyeIcon onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <EyeIcon onClick={() => setShowPassword(!showPassword)} />
              )}
              <ErrorMessage>{errors?.panNumber?.message}</ErrorMessage>
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={errors.aadhaarNumber}>
            <Label>Aadhaar Number*</Label>
            <TextInput placeholder="000000000000" control={control} name="aadhaarNumber" error={errors.aadhaarNumber} />
            <ErrorMessage>{errors?.aadhaarNumber?.message}</ErrorMessage>
          </InputWrapper>
        </DetailWrapper>
        <InputWrapper error={false}>
          <Label>Upload License (Attachment)*</Label>
          <TextWrapper>
            <DragFile Upload={Upload} name="drivingLicense" dragData={dragData.documentUpload} />
            <FileWrapper>
              <FileName>{fileUrl}</FileName>
              {ispreview.drivingLicense ? (
                <FileIconWrapper>
                  <EyeIcon onClick={() => handlePreviewClick()}>Preview</EyeIcon>
                  <DeleteIcon onClick={() => handleRemove('drivingLicense')} />
                </FileIconWrapper>
              ) : null}
            </FileWrapper>
          </TextWrapper>
        </InputWrapper>

        <ErrorMessage>{errors?.drivingLicense?.message}</ErrorMessage>
        <ButtonContainer>
          <Button type="submit" label="Continue" variant="contained" />
        </ButtonContainer>
      </FormWrapper>
    </AgentDetailWrapper>
  )
}

export default KYCDetails
