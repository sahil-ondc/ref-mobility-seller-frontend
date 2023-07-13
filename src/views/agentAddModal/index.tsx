import { useHistory } from 'react-router-dom'
import { DashboardRoute } from 'constants/routes'
import Button from 'components/Button'
import CloseIcon from 'assets/svg/CloseIcon'
import TickIcon from 'assets/svg/TickIcon'
import {
  SuccessfulModalContainer,
  CloseButtonWrapper,
  ContentContainer,
  ContentWrapper,
  HeadingWrapper,
  Description,
} from 'styles/views/successfulModal'
import { IModalProps } from 'interfaces/views'

const AgentModal = ({ showModal }: IModalProps) => {
  const router = useHistory()

  return (
    <SuccessfulModalContainer>
      <CloseButtonWrapper onClick={() => showModal(false)}>
        <CloseIcon />
      </CloseButtonWrapper>
      <ContentContainer>
        <ContentWrapper>
          <TickIcon />
          <HeadingWrapper>Account updated successfully!</HeadingWrapper>
          <Description>Your account is updated with us. </Description>
        </ContentWrapper>
        <Button
          label="Okay"
          variant="contained"
          onClick={() => {
            router.push(`${DashboardRoute.path}`)
          }}
        />
      </ContentContainer>
    </SuccessfulModalContainer>
  )
}

export default AgentModal
