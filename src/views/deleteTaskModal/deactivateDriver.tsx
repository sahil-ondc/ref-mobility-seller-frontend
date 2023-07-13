import usePost from 'hooks/usePost'
import Button from 'components/Button'
import APIS from 'constants/api'
import CloseIcon from 'assets/svg/CloseIcon'
import { IDeactiveModalProps } from 'interfaces/views'
import {
  DeleteModalContainer,
  CloseBtn,
  ContentContainer,
  ContentWrapper,
  HeadingWrapper,
  Description,
  ButtonWrap,
} from 'styles/views/successfulModal'

const DeactivateDriver = ({ showModal, id }: IDeactiveModalProps) => {
  const { mutateAsync } = usePost()

  const deactivateDriver = async (id: string) => {
    try {
      await mutateAsync({
        url: `${APIS.DEACTIVATE_DRIVER}/${id}`,
      })
      showModal(false)
    } catch (error) {
      error
    }
  }

  return (
    <DeleteModalContainer>
      <CloseBtn onClick={() => showModal(false)}>
        <CloseIcon />
      </CloseBtn>
      <ContentContainer>
        <ContentWrapper>
          <HeadingWrapper>Deactivate Driver</HeadingWrapper>
          <Description>Are you sure, you want to deactivate this driver.</Description>
        </ContentWrapper>
        <ButtonWrap>
          <Button label="No" variant="contained" onClick={() => showModal(false)} className="cancel" />
          <Button label="Yes" variant="contained" onClick={() => deactivateDriver(id)} type="submit" />
        </ButtonWrap>
      </ContentContainer>
    </DeleteModalContainer>
  )
}

export default DeactivateDriver
