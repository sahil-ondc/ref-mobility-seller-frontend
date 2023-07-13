import { useEffect } from 'react'
// import { toast } from 'react-toastify'
import APIS from 'constants/api'
import BellIcon from 'assets/svg/BellIcon'
import MobileTopbar from 'components/MobileTopbar'
import useGet from 'hooks/useGet'

import {
  DriverNotificationWrapper,
  TaskHeading,
  TaskHeadingWrapper,
  NotificationsList,
  NotifiactionWrapper,
  NotificationTitle,
  TimeStamp,
} from 'styles/views/driverFlowHome'

const NotificationSection = () => {
  const { refetch } = useGet('get-notification', `${APIS.GET_NOTIFICATIONS}`)

  useEffect(() => {
    refetch()
  }, [])

  // useEffect(() => {
  //   const socketUrl = 'ws:192.168.11.136:3019'
  //   const ws = new WebSocket(socketUrl)
  //   // const apiCall = {
  //   //   event: 'bts:subscribe',
  //   //   data: { channel: 'order_book_btcusd' },
  //   // }

  //   // ws.onopen = () => {
  //   //   ws.send(JSON.stringify(apiCall))
  //   // }

  //   ws.onmessage = (event) => {
  //     // console.log('event', event)
  //     const eventData = event.data
  //     console.log(eventData)
  //   }

  //   ws.onerror = (error) => {
  //     console.error('WebSocket error:', error)
  //   }

  //   return () => {
  //     ws.close()
  //   }
  // }, [])
  // handle the event sent with socket.emit()

  // console.log('data', data)

  // const [, setRealtimeData] = useState<any>(null)
  // const sseURL = `${process.env.REACT_APP_BASE_URL}${APIS.AGENT_SSE}`

  // useEffect(() => {
  //   const sse = new EventSource(sseURL)
  //   sse.addEventListener('on_status_update', (e) => {
  //     const eventData = JSON.parse(e.data)
  //     setRealtimeData((prevData: any) => [...prevData, eventData])
  //   })

  //   sse.onerror = () => {
  //     toast.dismiss()
  //     toast.error(`An error occurred while attempting to connect`)
  //     sse.close()
  //   }

  //   return () => {
  //     sse.close()
  //   }
  // }, [])

  return (
    <DriverNotificationWrapper>
      <MobileTopbar />
      <TaskHeadingWrapper>
        <TaskHeading>Notifications</TaskHeading>
      </TaskHeadingWrapper>
      <NotificationsList>
        <NotifiactionWrapper>
          <BellIcon />
          <NotificationTitle>Racing car sprays burning fuel into crowd.</NotificationTitle>
          <TimeStamp>12:00 PM</TimeStamp>
        </NotifiactionWrapper>
        <NotifiactionWrapper>
          <BellIcon />
          <NotificationTitle>Racing car sprays burning fuel into crowd.</NotificationTitle>
          <TimeStamp>12:00 PM</TimeStamp>
        </NotifiactionWrapper>
        <NotifiactionWrapper>
          <BellIcon />
          <NotificationTitle>Racing car sprays burning fuel into crowd.</NotificationTitle>
          <TimeStamp>12:00 PM</TimeStamp>
        </NotifiactionWrapper>
        <NotifiactionWrapper>
          <BellIcon />
          <NotificationTitle>Racing car sprays burning fuel into crowd.</NotificationTitle>
          <TimeStamp>12:00 PM</TimeStamp>
        </NotifiactionWrapper>
      </NotificationsList>
    </DriverNotificationWrapper>
  )
}

export default NotificationSection
