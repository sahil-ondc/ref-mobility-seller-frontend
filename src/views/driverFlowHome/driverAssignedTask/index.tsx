import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { OrderStateRoutes } from 'constants/routes'
import NoTaskSection from 'views/driverFlowHome/noTask'
import OfflineSection from 'views/driverFlowHome/offlineSection'
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

const DriverAssignedTask = ({ data }: any) => {
  const router = useHistory()

  const [margin, setMargin] = useState(0)

  useEffect(() => {
    setMargin((data.length / 10) * 260)
  }, [])
  const assignedTask = data?.data?.tasks?.filter((ele: { status: string }) => ele?.status === 'Agent-Assigned')
  return (
    <>
      {!localStorage?.getItem('online') ? (
        <OfflineSection />
      ) : assignedTask.length === 0 ? (
        <NoTaskSection />
      ) : (
        <AssignedTaskContainer>
          {data?.data?.tasks
            ?.filter((ele: { status: string }) => ele?.status === 'Agent-Assigned')
            .map((item: any, index: any) => {
              return (
                <div key={index} style={data.length - 1 === index ? { marginBottom: margin } : { marginBottom: '0px' }}>
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
              )
            })}
        </AssignedTaskContainer>
      )}
    </>
  )
}

export default DriverAssignedTask
