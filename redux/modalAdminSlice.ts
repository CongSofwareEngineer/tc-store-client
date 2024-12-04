import { INIT_STATE, SLICE } from '@/constant/redux'
import { createSlice } from '@reduxjs/toolkit'

export const modalAdminSlice = createSlice({
  name: SLICE.ModalAdmin,
  initialState: INIT_STATE[SLICE.ModalAdmin],
  reducers: {
    setModal: (_, action) => {
      return action.payload
    },
  },
})

export const { setModal } = modalAdminSlice.actions
export default modalAdminSlice.reducer
