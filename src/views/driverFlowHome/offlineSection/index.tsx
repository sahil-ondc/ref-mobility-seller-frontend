import OfflineIcon from 'assets/svg/OfflineIcon'
import { ContentWrapper, HeadingWrapper, Description } from 'styles/views/driverFlowHome'

const OfflineSection = () => (
  <ContentWrapper>
    <OfflineIcon />
    <HeadingWrapper>No Task visible Since you&apos;re offline</HeadingWrapper>
    <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </Description>
  </ContentWrapper>
)

export default OfflineSection
