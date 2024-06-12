import { createSlice } from '@reduxjs/toolkit'
import { INIT_STATE, SLICE } from '@/constant/redux'

export const languageSlice = createSlice({
  name: SLICE.Language,
  initialState: INIT_STATE[SLICE.Language],
  reducers: {
    setLanguage: (_, action) => {
      return action.payload
    }
  }
})

export const { setLanguage } = languageSlice.actions
export default languageSlice.reducer

// const localeEN = {
//   la: 'en',
//   messages: MessageEN
// }
// const localeVN = {
//   la: 'vi',
//   messages: MessageVN
// }
