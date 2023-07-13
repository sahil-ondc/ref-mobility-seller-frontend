import { useEffect } from 'react'
// import useGet from 'hooks/useGet'
// import APIS from 'constants/api'
import { useHistory } from 'react-router-dom'
import { AddTasksRoute } from 'constants/routes'
import Button from 'components/Button'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import TasksData from 'views/adminDashboard/tasksTable'
import InviteIcon from 'assets/svg/InviteIcon'
import { MainContainer, HeadingWrapper, MainHeading, ButtonWrapper, ActivityWrapper } from 'styles/views/dashboard'
import useGet from 'hooks/useGet'
import APIS from 'constants/api'

const TaskDetails = () => {
  // const [socketData, setsocketData] = useState<any>()
  const router = useHistory()
  const search = true
  const { refetch: fetchTasks, data: taskData } = useGet('all-tasksData', `${APIS.ALL_TASK}`)

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  // useEffect(() => {
  //   const ws = new WebSocket(`${process.env?.REACT_APP_SOCKET_URL}`)

  //   ws.onmessage = (event) => {
  //     const eventData = JSON.parse(event?.data)
  //     setsocketData(eventData)
  //   }

  //   // ws.onerror = (error) => {
  //   //   // console.error('WebSocket error:', error)
  //   //   alert(error)
  //   // }

  //   return () => {
  //     ws.close()
  //   }
  // }, [])

  return (
    <AdminPrivateLayout>
      <MainContainer>
        <HeadingWrapper>
          <MainHeading>Tasks</MainHeading>
          <ButtonWrapper>
            <Button
              type="submit"
              label="Add Task"
              variant="contained"
              className="active-button color"
              onClick={() => {
                router.push(`${AddTasksRoute.path}`)
              }}
            >
              <InviteIcon />
            </Button>
          </ButtonWrapper>
        </HeadingWrapper>

        <ActivityWrapper>
          <TasksData scroll={400} search={search} taskData={taskData?.data?.tasks} />
        </ActivityWrapper>
      </MainContainer>
    </AdminPrivateLayout>
  )
}

export default TaskDetails
