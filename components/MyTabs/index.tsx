import { cn } from '@/utils/tailwind'
import { Tabs } from '@mantine/core'
import React from 'react'
export type MyTabsProps = {
  data?: Array<{
    label: React.ReactNode
    children?: React.ReactNode
    key: string
  }>
  defaultValue?: string
  onChange?: (tabs: string | null) => void
  classLabel?: string
  classPanel?: string
  classTabs?: string
}

const MyTabs = ({ data = [], defaultValue = '', onChange = () => {}, classLabel = '', classPanel = '', classTabs = '' }: MyTabsProps) => {
  return (
    <Tabs className={classTabs} defaultValue={defaultValue || data[0]?.key} onChange={(tabs) => onChange(tabs)}>
      <Tabs.List className={cn('mb-2', classLabel)}>
        {data.map((e) => {
          return (
            <Tabs.Tab key={`${e.key}-List`} value={e.key}>
              {e.label}
            </Tabs.Tab>
          )
        })}
      </Tabs.List>

      {data.map((e) => {
        return (
          <Tabs.Panel key={`${e.key}-Panel`} className={classPanel} value={e.key}>
            {e.children}
          </Tabs.Panel>
        )
      })}
    </Tabs>
  )
}

export default MyTabs
