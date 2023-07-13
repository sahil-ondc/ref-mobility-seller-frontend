import { useEffect, useState } from 'react'
import { Popover, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Modal from 'components/Modal'
import NoRecords from 'components/RecordNotFound'
import DeleteTaskModal from 'views/deleteTaskModal'
import DeactivateDriver from 'views/deleteTaskModal/deactivateDriver'
import DriverDetails from 'views/adminDashboard/usersTable/userTableDescription'
import { IUserData } from 'interfaces'
import OptionIcon from 'assets/svg/OptionIcon'
import ArrowIcon from 'assets/svg/ArrowIcon'
import DownArrowIcon from 'assets/svg/DownArrowIcon'
import UserImage from 'assets/images/avatar_image.png'
import {
  DriverInfoWrapper,
  Name,
  DriverStatusConatiner,
  DriverStatusWrapper,
  StatusButton,
  StatusOffline,
} from 'styles/views/adminDashboard/tableDescription'
import { ContentWrapper, Title } from 'styles/components/Navbar'

const UsersData = ({
  users,
  currentPage,
  pageSize,
  setCurrentPage,
  setPageSize,
  totalCount,
  scroll,
  searchedText,
}: IUserData) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [deactivateModal, setDeactivateModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string>('')
  const [deactivateId, setDeactivateId] = useState<string>('')
  const [popoverOpen, setPopoverOpen] = useState<any[]>([])

  const handleActionClick = (index: number) => {
    setPopoverOpen((prevOpen) => {
      const updatedOpen = [...prevOpen]
      updatedOpen[index] = false
      return updatedOpen
    })
  }
  const actionsContent = (id: string, item: any, index: number) => {
    return (
      <ContentWrapper onClick={() => handleActionClick(index)}>
        <Title>Edit</Title>
        {item?.userId?.enabled !== 2 ? (
          <Title onClick={() => deactivateDriver(id)} id={id}>
            Deactivate
          </Title>
        ) : (
          <Title id={id}>Activate</Title>
        )}
        {item?.userId?.enabled === 2 ? (
          <Title onClick={() => deleteData(id)} id={id}>
            Delete
          </Title>
        ) : null}
      </ContentWrapper>
    )
  }

  const handlePopoverOpenChange = (index: number, open: any) => {
    setPopoverOpen((prevOpen) => {
      const updatedOpen = [...prevOpen]
      updatedOpen[index] = open
      return updatedOpen
    })
  }

  const deleteData = (id: string) => {
    setDeleteId(id)
    setDeleteModal(true)
  }
  const deactivateDriver = (id: string) => {
    setDeactivateId(id)
    setDeactivateModal(true)
  }

  const [showPagination, setShowPagination] = useState(true)

  const newPaginationView = () => {
    const val = users?.map(
      (item: any) =>
        item?.name?.includes(searchedText) ||
        item?.email?.includes(searchedText) ||
        item?.mobile?.includes(searchedText),
    )
    if (searchedText === '' || searchedText === undefined) {
      setShowPagination(true)
    } else if (val?.includes(true)) {
      setShowPagination(true)
    } else setShowPagination(false)
  }

  useEffect(() => {
    newPaginationView()
  }, [searchedText])

  const columns: ColumnsType<any> = [
    {
      title: 'Name',
      dataIndex: 'userId',
      key: 'name',

      render: (info) => {
        return (
          <DriverInfoWrapper>
            <img src={UserImage} alt="user" />
            <Name>{info?.name}</Name>
          </DriverInfoWrapper>
        )
      },
      filteredValue: searchedText ? [searchedText] : null,
      onFilter: (value: any, record: any) => {
        return (
          String(record?.userId?.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.userId?.mobile).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.userId?.email).toLowerCase().includes(value.toLowerCase())
        )
      },
    },
    {
      title: 'Contact',
      dataIndex: 'userId',
      key: 'Contact',
      render: (info) => <>{info?.mobile}</>,
    },
    {
      title: 'Email address',
      dataIndex: 'userId',
      key: 'email',
      render: (info) => <>{info?.email}</>,
    },
    {
      title: 'Status',
      dataIndex: 'userId',
      key: 'status',
      render: (data) => {
        return (
          <DriverStatusConatiner>
            <DriverStatusWrapper status={data?.enabled}>
              {data?.enabled === 1 ? 'Onboarded' : data?.enabled === 2 ? 'Blocked' : 'Ongoing'}
            </DriverStatusWrapper>
          </DriverStatusConatiner>
        )
      },
    },
    {
      title: 'Available',
      dataIndex: 'isOnline',
      key: 'isOnline',
      render: (data) => {
        return <div>{data ? <StatusButton /> : <StatusOffline />}</div>
      },
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'x',
      render: (id, item, index) => (
        <Popover
          key={item._id}
          placement="bottomLeft"
          trigger="click"
          content={actionsContent(id, item, index)}
          open={popoverOpen[index]}
          onOpenChange={(open) => handlePopoverOpenChange(index, open)}
        >
          <OptionIcon />
        </Popover>
      ),
    },
  ]

  return (
    <>
      <Table
        scroll={{ y: scroll === undefined ? 250 : scroll }}
        columns={columns}
        dataSource={users}
        locale={{ emptyText: <NoRecords /> }}
        expandable={{
          expandedRowRender: () => <DriverDetails />,
          expandIcon: ({ expanded, onExpand, record }) => (
            <span onClick={(e) => onExpand(record, e as React.MouseEvent<HTMLSpanElement, MouseEvent>)}>
              {expanded ? <DownArrowIcon /> : <ArrowIcon />}
            </span>
          ),
        }}
        pagination={
          showPagination && {
            pageSizeOptions: ['5', '10', '20'],
            showSizeChanger: true,
            locale: { items_per_page: 'Records Per Page' },
            current: Math.ceil(currentPage / pageSize) + 1,
            pageSize: pageSize,
            total: totalCount,
            onChange: (currentPage, pageSize) => {
              const newSkipValue = (currentPage - 1) * pageSize
              setCurrentPage(newSkipValue)
              setPageSize(pageSize)
            },
          }
        }
        rowKey="userId"
      />

      <Modal isOpen={deleteModal}>
        <DeleteTaskModal showModal={(value: boolean) => setDeleteModal(value)} id={deleteId} />
      </Modal>
      <Modal isOpen={deactivateModal}>
        <DeactivateDriver showModal={(value: boolean) => setDeactivateModal(value)} id={deactivateId} />
      </Modal>
    </>
  )
}

export default UsersData
