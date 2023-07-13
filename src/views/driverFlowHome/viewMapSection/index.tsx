import { useHistory } from 'react-router-dom'
import Arrow from 'assets/svg/Arrow'
import { ViewMapWrapper, StatusSection, BackArrowWrapper } from 'styles/views/driverFlowHome'

const ViewMapSection = () => {
  const router = useHistory()
  const handleBack = () => {
    router.goBack()
  }

  return (
    <ViewMapWrapper>
      <StatusSection>
        <BackArrowWrapper onClick={handleBack}>
          <Arrow />
        </BackArrowWrapper>

        {/* *********need this*************** */}
        {/* <ViewMapContainer>
          <Button label="View Map" variant="outline">
            <ViewMapIcon />
          </Button>
        </ViewMapContainer> */}
      </StatusSection>
    </ViewMapWrapper>
  )
}

export default ViewMapSection
