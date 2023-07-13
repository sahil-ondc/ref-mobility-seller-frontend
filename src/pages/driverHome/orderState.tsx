import MapComponent from 'components/MapComponent'
import ViewMapSection from 'views/driverFlowHome/viewMapSection'
import TrackOrder from 'views/driverFlowHome/trackOrder'
import { OrderStateWrapper, MapWrapper, ViewWrapper } from 'styles/views/driverFlowHome'

const OrderState = () => {
  return (
    <OrderStateWrapper>
      <MapWrapper>
        <MapComponent />
        <ViewWrapper>
          <ViewMapSection />
        </ViewWrapper>
      </MapWrapper>
      <TrackOrder buttonStatus={true} />
    </OrderStateWrapper>
  )
}

export default OrderState
