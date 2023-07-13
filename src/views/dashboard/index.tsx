import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import APIS from 'constants/api'
import { InviteAgentRoute } from 'constants/routes'
import useGet from 'hooks/useGet'
import CommonTabs from 'components/Tabs'
import Modal from 'components/Modal'
import Button from 'components/Button'
import RecordSection from 'views/recordsSection'
import UsersData from 'views/adminDashboard/usersTable'
import AddAdminModal from 'views/addAdminModal'
import AddDriverModal from 'views/addDriverModal'
import TasksData from 'views/adminDashboard/tasksTable'
import IssuesData from 'views/adminDashboard/issuesTable'
import AdminData from 'views/adminDashboard/adminTable'
import { TabItem } from 'interfaces'
import InviteIcon from 'assets/svg/InviteIcon'
// import NotifyIcon from 'assets/svg/NotifyIcon'
// import TimerIcon from 'assets/svg/TimerIcon'
import {
  MainWrapper,
  HeadingWrapper,
  Container,
  MainHeading,
  // NotificationWrapper,
  // NotificationTitle,
  InviteWrapper,
  ButtonWrapper,
  DashboardInformationWrapper,
  ActivityWrapper,
  TitleWrapper,
  Title,
  TabWrapper,
} from 'styles/views/dashboard'

const DashboardDetail = () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [adminModal, setAdminModal] = useState(false)
  const [agentModal, setAgentModal] = useState(false)
  // const [socketData, setsocketData] = useState<any>([])

  const router = useHistory()

  const { refetch: fetchAdmin, data: admins } = useGet(
    'AdminDashboardInfo',
    `${APIS.ADMINS_LIST}?skip=${currentPage}&limit=${pageSize}`,
  )

  const { refetch: fetchDrivers, data: drivers } = useGet(
    'DriverDashboardInfo',
    `${APIS.DRIVERS_LIST}?skip=${currentPage}&limit=${pageSize}`,
  )

  const { refetch: fetchTasks, data: taskData } = useGet('all-tasks', `${APIS.ALL_TASK}`)

  const { refetch: getIssues, data: issueDetails } = useGet('get-issues', `${APIS.ISSUE_LIST}`)

  useEffect(() => {
    getIssues()
  }, [getIssues])
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

  useEffect(() => {
    fetchAdmin()
  }, [fetchAdmin, pageSize, currentPage])

  useEffect(() => {
    fetchDrivers()
  }, [fetchDrivers, pageSize, currentPage])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const addAdmin = () => {
    setAdminModal(true)
  }
  // const addAgent = () => {
  //   setAgentModal(true)
  // }

  const items: TabItem[] = [
    {
      key: 'tasks',
      label: 'Tasks',
      children: <TasksData taskData={taskData?.data?.tasks} />,
    },
    {
      key: 'issues',
      label: 'Issues',
      children: <IssuesData issueDetails={issueDetails} />,
    },
    {
      key: 'driver',
      label: 'Driver',
      children: (
        <UsersData
          // users={drivers?.data?.drivers}
          users={drivers?.data?.drivers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={drivers?.data?.drivers?.length}
        />
      ),
    },
    {
      key: 'admin',
      label: 'Admin',
      children: (
        <AdminData
          users={admins?.data?.admins}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={admins?.data?.count}
        />
      ),
    },
  ]
  return (
    <MainWrapper>
      <HeadingWrapper>
        <Container>
          <MainHeading>Dashboard</MainHeading>
          {/* Need this code in future 
          <NotificationWrapper>
            <NotifyIcon />
            <NotificationTitle>New task added</NotificationTitle>
          </NotificationWrapper>
          <NotificationWrapper>
            <TimerIcon />
            <NotificationTitle>Task expiring in 2:38mins</NotificationTitle>
          </NotificationWrapper> */}
        </Container>
        <InviteWrapper>
          <ButtonWrapper>
            <Button type="submit" label="Add Admin" variant="outline" onClick={addAdmin}>
              <InviteIcon />
            </Button>
          </ButtonWrapper>
          <ButtonWrapper>
            <Button
              type="submit"
              label="Add Driver"
              variant="contained"
              className="active-button color"
              // onClick={addAgent}
              onClick={() => {
                router.push(`${InviteAgentRoute.path}`)
              }}
            >
              <InviteIcon />
            </Button>
          </ButtonWrapper>
        </InviteWrapper>
      </HeadingWrapper>
      <DashboardInformationWrapper>
        <RecordSection
          totalAdminCount={drivers?.data?.drivers?.length ? drivers?.data?.drivers?.length : 0}
          totalIssueCount={issueDetails?.data?.issueList?.length ? issueDetails?.data?.issueList?.length : 0}
          totalTaskCount={taskData?.data?.tasks?.length ? taskData?.data?.tasks?.length : 0}
        />
        <ActivityWrapper>
          <TitleWrapper>
            <Title>Latest Activity</Title>
          </TitleWrapper>
          <TabWrapper>
            <CommonTabs items={items} />
          </TabWrapper>
        </ActivityWrapper>
      </DashboardInformationWrapper>
      <Modal isOpen={adminModal}>
        <AddAdminModal showModal={(value: boolean) => setAdminModal(value)} />
      </Modal>
      <Modal isOpen={agentModal}>
        <AddDriverModal showModal={(value: boolean) => setAgentModal(value)} />
      </Modal>
    </MainWrapper>
  )
}

export default DashboardDetail
