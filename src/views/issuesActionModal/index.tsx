import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Radio } from 'antd'
import { ACTION_SCHEMA } from 'validations/driverDetails'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import CloseIcon from 'assets/svg/CloseIcon'
import {
  ModalContainer,
  HeadingContainer,
  HeadingWrapper,
  FormWrapper,
  ActionFormContainer,
  OptionWrapper,
  Options,
  Label,
  ActionButtonWrapper,
} from 'styles/views/successfulModal'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'

export interface IModalProps {
  showModal(value: boolean): void
  id?: string
}

const submitData = async (data: any) => {
  data
}

const ActionModal = ({ showModal, id }: IModalProps) => {
  const { handleSubmit, control } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(ACTION_SCHEMA),
    defaultValues: {
      shortDescription: '',
      longDescription: '',
    },
  })
  return (
    <ModalContainer>
      <HeadingContainer>
        <HeadingWrapper>Take Action</HeadingWrapper>
        <CloseIcon onClick={() => showModal(false)} />
      </HeadingContainer>
      <FormWrapper onSubmit={handleSubmit(submitData)}>
        <ActionFormContainer>
          <OptionWrapper>
            <Options>
              <Radio />
              <Label>No Action</Label>
            </Options>
            <Options>
              <Radio />
              <Label>Cancel</Label>
            </Options>
            <Options>
              <Radio />
              <Label>Refund</Label>
            </Options>
          </OptionWrapper>
          <InputWrapper error={false}>
            <Label>Short Description*</Label>
            <TextInput placeholder="Enter Description" control={control} name="shortDescription" />
          </InputWrapper>
          <InputWrapper error={false}>
            <Label>Long Description*</Label>
            <TextInput placeholder="Enter Description" control={control} name="longDescription" />
          </InputWrapper>
        </ActionFormContainer>
        <ActionButtonWrapper>
          <Button label="Cancel" variant="contained" className="cancel" onClick={() => showModal(false)} />
          <Button label="Submit" variant="contained" type="submit" onClick={() => id} />
        </ActionButtonWrapper>
      </FormWrapper>
    </ModalContainer>
  )
}

export default ActionModal
