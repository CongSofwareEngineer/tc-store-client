import { INIT_STATE, SLICE, TYPE_SLICE } from '@/constant/redux'
import { createSlice } from '@reduxjs/toolkit'

export const connectedChainSlice = createSlice({
  name: SLICE.ConnectedChain,
  initialState: INIT_STATE[SLICE.ConnectedChain],
  reducers: {
    setConnectedChain: (state: TYPE_SLICE | any, action) => {
      state[SLICE.ConnectedChain] = action.payload
    }
  }
})

export const { setConnectedChain } = connectedChainSlice.actions
export default connectedChainSlice.reducer
