'use client'
import React from 'react'
import { MantineProvider } from '@mantine/core'

import { createTheme } from '@mantine/core'

export const theme = createTheme({
  /* Put your mantine theme override here */
  components: {},
})

const MantineConfig = ({ children }: { children: React.ReactNode }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>
}

export default MantineConfig
