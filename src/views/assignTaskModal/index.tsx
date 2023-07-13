import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Checkbox } from 'antd'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import usePost from 'hooks/usePost'
import TextInput from 'components/TextInput'
import Button from 'components/Button'
import MapComponent from 'components/MapComponent'
import DriverImage from 'assets/images/driver-img.png'
import CloseIcon from 'assets/svg/CloseIcon'
import { InputWrapper } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { TextWrapper } from 'styles/views/signin'
import {
  DriverInfoCardWrapper,
  DriverInfoCardContainer,
  DriverInfo,
  DriverInfoWrapper,
  ImageWrap,
  DriverName,
  NameWrap,
} from 'styles/views/taskDetails'
import { LocationWrapper, LocationImage } from 'styles/views/inviteAgentScreen/driverDetailsSection'
import { IAssignModalProps } from 'interfaces/views'
import {
  Label,
  ModalContainer,
  HeadingContainer,
  HeadingWrapper,
  ButtonWrapper,
  AssignFormContainer,
  AssignedFormWrapper,
} from 'styles/views/successfulModal'

const AssignTasksModal = ({ showModal, activeTask }: IAssignModalProps) => {
  const [checkedDriver, setIsCheckedDriver] = useState<string | null>(null)
  const { mutateAsync } = usePost()
  const [driversData, setdriversData] = useState([])
  const { refetch: getTask, data } = useGet('get-task', `${APIS.ALL_TASK}/${activeTask}`)

  useEffect(() => {
    getTask()
  }, [])

  const { control, handleSubmit } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
  })

  useEffect(() => {
    const fetchData = async () => {
      if (data?.data?.task?.fulfillments[0]?.start?.location?.gps) {
        const res = await mutateAsync({
          url: `${APIS.AGENT_SEARCH}`,
          payload: {
            startLocation: `${data?.data?.task?.fulfillments[0]?.start?.location?.gps}`,
            endLocation: `${data?.data?.task?.fulfillments[0]?.end?.location?.gps}`,
          },
        })
        if (res?.data?.agents.length !== 0) {
          toast.dismiss()
          toast.success(`${res?.data?.agents.length} driver found`)
        } else {
          toast.dismiss()
          toast.error(`No Driver Found`)
        }

        setdriversData(res?.data?.agents || [])
      }
    }

    fetchData()
  }, [data])

  const onHandleChange = (e: any, driverId: string) => {
    if (e.target.checked) {
      setIsCheckedDriver(driverId)
    }
  }

  const submitData = async () => {
    if (checkedDriver != null) {
      await mutateAsync({
        url: `${APIS.ASSIGNE_AGENT}`,
        payload: {
          taskId: activeTask,
          agentId: checkedDriver,
        },
      })
    } else {
      toast.dismiss()
      toast.error('Please Select Driver')
    }
  }

  return (
    <ModalContainer>
      <HeadingContainer>
        <HeadingWrapper>Assign Task</HeadingWrapper>
        <CloseIcon onClick={() => showModal(false)} />
      </HeadingContainer>
      <AssignFormContainer onSubmit={handleSubmit(submitData)}>
        <AssignedFormWrapper>
          <InputWrapper error={false}>
            <Label>Pick up Location</Label>
            <TextWrapper>
              <TextInput
                placeholder={`${data?.data?.task?.fulfillments[0]?.start?.location?.address?.name}, ${data?.data?.task?.fulfillments[0]?.start?.location?.address?.city}, ${data?.data?.task?.fulfillments[0]?.start?.location?.address?.state}`}
                control={control}
                name="pickUpLocation"
                disabled
              />
            </TextWrapper>
          </InputWrapper>
          <InputWrapper error={false}>
            <Label>Delivery Location</Label>
            <TextWrapper>
              <TextInput
                placeholder={`${data?.data?.task?.fulfillments[0]?.end?.location?.address?.name}, ${data?.data?.task?.fulfillments[0]?.end?.location?.address?.city}, ${data?.data?.task?.fulfillments[0]?.end?.location?.address?.state}`}
                control={control}
                name="deliveryLocation"
                disabled
              />
            </TextWrapper>
          </InputWrapper>
          <LocationWrapper>
            <Label>Searching Drivers with in 5 KM Radius </Label>
            <LocationImage>
              <MapComponent />
            </LocationImage>
          </LocationWrapper>
          <DriverInfoCardWrapper>
            {driversData?.map((data: any) => {
              return (
                <DriverInfoCardContainer key={data.id}>
                  <DriverInfo>
                    <DriverInfoWrapper>
                      <ImageWrap>
                        <img src={DriverImage} alt="LoginImage" />
                      </ImageWrap>
                      <NameWrap>
                        <DriverName>{data?.userId?.name}</DriverName>
                        <DriverName className="mobile">{data?.userId?.mobile}</DriverName>
                      </NameWrap>
                    </DriverInfoWrapper>
                    <Checkbox onChange={(e) => onHandleChange(e, data?._id)} />
                  </DriverInfo>
                </DriverInfoCardContainer>
              )
            })}
          </DriverInfoCardWrapper>
        </AssignedFormWrapper>
        <ButtonWrapper>
          <Button label="Cancel" variant="contained" onClick={() => showModal(false)} className="cancel" />
          <Button label="Assign" variant="contained" type="submit" />
        </ButtonWrapper>
      </AssignFormContainer>
    </ModalContainer>
  )
}

export default AssignTasksModal
