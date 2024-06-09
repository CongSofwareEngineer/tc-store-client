'use client'

import { ConfigProvider } from 'antd'
import React from 'react'

const AntdProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: '#29a200',
            defaultColor: 'white',
            defaultHoverBg: '#6f3',
            defaultHoverColor: 'white',
            defaultHoverBorderColor: 'transparent',
            defaultActiveBg: '#6f3',
            defaultActiveColor: 'white',
            defaultActiveBorderColor: 'transparent',
          },
          Select: {},
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default AntdProvider
