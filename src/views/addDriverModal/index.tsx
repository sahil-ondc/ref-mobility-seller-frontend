import { useState } from 'react'
import { Steps } from 'antd'
import DriverDetails from 'views/inviteAgentScreen/driverDetailsSection'
import VehicleDetails from 'views/vehicleDetails'
import { StepWrapper } from 'styles/pages/inviteAgentScreen'
import CloseIcon from 'assets/svg/CloseIcon'
import {
  ModalContainer,
  AddContentContainer,
  HeadingContainer,
  HeadingWrapper,
  DriverDetailsContainer,
} from 'styles/views/successfulModal'
import { IModalProps } from 'interfaces/views'

const { Step } = Steps

const AddDriverModal = ({ showModal }: IModalProps) => {
  const [currentStep, setCurrentStep] = useState(0)

  const next = () => {
    setCurrentStep(currentStep + 1)
  }

  const stepContent = [
    {
      step: 0,
      title: 'Driver Details',
      content: (
        <DriverDetailsContainer>
          <DriverDetails next={next} showModal={showModal} />
        </DriverDetailsContainer>
      ),
    },
    {
      step: 1,
      title: 'Vehicle Details',
      content: <VehicleDetails next={next} showModal={showModal} />,
    },
  ]

  const getComponentByStep = (step: number) => {
    const stepObj = stepContent.find((obj) => obj.step === step)
    return stepObj ? stepObj.content : null
  }

  return (
    <ModalContainer>
      <AddContentContainer>
        <HeadingContainer>
          <HeadingWrapper>Add Driver jjj</HeadingWrapper>
          <CloseIcon onClick={() => showModal(false)} />
        </HeadingContainer>

        <StepWrapper>
          <Steps current={currentStep}>
            {stepContent.map((stepObj) => (
              <Step key={stepObj.step} title={`Step ${stepObj.step + 1}`} />
            ))}
          </Steps>
        </StepWrapper>
        <div>{getComponentByStep(currentStep)}</div>
      </AddContentContainer>
    </ModalContainer>
  )
}

export default AddDriverModal
