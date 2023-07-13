import NoTaskIcon from 'assets/svg/NoTaskIcon'
import { ContentWrapper, HeadingWrapper, Description } from 'styles/views/driverFlowHome'

const NoTaskSection = () => (
  <ContentWrapper>
    <NoTaskIcon />
    <HeadingWrapper>No Task Assigned to you</HeadingWrapper>
    <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor </Description>
  </ContentWrapper>
)

export default NoTaskSection
