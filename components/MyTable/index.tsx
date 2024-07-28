import React from 'react'
import { Card, Table } from 'antd'
type Props = {
  data?: any[]
  columns?: any[]
  limit?: number
  total?: number
  loading?: boolean
}
const MyTable = ({
  data = [],
  columns = [],
  loading = false,
  total = 0,
}: Props) => {
  return (
    <Card title={`Total : ${total || 0}`} className="w-full overflow-x-auto  ">
      <Table loading={loading} columns={columns} dataSource={data} />
    </Card>
  )
}

export default MyTable
