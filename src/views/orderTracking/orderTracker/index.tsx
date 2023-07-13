import React from 'react'
import { Popover, Steps } from 'antd'
import { OrderStepperWrapper } from 'styles/views/orderTracking'
import OrderStatusModal from '../orderStatusModal'
import moment from 'moment'
import { OrderStepperProps, TaskStatus } from 'interfaces/views'

const OrderStepper: React.FC<OrderStepperProps> = ({ trackingDetails }) => {
  const { Step } = Steps
  const outputFormat = 'dddd DD/MM/YY [at] h:mma'

  return (
    <OrderStepperWrapper>
      <Steps
        current={trackingDetails?.data?.taskStatus.length - 1}
        progressDot={(dot, { title }) => {
          let popoverContent = null
          popoverContent = <OrderStatusModal title={title} />

          if (popoverContent) {
            return <Popover content={<span>{popoverContent}</span>}>{dot}</Popover>
          }

          return dot
        }}
      >
        {trackingDetails?.data?.taskStatus.length &&
          trackingDetails?.data?.taskStatus?.map((item: TaskStatus, index: number) => (
            <Step
              title={item.status === 'Pending' ? 'Confirm' : item.status}
              subTitle={moment(item.createdAt).format(outputFormat)}
              key={index}
            />
          ))}
        {trackingDetails?.data?.taskStatus.length === 0 && <Step title="Confirm" />}
        {trackingDetails?.data?.taskStatus.length <= 1 && <Step title="Agent-assigned" />}
        {trackingDetails?.data?.taskStatus.length <= 2 && <Step title="Order-picked-up" />}
        {trackingDetails?.data?.taskStatus.length <= 3 && <Step title="Out-for-delivery" />}
        {trackingDetails?.data?.taskStatus.length <= 4 && <Step title="Order-delivered" />}
      </Steps>
    </OrderStepperWrapper>
  )
}

export default OrderStepper
