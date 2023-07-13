import OrderTracking from 'views/orderTracking'
import Logo from 'assets/images/ondc_logo.png'
import { MainWrapper, HeaderSection, LogoWrapper } from 'styles/pages/orderTrackingDetail'
import { useEffect } from 'react'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'
import { useParams } from 'react-router-dom'

const TrackingDetail = () => {
  const { id }: any = useParams()
  const { refetch: fetchTrackingDetails, data: tracking } = useGet('tasksData', `${APIS.TRACK_TASK}/${id}`)

  useEffect(() => {
    fetchTrackingDetails()
  }, [fetchTrackingDetails])

  return (
    <MainWrapper>
      <HeaderSection>
        <LogoWrapper>
          <img src={Logo} alt="ONDC-Logo" />
        </LogoWrapper>
      </HeaderSection>
      <OrderTracking trackingDetails={tracking} />
    </MainWrapper>
  )
}

export default TrackingDetail
