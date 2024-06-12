import { INIT_STATE, SLICE } from '@/constant/redux'
import { createSlice } from '@reduxjs/toolkit'

export const settingSlice = createSlice({
  name: SLICE.Setting,
  initialState: INIT_STATE[SLICE.Setting],
  reducers: {
    setSetting: (_, action) => {
      return action.payload
    }
  }
})

export const { setSetting } = settingSlice.actions
export default settingSlice.reducer
