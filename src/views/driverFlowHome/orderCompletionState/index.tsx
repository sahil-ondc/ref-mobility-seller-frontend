import TrackOrder from 'views/driverFlowHome/trackOrder'
import ViewMapSection from 'views/driverFlowHome/viewMapSection'
import TickIcon from 'assets/svg/TickIcon'
import { CompletionStateWrapper, CompletionWrapper, ViewWrapper } from 'styles/views/driverFlowHome'

const OrderCompletionState = () => (
  <CompletionStateWrapper>
    <CompletionWrapper>
      <TickIcon />
      <ViewWrapper>
        <ViewMapSection />
      </ViewWrapper>
    </CompletionWrapper>
    <TrackOrder buttonStatus={false} />
  </CompletionStateWrapper>
)

export default OrderCompletionState
