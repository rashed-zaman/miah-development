import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "",
  colorCode: "",
  size: "",
  fabric: "",
  ocassion: "",
  pattern: "",
  category: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setColorFilter: (state, action) => {
      state.color = action.payload;
    },
    setSizeFilter: (state, action) => {
      state.size = action.payload;
    },
    setFabricFilter: (state, action) => {
      state.fabric = action.payload;
    },
    setOccasionFilter: (state, action) => {
      state.ocassion = action.payload;
    },
    setPatternFilter: (state, action) => {
      state.pattern = action.payload;
    },
    setShortOrder: (state, action) => {
      state.category = action.payload;
    },
    setFilterNull: () => {
      return initialState; // reset all
    },
  },
});

export const {
  setColorFilter,
  setSizeFilter,
  setFabricFilter,
  setOccasionFilter,
  setPatternFilter,
  setShortOrder,
  setFilterNull,
} = filterSlice.actions;

export default filterSlice.reducer;
