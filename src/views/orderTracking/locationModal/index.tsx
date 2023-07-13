import MapComponent from 'components/MapComponent'
import { MainWrapper, Heading } from 'styles/views/orderTracking'

const OrderLocation = () => (
  <MainWrapper>
    <Heading>Location Map</Heading>
    <MapComponent />
  </MainWrapper>
)

export default OrderLocation
