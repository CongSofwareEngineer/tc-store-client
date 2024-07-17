import { INIT_STATE, SLICE } from '@/constant/redux'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


export const fetchProvinces = createAsyncThunk(
  'provinces/fetchProvinces',
  async () => {
    try {
      const data = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')

      return data?.data?.data || data?.data || []
    } catch (error) {
      return []
    }
  }
)

export const provincesSlice = createSlice({
  name: SLICE.Provinces,
  initialState: INIT_STATE[SLICE.Provinces],
  reducers: {
    setProvinces: (_: any, action) => {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProvinces.fulfilled, (_: any, action) => {
        return action.payload
      })
  }
})

export const { setProvinces } = provincesSlice.actions
export default provincesSlice.reducer
