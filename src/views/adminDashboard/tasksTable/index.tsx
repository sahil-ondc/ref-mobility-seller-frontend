import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { Popover, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Button from 'components/Button'
import Modal from 'components/Modal'
import TextInput from 'components/TextInput'
import SelectField from 'components/SelectField'
import NoRecords from 'components/RecordNotFound'
import AssignTasksModal from 'views/assignTaskModal'
import ItemDetails from 'views/adminDashboard/tasksTable/taskDescriptionTable'
import ArrowIcon from 'assets/svg/ArrowIcon'
import DownArrowIcon from 'assets/svg/DownArrowIcon'
import SearchIcon from 'assets/svg/SearchIcon'
import FilterIcon from 'assets/svg/FilterIcon'
import {
  NumberWrapper,
  QuantityWrapper,
  StatusWrapper,
  ButtonWrapper,
} from 'styles/views/adminDashboard/tableDescription'
import { AssignedButtonContainer } from 'styles/views/inviteAgentScreen/agentDetailSection'
import { InputWrapper } from 'styles/views/dashboard'
import { ButtonContainer, RightSection, FilterWrapper } from 'styles/views/adminDashboard'
import OptionIcon from 'assets/svg/OptionIcon'
import { ContentWrapper, Title } from 'styles/components/Navbar'

interface ITasksData {
  scroll?: number
  search?: boolean
  taskData?: any
}

const TasksData = ({ scroll, search, taskData }: ITasksData) => {
  const [activeIndex, setActiveIndex] = useState('Pending')
  const [taskModal, setTaskModal] = useState(false)
  const [activeTask, setActiveTask] = useState('')
  const [filteredStatus, setFilteredStatus] = useState()
  const [realtimeData] = useState<any>([])
  const { control } = useForm()
  const router = useHistory()

  const filterOptions = [
    { value: 'Return', label: 'Return' },
    { value: 'Refund', label: 'Refund' },
    { value: 'Redeliver', label: 'Redeliver' },
    { value: 'Cancel', label: 'Cancel' },
  ]

  const columns: ColumnsType<any> = [
    {
      title: 'Item serial number',
      dataIndex: 'task_id',
      key: 'task_id',

      render: (data: string) => {
        return <NumberWrapper>{data}</NumberWrapper>
      },

      filteredValue: filteredStatus ? [filteredStatus] : null,
      onFilter: (value: any, record: any) => {
        return String(record?.status).toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      title: 'items Quantity',
      dataIndex: 'linked_order',
      key: 'linked_order',
      render: (data: any) => {
        return <QuantityWrapper>{data?.items?.length}</QuantityWrapper>
      },
    },
    {
      title: 'Weight',
      dataIndex: 'linked_order',
      key: 'linked_order',
      render: (data: any) => {
        return (
          <NumberWrapper>
            {data?.order?.weight?.value} {data?.order?.weight?.unit === 'kilogram' ? 'kg' : data?.order?.weight?.unit}
          </NumberWrapper>
        )
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data: string | JSX.Element) => {
        if (typeof data === 'string') {
          return <StatusWrapper status={data}>{data}</StatusWrapper>
        }
      },
    },
    activeIndex === 'Pending'
      ? {
          title: 'Action',
          dataIndex: '',
          key: 'x',
          render: (record: any) => {
            return (
              <ButtonWrapper>
                <Button
                  label="Assign Task"
                  variant={
                    record?.status === 'Pending' ||
                    record?.status === 'Searching-for-Agent' ||
                    record?.status === 'RTO-Initiated'
                      ? 'contained'
                      : 'disabled'
                  }
                  onClick={() => handleClick(record?.status, record?._id)}
                />
              </ButtonWrapper>
            )
          },
        }
      : {
          title: 'Action',
          dataIndex: '_id',
          key: 'x',
          render: (item) => {
            return (
              <Popover
                placement="bottomLeft"
                content={
                  <ContentWrapper>
                    <Title onClick={() => router.push(`/order-tracking/${item}`)}>View</Title>
                  </ContentWrapper>
                }
                trigger="click"
              >
                <OptionIcon />
              </Popover>
            )
          },
        },
  ]

  const handleClick = (status: string, taskId: string) => {
    if (status === 'Pending' || status === 'Cancelled' || status === 'Searching-for-Agent') {
      setTaskModal(true)
      setActiveTask(taskId)
    }
  }

  // const sseURL = `${process.env.REACT_APP_BASE_URL}${APIS.AGENT_SSE}`

  // useEffect(() => {
  //   const sse = new EventSource(sseURL)
  //   sse.addEventListener('on_init', (e) => {
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
    <>
      <AssignedButtonContainer>
        <ButtonContainer>
          <Button
            type="button"
            label="Unassigned"
            variant="outline"
            onClick={() => setActiveIndex('Pending')}
            className={activeIndex === 'Pending' ? 'filled' : 'notfilled'}
          />
          <Button
            type="button"
            label="Assigned"
            variant="outline"
            className={activeIndex === 'Agent-Assigned' ? 'filled' : 'notfilled'}
            onClick={() => {
              setActiveIndex('Agent-Assigned')
            }}
          />
        </ButtonContainer>
        {search ? (
          <RightSection>
            <InputWrapper>
              <TextInput placeholder="Search" prefix={<SearchIcon />} control={control} name="search" />
            </InputWrapper>
            <FilterWrapper>
              <SelectField
                options={filterOptions}
                control={control}
                name="filter"
                placeholder="Filter"
                suffixIcon={<FilterIcon />}
                handleValue={(e) => setFilteredStatus(e)}
              />
            </FilterWrapper>
          </RightSection>
        ) : null}
      </AssignedButtonContainer>
      <>
        <Table
          scroll={{ y: scroll === undefined ? 200 : scroll }}
          columns={columns}
          locale={{ emptyText: <NoRecords /> }}
          dataSource={
            taskData?.length
              ? activeIndex === 'Pending'
                ? [...realtimeData, ...taskData].filter(
                    (e) => e.status === 'Pending' || e.status === 'Cancelled' || e.status === 'Searching-for-Agent',
                  )
                : [...realtimeData, ...taskData].filter(
                    (e) => e.status !== 'Pending' && e.status !== 'Cancelled' && e.status !== 'Searching-for-Agent',
                  )
              : []
          }
          expandable={{
            expandedRowRender: (record) => <ItemDetails record={record} />,
            expandIcon: ({ expanded, onExpand, record }) => (
              <span onClick={(e) => onExpand(record, e as React.MouseEvent<HTMLSpanElement, MouseEvent>)}>
                {expanded ? <DownArrowIcon /> : <ArrowIcon />}
              </span>
            ),
          }}
          rowKey="task_id"
        />
        <Modal isOpen={taskModal}>
          <AssignTasksModal showModal={(value: boolean) => setTaskModal(value)} activeTask={activeTask} />
        </Modal>
      </>
    </>
  )
}

export default TasksData
