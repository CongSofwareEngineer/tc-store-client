import { INIT_STATE, SLICE } from '@/constant/redux'
import { createSlice } from '@reduxjs/toolkit'

export const connectedChainSlice = createSlice({
  name: SLICE.ConnectedChain,
  initialState: INIT_STATE[SLICE.ConnectedChain],
  reducers: {
    setConnectedChain: (_, action) => {
      return action.payload
    }
  }
})

export const { setConnectedChain } = connectedChainSlice.actions
export default connectedChainSlice.reducer
