import { INIT_STATE, SLICE, TYPE_SLICE } from '@/constant/redux'
import { createSlice } from '@reduxjs/toolkit'

export const userDataSlice = createSlice({
  name: SLICE.UserData,
  initialState: INIT_STATE[SLICE.UserData],
  reducers: {
    setUserData: (state: TYPE_SLICE | any, action) => {
      state[SLICE.UserData] = action.payload
    }
  }
})

export const { setUserData } = userDataSlice.actions
export default userDataSlice.reducer
