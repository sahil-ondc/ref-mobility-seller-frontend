import { useEffect, useState } from 'react'
import useGet from 'hooks/useGet'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import APIS from 'constants/api'
import { OrderStateRoutes } from 'constants/routes'
import PickupPointIcon from 'assets/svg/PickupPointIcon'
import DeliveryPointIcon from 'assets/svg/DeliveryPointIcon'
import SearchIcon from 'assets/svg/SearchIcon'
import TextInput from 'components/TextInput'
import {
  HistoryScreenWrapper,
  DeliveryWrapper,
  LocationWrapper,
  PickupName,
  LocationAddress,
  PickupTimeStamp,
  DropLocationName,
  DropTimeStamp,
  InputWrapper,
  TaskHeading,
  AssignedTaskWrapper,
  LocationContainer,
  NameWrapper,
  OrderName,
  OrderNumber,
  OrderWrapper,
  Status,
} from 'styles/views/driverFlowHome'

const HistoryScreenSection = () => {
  const { control } = useForm()
  const [filterInput, setFilterInput] = useState('')
  const router = useHistory()
  const [height, setHeight] = useState(0)

  useEffect(() => {
    setHeight(window.innerHeight)
  }, [])
  const { refetch, data: taskData } = useGet('all-tasks', `${APIS.ALL_AGENT_TASK}`)

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      <InputWrapper>
        <TaskHeading>History</TaskHeading>
        <TextInput
          placeholder="Search "
          prefix={<SearchIcon />}
          control={control}
          name={'search'}
          handleInputChange={(e: any) => setFilterInput(e.target.value)}
        />
      </InputWrapper>
      <HistoryScreenWrapper>
        {taskData?.data?.tasks
          .filter((e: { status: string }) => e?.status === 'Order-delivered' || e?.status === 'Cancelled')
          .filter(
            (item: any) =>
              item?.status?.toLowerCase().includes(filterInput.toLowerCase()) ||
              item?._id?.toLowerCase().includes(filterInput.toLowerCase()),
          )
          .map((item: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  router.push(`${OrderStateRoutes.path.replace(':id', item._id)}`)
                }}
                style={
                  taskData?.data?.tasks.length - 1 === index
                    ? { marginBottom: (height / taskData?.data?.tasks.length) * 0.3 }
                    : { marginBottom: '0px' }
                }
              >
                <AssignedTaskWrapper
                  key={index}
                  onClick={() => {
                    router.push(`${OrderStateRoutes.path.replace(':id', item._id)}`)
                  }}
                >
                  <OrderWrapper>
                    <NameWrapper>
                      <OrderName>{item?.product?.items[0]?.category_id}</OrderName>
                      <OrderNumber>{item?._id}</OrderNumber>
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
                </AssignedTaskWrapper>
              </div>
            )
          })}
      </HistoryScreenWrapper>
    </>
  )
}

export default HistoryScreenSection
