import { ReactNode, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { Switch } from 'antd'
import APIS from 'constants/api'
import { NotificationScreenRoute } from 'constants/routes'
import usePost from 'hooks/usePost'
import useGet from 'hooks/useGet'
import CommonTabs from 'components/Tabs'
import DriverAssignedTask from 'views/driverFlowHome/driverAssignedTask'
import DriverAllTasks from 'views/driverFlowHome/driverAllTasks'
import DriverOnDelivery from 'views/driverFlowHome/driverOnDelivery'
import NotificationIcon from 'assets/svg/NotificationIcon'
import {
  DriverHomeWrapper,
  StatusSection,
  TaskWrapper,
  StatusWrapper,
  StatusHeading,
  SwitchWrapper,
  TaskSection,
  TaskHeading,
  TaskOptions,
} from 'styles/views/driverFlowHome'

interface TabItem {
  key: string
  label: string
  children: ReactNode
}

const DriverFlowHome = () => {
  const [isActive, setIsActive] = useState<boolean>(localStorage?.getItem('online') ? true : false)
  // const [, setRealtimeData] = useState<any>(null)
  const router = useHistory()
  const { mutateAsync } = usePost()
  const { refetch, data: taskData } = useGet('all-tasks', `${APIS.ALL_AGENT_TASK}`)

  useEffect(() => {
    refetch()
  }, [])

  const fetchCoordinates = async () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 60000,
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const coor = { lat: latitude, lng: longitude }
          if (coor) {
            mutateAsync({
              url: `${APIS.AGENT_LOCATION}`,
              payload: {
                currentLocation: [coor.lat, coor.lng],
                isOnline: true,
              },
            })
          }
        },

        (error) => {
          toast.dismiss()
          toast.error(`${error.message}`)
        },
        options,
      )
    }
  }

  const handleChange = async (checked: any) => {
    const intervalId = setInterval(fetchCoordinates, 30000)
    setIsActive(checked)

    if (checked) {
      await mutateAsync({
        url: `${APIS.AGENT_TOGGLE_STATUS}`,
        payload: '',
      })
      fetchCoordinates()
      intervalId
      localStorage.setItem('online', 'true')
      toast.dismiss()
      toast.success('Location tracker is activated')
    } else {
      await mutateAsync({
        url: `${APIS.AGENT_TOGGLE_STATUS}`,
        payload: '',
      })
      localStorage.removeItem('online')
      toast.error('Location tracker is deactivated')
      clearInterval(intervalId)
      window.location.reload()
    }
  }

  const onHandleClick = () => {
    router.push(`${NotificationScreenRoute.path}`)
  }

  // const sseURL = `${process.env.REACT_APP_BASE_URL}${APIS.AGENT_SSE}`

  // useEffect(() => {
  //   const sse = new EventSource(sseURL)
  //   sse.addEventListener('on_agent_assigned', (e) => {
  //     const eventData = JSON.parse(e.data)
  //     setRealtimeData((prevData: any) => [...prevData, eventData])
  //   })

  //   sse.onerror = () => {
  //     toast.dismiss()
  //     toast.error(`Something went wrong! or Server error`)
  //     sse.close()
  //   }

  //   return () => {
  //     sse.close()
  //   }
  // }, [])

  // const driverAllTaskData = 0
  const items: TabItem[] = [
    {
      key: 'All',
      label: 'All',
      children: <DriverAllTasks data={taskData} isActive={isActive} />,
    },
    {
      key: 'assigned',
      label: 'Assigned',
      children: <DriverAssignedTask data={taskData} isActive={isActive} />,
    },
    {
      key: 'onDelivery',
      label: 'On Delivery',
      children: <DriverOnDelivery isActive={isActive} data={taskData} />,
    },
  ]

  return (
    <DriverHomeWrapper>
      <StatusSection>
        <StatusWrapper>
          <StatusHeading>My Status</StatusHeading>
          <SwitchWrapper>
            <Switch checked={isActive} onChange={handleChange} />
            {isActive ? <span>Online</span> : <span>Offline</span>}
          </SwitchWrapper>
        </StatusWrapper>
        <NotificationIcon onClick={onHandleClick} />
      </StatusSection>
      <TaskWrapper>
        <TaskSection>
          <TaskHeading>My Tasks</TaskHeading>
          <TaskOptions>
            <CommonTabs items={items} />
          </TaskOptions>
        </TaskSection>
      </TaskWrapper>
    </DriverHomeWrapper>
  )
}

export default DriverFlowHome
