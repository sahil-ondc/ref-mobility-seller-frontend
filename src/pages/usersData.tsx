import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { InviteAgentRoute } from 'constants/routes'
import APIS from 'constants/api'
import useGet from 'hooks/useGet'
import { TabItem } from 'interfaces'
import Button from 'components/Button'
import TextInput from 'components/TextInput'
import AdminPrivateLayout from 'components/Layouts/adminPrivateLayout'
import Modal from 'components/Modal'
import CommonTabs from 'components/Tabs'
import AddAdminModal from 'views/addAdminModal'
import AddDriverModal from 'views/addDriverModal'
import UsersData from 'views/adminDashboard/usersTable'
import AdminData from 'views/adminDashboard/adminTable'
import InviteIcon from 'assets/svg/InviteIcon'
import SearchIcon from 'assets/svg/SearchIcon'

import {
  MainContainer,
  HeadingWrapper,
  MainHeading,
  InviteWrapper,
  ButtonWrapper,
  ActivityWrapper,
  TitleWrapper,
  InputWrapper,
  TabWrapper,
} from 'styles/views/dashboard'

const UsersDetail = () => {
  const [adminModal, setAdminModal] = useState(false)
  const [agentModal, setAgentModal] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  // const [socketData, setsocketData] = useState<any>([])

  const { control } = useForm()
  const router = useHistory()

  const addAdmin = () => {
    setAdminModal(true)
  }
  // const addAgent = () => {
  //   setAgentModal(true)
  // }
  const { refetch: fetchUsers, data: drivers } = useGet(
    'DriversInfo',
    `${APIS.DRIVERS_LIST}?skip=${currentPage}&limit=${pageSize}`,
  )

  const { refetch: fetchAdminData, data: admins } = useGet(
    'AdminsInfo',
    `${APIS.ADMINS_LIST}?skip=${currentPage}&limit=${pageSize}`,
  )

  // useEffect(() => {
  //   const ws = new WebSocket(`${process.env?.REACT_APP_SOCKET_URL}`)
  //   // const apiCall = {
  //   //   event: 'bts:subscribe',
  //   //   data: { channel: 'order_book_btcusd' },
  //   // }

  //   // ws.onopen = () => {
  //   //   ws.send(JSON.stringify(apiCall))
  //   // }

  //   ws.onmessage = (event) => {
  //     const eventData = JSON.parse(event.data)
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
    fetchUsers()
  }, [fetchUsers, currentPage, pageSize])

  useEffect(() => {
    fetchAdminData()
  }, [fetchAdminData, pageSize, currentPage])

  const [searchedText, setSearchedText] = useState('')
  const handleInputChange = (e: any) => {
    setSearchedText(e.target.value)
  }
  const items: TabItem[] = [
    {
      key: 'driver',
      label: 'Driver',
      children: (
        <UsersData
          users={drivers?.data?.drivers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          totalCount={drivers?.data?.drivers?.count}
          scroll={370}
          searchedText={searchedText}
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
          scroll={370}
          searchedText={searchedText}
        />
      ),
    },
  ]
  return (
    <AdminPrivateLayout>
      <MainContainer>
        <HeadingWrapper>
          <MainHeading>Driver &amp; Admin</MainHeading>
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
        <ActivityWrapper>
          <TitleWrapper>
            <InputWrapper>
              <TextInput
                placeholder="Search "
                prefix={<SearchIcon />}
                control={control}
                name="search"
                handleInputChange={handleInputChange}
              />
            </InputWrapper>
          </TitleWrapper>
          <TabWrapper>
            <CommonTabs items={items} />
          </TabWrapper>
        </ActivityWrapper>
        <Modal isOpen={adminModal}>
          <AddAdminModal showModal={(value: boolean) => setAdminModal(value)} />
        </Modal>
        <Modal isOpen={agentModal}>
          <AddDriverModal showModal={(value: boolean) => setAgentModal(value)} />
        </Modal>
      </MainContainer>
    </AdminPrivateLayout>
  )
}

export default UsersDetail
