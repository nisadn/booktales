import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Category = {
    id: string;
    name: string;
}

export interface CategoryState {
  value: Category[]
}

const initialState: CategoryState = {
  value: [],
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    get: (state, action: PayloadAction<Category[]>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { get } = categorySlice.actions

export default categorySlice.reducer