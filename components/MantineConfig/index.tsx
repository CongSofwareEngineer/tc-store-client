'use client'
import React from 'react'
import { Button, Input, MantineProvider, TextInput } from '@mantine/core'

import { createTheme } from '@mantine/core'

export const theme = createTheme({
  /* Put your mantine theme override here */
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: 8,
      },
      vars: (theme, props) => {
        if (props.variant === 'filled') {
          return {
            root: {
              '--button-bg': '#fcd34d',
              '--button-color': 'black',
              '--button-bd': '#fcd34d',
              '--button-hover': '#fbdf88',
            },
          }
        }
        return {
          root: {
            '--button-bg': '#29a200',
            '--button-hover': '#70bd56',
          },
        }
      },
    }),
    Input: Input.extend({
      defaultProps: {
        radius: 6,
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        radius: 6,
      },
    }),
  },
})

const MantineConfig = ({ children }: { children: React.ReactNode }) => {
  return <MantineProvider theme={theme}>{children}</MantineProvider>
}

export default MantineConfig
