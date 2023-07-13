import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import APIS from 'constants/api'
import usePost from 'hooks/usePost'
import { AGENTDETAILSVALIDATION_SCHEMA } from 'validations/agentDetailsValidation'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import CloseIcon from 'assets/svg/CloseIcon'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { ErrorMessage, TextWrapper } from 'styles/views/signin'
import { IAdminsData, IFormValues } from 'interfaces/views'
import {
  Label,
  ModalContainer,
  AddContentContainer,
  HeadingContainer,
  HeadingWrapper,
  ButtonWrapper,
  InputContainer,
  FormWrapper,
  AddFormContainer,
} from 'styles/views/successfulModal'

export interface IModalProps {
  showModal(value: boolean): void
}
export const inviteData = [
  {
    id: 1,
  },
]

const AddAdminModal = ({ showModal }: IModalProps) => {
  const { mutateAsync } = usePost()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors: formErrors },
  } = useForm<IFormValues>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(AGENTDETAILSVALIDATION_SCHEMA),
  })

  const { fields, append } = useFieldArray<IFormValues>({
    control,
    name: 'admins',
  })

  useEffect(() => {
    if (inviteData.length != 0) {
      append({ name: '', mobile: '', email: '' })
    }
  }, [])

  const submitData = async (payload: IAdminsData) => {
    reset()
    append({ name: '', mobile: '', email: '' })
    try {
      const res = await mutateAsync({
        url: APIS.INVITE_ADMIN,
        payload: payload,
      })
      if (res) {
        showModal(false)
      }
    } catch (err: any) {
      showModal(false)
    }
  }

  return (
    <ModalContainer>
      <AddContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Add Admin</HeadingWrapper>
          <CloseIcon onClick={() => showModal(false)} />
        </HeadingContainer>
        <FormWrapper onSubmit={handleSubmit(submitData)}>
          {fields.map((invite: any, index: any) => (
            <AddFormContainer key={invite.id}>
              <InputWrapper error={formErrors?.admins?.[index]?.name}>
                <Label>Name</Label>
                <TextWrapper>
                  <TextInput
                    placeholder="Enter Name"
                    control={control}
                    name={`admins.${index}.name` as const}
                    error={formErrors?.admins?.[index]?.name}
                  />
                  <ErrorMessage>{formErrors?.admins?.[index]?.name?.message}</ErrorMessage>
                </TextWrapper>
              </InputWrapper>
              <InputContainer>
                <InputWrapper error={formErrors?.admins?.[index]?.mobile}>
                  <Label>Contact</Label>
                  <TextWrapper>
                    <TextInput
                      placeholder="0000-000-000"
                      control={control}
                      name={`admins.${index}.mobile` as const}
                      error={formErrors?.admins?.[index]?.mobile}
                    />
                    <ErrorMessage>{formErrors?.admins?.[index]?.mobile?.message}</ErrorMessage>
                  </TextWrapper>
                </InputWrapper>
                <InputWrapper error={formErrors?.admins?.[index]?.email}>
                  <Label>Email Address</Label>
                  <TextWrapper>
                    <TextInput
                      placeholder="Enter Email"
                      control={control}
                      name={`admins.${index}.email` as const}
                      error={formErrors?.admins?.[index]?.email}
                    />
                    <ErrorMessage>{formErrors?.admins?.[index]?.email?.message}</ErrorMessage>
                  </TextWrapper>
                </InputWrapper>
              </InputContainer>
            </AddFormContainer>
          ))}
          <ButtonWrapper>
            <Button label="Cancel" variant="contained" onClick={() => showModal(false)} className="cancel" />
            <Button label="Submit" type="submit" variant="contained" />
          </ButtonWrapper>
        </FormWrapper>
      </AddContentContainer>
    </ModalContainer>
  )
}

export default AddAdminModal
