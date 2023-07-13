import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { InviteEmailRoute } from 'constants/routes'
import APIS from 'constants/api'
import { AppContext } from 'context/payloadContext'
import usePost from 'hooks/usePost'
import useFormPost from 'hooks/useFormPost'
import { BANKDETAILSVALIDATION_SCHEMA } from 'validations/agentDetailsValidation'
import Button from 'components/Button'
import Spinner from 'components/Loader'
import TextInput from 'components/TextInput'
import UploadButton from 'components/UploadButton'
import EyeIcon from 'assets/svg/EyeIcon'
import DeleteIcon from 'assets/svg/DeleteIcon'
import { ErrorMessage, TextWrapper } from 'styles/views/signin'
import {
  AgentDetailWrapper,
  FormWrapper,
  HeadingWrapper,
  MainHeading,
  SubHeading,
  BankDetailWrapper,
  InputWrapper,
  Label,
  UploadWrapper,
  DocumentsWrapper,
  DocumentTitle,
  DocumentDetail,
  UploadButtonWrapper,
  ButtonContainer,
  OptionWrapper,
} from 'styles/views/inviteAgentScreen/agentDetailSection'

const AgentBankDetails = () => {
  const [ispreview, setIsPreviewed] = useState<boolean>(false)
  const { payloadData, setPayloadData } = useContext(AppContext)
  const [loader, setLoader] = useState(false)
  const { mutateAsync } = usePost()
  const formPost = useFormPost()
  const router = useHistory()

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(BANKDETAILSVALIDATION_SCHEMA),
    defaultValues: {
      accountNumber: '',
      code: '',
      cancelledCheque: '',
      branchName: '',
      bankName: '',
      name: '',
    },
  })
  const values = getValues()

  const { code } = watch()

  const getBankDetails = async () => {
    setLoader(true)
    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${code}`)
      if (response.data[0]?.Status === 'Error') {
        setLoader(false)
        toast.error('Inavlid IFSC code')
      } else if (response.data) {
        const { BANK, BRANCH } = response.data
        setValue('branchName', BRANCH)
        setValue('bankName', BANK)
        setLoader(false)
      }
    } catch (err: any) {
      setLoader(false)
      toast.error(`${err.response.data.error}`)
      err.response.data.error
    }
  }

  useEffect(() => {
    if (code?.length === 11) {
      getBankDetails()
    }
  }, [code])

  const submitData = async (data: any) => {
    delete payloadData.name
    const payload = {
      ...payloadData,
      bankDetails: {
        accountHolderName: data.name,
        accountNumber: data.accountNumber,
        bankName: data.bankName,
        branchName: data.branchName,
        IFSCcode: data.code,
        cancelledCheque: data.cancelledCheque,
      },
    }
    if (data) {
      setPayloadData(payload)
    }

    try {
      const response = await mutateAsync({
        url: APIS.INVITE_AGENT,
        payload: payload,
      })

      if (response) {
        setPayloadData({})
        router.push(`${InviteEmailRoute.path}`)
      }
    } catch (error) {
      error
    }
  }

  const customRequest = async (evt: any) => {
    if (values?.cancelledCheque) {
      handleRemove('cancelledCheque')
    }

    const formData = new FormData()
    formData.append('image', evt?.file)

    if (evt?.file?.type !== 'image/png') {
      try {
        evt.onProgress({ percent: 0 })
        const response = await formPost.mutateAsync({
          url: APIS.UPLOAD_FILE,
          payload: formData,
          formData: 'multipart/form-data',
        })
        evt.onProgress({ percent: 100 })
        evt.onSuccess({}, { ...evt.file, url: response?.data.data.url })
        setValue('cancelledCheque', response?.data.data.url)
        setIsPreviewed(true)
      } catch (error) {
        error
      }
    } else {
      toast.error('PNG Format is Not Supported')
    }
  }

  const handleRemove = (name: any) => {
    setValue(name, '')
    setIsPreviewed(false)
  }

  const handlePreviewClick = () => {
    values?.cancelledCheque
    const file: any = {
      url: values?.cancelledCheque, // Provide the image URL or preview URL here
    }
    handlePreview(file)
  }

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      return
    }

    window.open(file?.url, '_blank')
  }

  return (
    <AgentDetailWrapper>
      {loader && <Spinner />}
      <HeadingWrapper>
        <MainHeading>Add Bank Details</MainHeading>
        <SubHeading>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit
        </SubHeading>
      </HeadingWrapper>
      <FormWrapper onSubmit={handleSubmit(submitData)}>
        <BankDetailWrapper>
          <InputWrapper error={errors.name}>
            <Label>Account Holder Name*</Label>
            <TextWrapper>
              <TextInput placeholder="Enter name" control={control} name="name" error={errors.name} />
              <ErrorMessage>{errors?.name?.message}</ErrorMessage>
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={errors.accountNumber}>
            <Label>Account Number*</Label>
            <TextWrapper>
              <TextInput placeholder="0000000000" control={control} name="accountNumber" error={errors.accountNumber} />
              <ErrorMessage>{errors?.accountNumber?.message}</ErrorMessage>
            </TextWrapper>
          </InputWrapper>
        </BankDetailWrapper>
        <InputWrapper error={errors.code}>
          <Label>IFSC Code*</Label>
          <TextWrapper>
            <TextInput placeholder="Enter IFSC" control={control} name="code" error={errors.code} />
            <ErrorMessage>{errors?.code?.message}</ErrorMessage>
          </TextWrapper>
        </InputWrapper>
        <BankDetailWrapper>
          <InputWrapper error={false}>
            <Label>Bank Name*</Label>
            <TextWrapper>
              <TextInput placeholder="Enter Bank Name" control={control} name="bankName" disabled />
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={false}>
            <Label>Branch Name*</Label>
            <TextWrapper>
              <TextInput placeholder="Branch name" control={control} name="branchName" disabled />
            </TextWrapper>
          </InputWrapper>
        </BankDetailWrapper>
        <UploadWrapper>
          <DocumentsWrapper>
            <DocumentTitle>Upload Cancelled Cheque*</DocumentTitle>
            <DocumentDetail>Upload Maximum limit of 10 MB ( PDF, JPG, JPEG Format)*</DocumentDetail>
            <ErrorMessage>{errors?.cancelledCheque?.message}</ErrorMessage>
          </DocumentsWrapper>
          <UploadButtonWrapper>
            <UploadButton
              customRequest={(e: any) => customRequest(e)}
              onRemove={() => handleRemove('cancelledCheque')}
              onPreview={handlePreview}
            />
            {ispreview && (
              <OptionWrapper>
                <EyeIcon onClick={handlePreviewClick} />
                <DeleteIcon onClick={() => handleRemove('cancelledCheque')} />
              </OptionWrapper>
            )}
          </UploadButtonWrapper>
        </UploadWrapper>

        <ButtonContainer>
          <Button label="Send Invite" variant="contained" type="submit" />
        </ButtonContainer>
      </FormWrapper>
      <ToastContainer />
    </AgentDetailWrapper>
  )
}

export default AgentBankDetails
