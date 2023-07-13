import {
  MainWrapper,
  Wrapper,
  Heading,
  DetailWrapper,
  DetailContainer,
  Title,
  Content,
} from 'styles/views/adminDashboard/tableDescription'

const DriverDetails = () => (
  <MainWrapper>
    <Wrapper>
      <Heading>Driver Details</Heading>
      <DetailWrapper>
        <DetailContainer>
          <Title>No of Tasks</Title>
          <Content>20 </Content>
        </DetailContainer>

        <DetailContainer>
          <Title>Completed Tasks</Title>
          <Content>10 </Content>
        </DetailContainer>
        <DetailContainer>
          <Title>In Progress</Title>
          <Content>10 </Content>
        </DetailContainer>
      </DetailWrapper>
    </Wrapper>
  </MainWrapper>
)

export default DriverDetails
