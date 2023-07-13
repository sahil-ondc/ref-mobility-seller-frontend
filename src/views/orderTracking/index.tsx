import React from 'react'
import OrderStepper from 'views/orderTracking/orderTracker'
import OrderTable from 'views/orderTracking/table'
import {
  TrackingDetailWrapper,
  HeadingWrapper,
  MainHeading,
  DetailWrapper,
  OrderInformationWrapper,
  OrderDetailWrapper,
  TrackingID,
  OrderPlacementDate,
  StatusWrapper,
  Title,
  OrderStatus,
  OrderWrapper,
  TitleWrapper,
  OrderStatusTitle,
} from 'styles/views/orderTracking'
import moment from 'moment'
import { Task, TaskStatus } from 'interfaces/views'

interface TrackingDetails {
  data: {
    task: Task
    taskStatus: TaskStatus[]
    // Other properties for tracking details
  }
}

interface OrderTrackingProps {
  trackingDetails: TrackingDetails
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ trackingDetails }) => {
  const details = trackingDetails?.data?.taskStatus
  const lastUpdatedDate = new Date(
    trackingDetails?.data?.taskStatus[trackingDetails?.data?.taskStatus?.length - 1]?.createdAt,
  )
  return (
    <TrackingDetailWrapper>
      <HeadingWrapper>
        <MainHeading>Tracking Details</MainHeading>
      </HeadingWrapper>
      <DetailWrapper>
        <OrderInformationWrapper>
          <OrderDetailWrapper>
            <TrackingID>{trackingDetails?.data?.task?.createdAt.slice(0, 10)}</TrackingID>
            <OrderPlacementDate>
              Ordered on {moment(trackingDetails?.data?.task?.createdAt).format('DD MMM YYYY')}
            </OrderPlacementDate>
          </OrderDetailWrapper>
          <StatusWrapper>
            <Title>Status</Title>
            <OrderStatus>{trackingDetails?.data?.task?.status}</OrderStatus>
          </StatusWrapper>
        </OrderInformationWrapper>
        <OrderWrapper>
          <TitleWrapper>
            <OrderStatusTitle>
              Last Updated: <span>{moment(lastUpdatedDate).format('DD MMM YYYY')}</span>
            </OrderStatusTitle>
          </TitleWrapper>
          <OrderStepper trackingDetails={trackingDetails} />
          <OrderTable details={details} />
        </OrderWrapper>
      </DetailWrapper>
    </TrackingDetailWrapper>
  )
}

export default OrderTracking
