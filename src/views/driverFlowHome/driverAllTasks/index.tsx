import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { OrderCompletionStateRoute, OrderStateRoutes } from 'constants/routes'
import OfflineSection from 'views/driverFlowHome/offlineSection'
import NoTaskSection from 'views/driverFlowHome/noTask'
import PickupPointIcon from 'assets/svg/PickupPointIcon'
import DeliveryPointIcon from 'assets/svg/DeliveryPointIcon'
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

interface TData {
  isActive: boolean
  data: any
}

const DriverAllTasks = ({ data, isActive }: TData) => {
  const router = useHistory()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])

  return (
    <div>
      {!localStorage?.getItem('online') ? (
        <OfflineSection />
      ) : data?.data?.tasks.length === 0 ? (
        <NoTaskSection />
      ) : (
        <AssignedTaskContainer>
          {data?.data?.tasks.map((item: any, index: number) => (
            <div
              key={item?.task_id}
              style={
                data?.data?.tasks.length - 1 === index
                  ? { marginBottom: (height / data?.data?.tasks.length) * 0.3 }
                  : { marginBottom: '0px' }
              }
            >
              <AssignedTaskWrapper
                key={index}
                onClick={() => {
                  item?.status === 'Order-delivered'
                    ? router.push(`${OrderCompletionStateRoute.path.replace(':id', item._id)}`)
                    : router.push(`${OrderStateRoutes.path.replace(':id', item._id)}`)
                }}
              >
                <OrderWrapper>
                  <NameWrapper>
                    <OrderName>{item?.product?.items[0]?.category_id}</OrderName>
                    <OrderNumber>
                      {item?._id} <span>{moment().startOf('hour').fromNow()}</span>
                    </OrderNumber>
                  </NameWrapper>
                  <Status status={item?.status}>{item?.status}</Status>
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
                {data?.length === 0 ? <div>{isActive ? <NoTaskSection /> : <OfflineSection />}</div> : null}
              </AssignedTaskWrapper>
            </div>
          ))}
        </AssignedTaskContainer>
      )}
    </div>
  )
}

export default DriverAllTasks
