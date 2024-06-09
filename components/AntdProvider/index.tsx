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
          Collapse: {
            headerBg: '#bbf7d0',
            contentPadding: '0px 0px 10px 0px',
            borderRadius: 16,
            colorBorder: 'black',
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default AntdProvider
