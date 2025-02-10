'use client'
import React from 'react'
import {
  Button,
  Checkbox,
  CSSVariablesResolver,
  Input,
  MantineProvider,
  RangeSlider,
  Select,
  TextInput,
} from '@mantine/core'

import { createTheme } from '@mantine/core'

export const theme = createTheme({
  /* Put your mantine theme override here */
  components: {
    Button: Button.extend({
      defaultProps: {
        radius: 8,
      },
      vars: (_, props) => {
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
    RangeSlider: RangeSlider.extend({
      defaultProps: {
        color: '#03a92182',
        size: 'sm',
      },
    }),
    Select: Select.extend({
      defaultProps: {
        radius: 6,
      },
      styles: {
        input: {
          cursor: 'pointer',
        },
      },
    }),
    Checkbox: Checkbox.extend({
      defaultProps: {
        color: 'green',
      },
      styles: {
        input: {
          cursor: 'pointer',
        },
      },
    }),
  },
})

const resolver: any = (theme: any) => ({
  variables: {
    '--checkbox-color': 'green',
  },
  light: {
    '--mantine-color-deep-orange': theme.other.deepOrangeLight,
  },
  dark: {
    '--mantine-color-deep-orange': theme.other.deepOrangeDark,
  },
})

const MantineConfig = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      {children}
    </MantineProvider>
  )
}

export default MantineConfig
