import { INIT_STATE, SLICE } from '@/constant/redux'
import { createSlice } from '@reduxjs/toolkit'

export const userDataSlice = createSlice({
  name: SLICE.UserData,
  initialState: INIT_STATE[SLICE.UserData],
  reducers: {
    setUserData: (_, action) => {
      return action.payload
    }
  }
})

export const { setUserData } = userDataSlice.actions
export default userDataSlice.reducer
