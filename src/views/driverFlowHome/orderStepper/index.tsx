import React from 'react'
import { Steps } from 'antd'
// import SubStepper from 'views/driverFlowHome/orderStepper/subStepper'
// import Arrow from 'assets/svg/Arrow'
import { OrderStepperWrapper } from 'styles/views/driverFlowHome'
const { Step } = Steps

const OrderStepper = ({ taskData }: any) => {
  const index = taskData?.taskStatus?.findIndex((element: any) => {
    if (element.status === taskData?.task?.status) {
      return true
    }
  })

  return (
    <OrderStepperWrapper>
      <Steps direction="vertical" current={index + 1}>
        {taskData?.taskStatus.map((stepObj: any) => (
          <Step
            key={taskData?.taskStatus?.length}
            description={new Date(stepObj?.createdAt).toTimeString()}
            subTitle={stepObj?.description}
            title={stepObj?.status === 'Pending' ? 'Order Confirmed' : stepObj?.status}
          ></Step>
        ))}
      </Steps>
    </OrderStepperWrapper>
  )
}

export default OrderStepper
