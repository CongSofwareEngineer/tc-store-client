import React from 'react'
import { Card, Table } from 'antd'
type Props = {
  data?: any[]
  columns?: any[]
  limit?: number
  total?: number
  loading?: boolean
  extra?: React.ReactNode
}
const MyTable = ({
  data = [],
  columns = [],
  loading = false,
  total = 0,
  extra = null,
}: Props) => {
  return (
    <Card
      extra={extra}
      title={`Total : ${total || 0}`}
      className="w-full overflow-x-auto  "
    >
      <Table loading={loading} columns={columns} dataSource={data} />
    </Card>
  )
}

export default MyTable
