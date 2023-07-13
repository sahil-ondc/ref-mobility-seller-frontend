import React from 'react'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import moment from 'moment'
import { LocationWrapper } from 'styles/views/orderTracking'
import { OrderTableItem, OrderTableProps } from 'interfaces/views'

const OrderTable: React.FC<OrderTableProps> = ({ details }) => {
  const columns: ColumnsType<OrderTableItem> = [
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (data) => {
        return <LocationWrapper>{data}</LocationWrapper>
      },
    },
    // {
    //   title: 'Details',
    //   dataIndex: 'description',
    //   key: 'description',
    //   render: (data) => {
    //     return <LocationWrapper>{data}</LocationWrapper>;
    //   },
    // },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (data) => {
        const inputDateTime = data
        const outputFormat = 'DD, MMMM YYYY'
        const convertedDateTime = moment(inputDateTime).format(outputFormat)
        return <LocationWrapper>{convertedDateTime}</LocationWrapper>
      },
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'time',
      render: (data) => {
        const inputDateTime = data
        const outputFormat = 'h:mma'
        const convertedDateTime = moment(inputDateTime).format(outputFormat)
        return <LocationWrapper>{convertedDateTime}</LocationWrapper>
      },
    },
  ]

  return <Table columns={columns} dataSource={details} pagination={false} />
}

export default OrderTable
