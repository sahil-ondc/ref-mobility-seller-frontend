import NoTaskSection from 'views/driverFlowHome/noTask'
import {
  AssignedTaskContainer,
  AssignedTaskWrapper,
  OrderWrapper,
  NameWrapper,
  OrderName,
  OrderNumber,
  Status,
  DeliveryWrapper,
  LocationContainer,
  LocationWrapper,
  PickupName,
  LocationAddress,
  PickupTimeStamp,
  DropLocationName,
  DropTimeStamp,
} from 'styles/views/driverFlowHome'
import OfflineSection from '../offlineSection'
import DeliveryPointIcon from 'assets/svg/DeliveryPointIcon'
import PickupPointIcon from 'assets/svg/PickupPointIcon'
import { OrderStateRoutes } from 'constants/routes'
import { useHistory } from 'react-router-dom'
interface TData {
  isActive: boolean
  data: any
}

const DriverOnDelivery = ({ data }: TData) => {
  const router = useHistory()
  const deliveryData = data?.data?.tasks?.filter((ele: { status: string }) => ele?.status === 'Out-for-delivery')
  return (
    <>
      {!localStorage?.getItem('online') ? (
        <OfflineSection />
      ) : deliveryData.length === 0 ? (
        <NoTaskSection />
      ) : (
        <AssignedTaskContainer>
          {data?.data?.tasks
            ?.filter((ele: { status: string }) => ele?.status === 'Out-for-delivery')
            .map((item: any, index: number) => (
              <div key={item?.task_id}>
                <AssignedTaskWrapper
                  key={index}
                  onClick={() => {
                    router.push(`${OrderStateRoutes.path.replace(':id', item._id)}`)
                  }}
                >
                  <OrderWrapper>
                    <NameWrapper>
                      <OrderName>{item?.product?.items[0]?.category_id}</OrderName>
                      <OrderNumber>
                        {item?._id} <span>Today</span>
                      </OrderNumber>
                    </NameWrapper>
                    <Status>{item?.status}</Status>
                  </OrderWrapper>
                  <DeliveryWrapper>
                    <LocationContainer>
                      <PickupPointIcon />
                      <LocationWrapper>
                        <PickupName>
                          {item?.fulfillments[0]?.start?.location?.address?.name} <span>Warehouser Pickup</span>
                        </PickupName>
                        <LocationAddress>{item?.fulfillments[0]?.start?.location?.address?.building}</LocationAddress>
                        <PickupTimeStamp>{item?.fulfillments[0]?.start?.location?.address?.city}</PickupTimeStamp>
                      </LocationWrapper>
                      <DeliveryPointIcon />
                      <LocationWrapper>
                        <DropLocationName>
                          {item?.fulfillments[0]?.end?.location?.address?.name} <span>Destination</span>
                        </DropLocationName>
                        <LocationAddress>{item?.fulfillments[0]?.end?.location?.address?.building}</LocationAddress>
                        <DropTimeStamp>{item?.fulfillments[0]?.end?.location?.address?.city}</DropTimeStamp>
                      </LocationWrapper>
                    </LocationContainer>
                  </DeliveryWrapper>
                </AssignedTaskWrapper>
              </div>
            ))}
        </AssignedTaskContainer>
      )}
    </>
  )
}

export default DriverOnDelivery
