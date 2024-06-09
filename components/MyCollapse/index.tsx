import { Collapse, CollapseProps } from 'antd'
import React from 'react'
type CollapseType = {
  items: any
  defaultActiveKey?: Array<string>
  onChange?: any
  className?: string
  expandIcon?: any
  rootClassName?: string
} & CollapseProps
const MyCollapse = ({
  items,
  defaultActiveKey,
  onChange,
  className = '',
  expandIcon = null,
  rootClassName = '',
  ...props
}: CollapseType) => {
  return (
    <Collapse
      expandIcon={expandIcon}
      items={items}
      defaultActiveKey={defaultActiveKey}
      onChange={onChange}
      className={className}
      rootClassName={rootClassName}
      {...props}
    />
  )
}

export default MyCollapse
