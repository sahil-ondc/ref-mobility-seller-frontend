import { useParams } from 'react-router-dom'
import OrderTracking from 'views/orderTracking'
import Logo from 'assets/images/ondc_logo.png'
import { MainWrapper, HeaderSection, LogoWrapper } from 'styles/pages/orderTrackingDetail'
import { useEffect } from 'react'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'

const OrderTrackingDetail = () => {
  const { id } = useParams<any>()
  const { refetch: fetchTrackingDetails, data: trackingDetails } = useGet('all-tasksData', `${APIS.ALL_TASK}/${id}`)

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
      <OrderTracking trackingDetails={trackingDetails} />
    </MainWrapper>
  )
}

export default OrderTrackingDetail
