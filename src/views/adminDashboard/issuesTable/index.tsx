import { useState } from 'react'
import { Popover, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Modal from 'components/Modal'
import NoRecords from 'components/RecordNotFound'
import ActionModal from 'views/issuesActionModal'
import OptionIcon from 'assets/svg/OptionIcon'
import { ContentWrapper, Title } from 'styles/components/Navbar'
import { NumberContainer, StatusWrapper, TableWrapper } from 'styles/views/adminDashboard/tableDescription'
import { useHistory } from 'react-router-dom'
import { IssuesSummaryRoute } from 'constants/routes'

interface IIssuesData {
  scroll?: number
  issueDetails?: any
}

const IssuesTable = ({ scroll, issueDetails }: IIssuesData) => {
  const [actionModal, setActionModal] = useState(false)
  const [issueId, setIssueId] = useState('')

  // const [issueModal, setIssueModal] = useState(false)
  // const issueDetails = () => {
  //   setIssueModal(true)
  // }
  // const { refetch: getIssues, data: issueDetails } = useGet('get-issues', `${APIS.ISSUE_LIST}`)

  // useEffect(() => {
  //   getIssues()
  // }, [getIssues])

  const router = useHistory()

  const content = (id: string) => {
    return (
      <ContentWrapper>
        <Title onClick={() => router.push(`${IssuesSummaryRoute.path.replace(':id', id)}`)}>View</Title>
        <Title>Process</Title>
        <Title onClick={() => resolveAction(id)} id={id}>
          Resolve
        </Title>
      </ContentWrapper>
    )
  }
  const resolveAction = (id: string) => {
    setIssueId(id)
    setActionModal(true)
  }
  const columns: ColumnsType<any> = [
    {
      title: 'Issue number',
      dataIndex: 'id',
      key: 'id',
      render: (data: string) => {
        return <NumberContainer>{data}</NumberContainer>
      },
    },
    {
      title: 'Created On',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Subcategory',
      dataIndex: 'sub_category',
      key: 'sub_category',
    },
    {
      title: 'Short Description',
      dataIndex: 'description',
      key: 'description',
      render: (data: any) => {
        return <div>{data?.short_desc}</div>
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data: string | JSX.Element) => {
        if (typeof data === 'string') {
          return (
            <StatusWrapper
              variant={data === 'Resolved' ? 'Resolved' : data === 'In Progress' ? 'inProgress' : 'Escalate'}
            >
              {data}
            </StatusWrapper>
          )
        }
      },
    },
    {
      title: 'Action',
      dataIndex: '_id',
      key: 'x',
      render: (id, item) => (
        <Popover key={item._id} placement="bottomLeft" content={content(id)} trigger="hover">
          <OptionIcon />
        </Popover>
      ),
    },
  ]

  return (
    <TableWrapper>
      <Table
        columns={columns}
        dataSource={issueDetails?.data?.issueList}
        locale={{ emptyText: <NoRecords /> }}
        pagination={{ pageSize: 50 }}
        scroll={{ y: scroll === undefined ? 250 : scroll }}
      />
      <Modal isOpen={actionModal}>
        <ActionModal showModal={(value: boolean) => setActionModal(value)} id={issueId} />
      </Modal>
    </TableWrapper>
  )
}

export default IssuesTable
