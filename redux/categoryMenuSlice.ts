import { INIT_STATE, SLICE } from '@/constant/redux'
import ServerApi from '@/services/serverApi'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchMenuCategory = createAsyncThunk(
  'menuCategory/fetchMenuCategory',
  async () => {
    try {
      const menuHandle = await ServerApi.requestBase({
        url: 'menu-category'
      })
      console.log('====================================');
      console.log({ menuHandle });
      console.log('====================================');

      return menuHandle?.data?.data || menuHandle?.data || []
    } catch (error) {
      return []
    }
  }
)


export const categoryMenuSlice = createSlice({
  name: SLICE.CategoryMenu,
  initialState: INIT_STATE[SLICE.CategoryMenu],
  reducers: {
    setMenuCategory: (state: any, action) => {
      state[SLICE.CategoryMenu] = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuCategory.fulfilled, (state: any, action) => {
        console.log('====================================');
        console.log({ action });
        console.log('====================================');
        state[SLICE.CategoryMenu] = action.payload
      })
  }
})

export const { setMenuCategory } = categoryMenuSlice.actions
export default categoryMenuSlice.reducer
