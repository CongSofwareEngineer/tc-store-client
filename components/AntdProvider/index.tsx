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
            defaultHoverBg: '#29a200',
            defaultHoverColor: 'white',
            defaultHoverBorderColor: 'transparent',
            defaultActiveBg: '#29a200',
            defaultActiveColor: 'white',
            defaultActiveBorderColor: 'transparent',
          },
          Select: {},
          Collapse: {
            headerBg: 'white',
            contentPadding: 0,
            colorBorder: 'transparent',
            headerPadding: '10px 10px',
            margin: 0,
            borderRadius: 0,
          },
          Form: {
            padding: 0,
            itemMarginBottom: 0,
          },
          Rate: {
            fontSize: 14,
            margin: 0,
            marginMD: 8,
          },
          Drawer: {
            padding: 20,
            paddingMD: 20,
            paddingContentVertical: 20,
          },
        },
        hashed: false,
      }}
    >
      {children}
    </ConfigProvider>
  )
}

export default AntdProvider
