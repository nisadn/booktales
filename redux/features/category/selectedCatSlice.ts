import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type Category = {
    id: string;
    name: string;
}

export interface CategoryState {
  value: Category
}

const initialState: CategoryState = {
  value: {id: '', name: ''},
}

export const selectedCatSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Category>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { select } = selectedCatSlice.actions

export default selectedCatSlice.reducer