import { useEffect, useState } from 'react'
import { Popover, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Modal from 'components/Modal'
import NoRecords from 'components/RecordNotFound'
import AdminDetails from 'views/adminDashboard/adminTable/adminTableDescription'
import UpdateStatus from 'views/updateModal'
import { IUserData } from 'interfaces'
import OptionIcon from 'assets/svg/OptionIcon'
import ArrowIcon from 'assets/svg/ArrowIcon'
import DownArrowIcon from 'assets/svg/DownArrowIcon'
import { NumberWrapper, AdminStatusWrapper } from 'styles/views/adminDashboard/tableDescription'
import { ContentWrapper, Title } from 'styles/components/Navbar'

const AdminData = ({
  users,
  currentPage,
  pageSize,
  setCurrentPage,
  setPageSize,
  totalCount,
  searchedText,
}: IUserData) => {
  const [updateModal, setUpdateModal] = useState(false)
  const updateTask = () => {
    setUpdateModal(true)
  }
  const content = (
    <ContentWrapper>
      <Title>Edit</Title>
      <Title onClick={updateTask}>Update</Title>
      <Title>Reschedule</Title>
      <Title>Reallocate</Title>
      <Title>Cancel</Title>
    </ContentWrapper>
  )
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
      dataIndex: 'name',
      key: 'name',
      render: (data: string | JSX.Element) => {
        if (typeof data === 'string') {
          return <NumberWrapper>{data}</NumberWrapper>
        }

        return data
      },
      filteredValue: searchedText ? [searchedText] : null,
      onFilter: (value: any, record: any) => {
        return (
          String(record?.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.mobile).toLowerCase().includes(value.toLowerCase()) ||
          String(record?.email).toLowerCase().includes(value.toLowerCase())
        )
      },
    },
    {
      title: 'Contact',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Status',
      dataIndex: 'enabled',
      key: 'status',
      render: (data) => {
        return <AdminStatusWrapper status={data}>{data === 1 ? 'Active' : 'Inactive'}</AdminStatusWrapper>
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => (
        <Popover placement="bottomLeft" content={content} trigger="click">
          <OptionIcon />
        </Popover>
      ),
    },
  ]

  return (
    <>
      <Table
        scroll={{ y: 250 }}
        columns={columns}
        locale={{ emptyText: <NoRecords /> }}
        dataSource={users}
        expandable={{
          expandedRowRender: () => {
            return <AdminDetails />
          },
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
        rowKey="email"
      />
      <Modal isOpen={updateModal}>
        <UpdateStatus showModal={(value: boolean) => setUpdateModal(value)} />
      </Modal>
    </>
  )
}

export default AdminData
