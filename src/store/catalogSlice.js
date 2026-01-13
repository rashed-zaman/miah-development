import { createSlice } from '@reduxjs/toolkit'
import catalogData from '../data/catalog'

const initialState = {
  catalog: catalogData,
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setCatalog(state, action) {
      state.catalog = action.payload
    },
  },
})

export const { setCatalog } = catalogSlice.actions
export default catalogSlice.reducer
