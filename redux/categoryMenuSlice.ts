import { INIT_STATE, SLICE } from '@/constant/redux'
import ClientApi from '@/services/clientApi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchMenuCategory: any = createAsyncThunk('CategoryMenu/fetchMenuCategory', async () => {
  try {
    const menuCategory = await ClientApi.getCategory(true)
    return menuCategory?.data || []
  } catch (error) {
    return []
  }
})

export const categoryMenuSlice = createSlice({
  name: SLICE.CategoryMenu,
  initialState: INIT_STATE[SLICE.CategoryMenu],
  reducers: {
    setMenuCategory: (_: any, action) => {
      return action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMenuCategory.fulfilled, (_: any, action) => {
      return action.payload
    })
  },
})

export const { setMenuCategory } = categoryMenuSlice.actions
export default categoryMenuSlice.reducer
