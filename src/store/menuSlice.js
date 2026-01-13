import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData, getSiteOptions } from '@/lib/commonService';

// Async thunks
export const fetchMenu = createAsyncThunk(
  'menu/fetchMenu',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getData('buildMenu');
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSiteOptions = createAsyncThunk(
  'menu/fetchSiteOptions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSiteOptions('option');
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menu: [],
    siteOptions: {},
    searchPanel: false,
    count: 1,
    category: [],
    subCategory: [],
    drawer: false,
    catDrawer: false,
    subDrawer: false,
    loading: false,
    error: null,
  },
  reducers: {
    setMenu: (state, action) => {
      state.menu = action.payload;
    },
    setCount: (state) => {
      state.count += 1;
    },
    setSearchPanel: (state, action) => {
      state.searchPanel = action.payload;
    },
    setDrawer: (state, action) => {
      state.drawer = action.payload;
    },
    setCatDrawer: (state, action) => {
      state.catDrawer = action.payload;
    },
    setSubDrawer: (state, action) => {
      state.subDrawer = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSubCategory: (state, action) => {
      state.subCategory = action.payload;
    },
    setSiteOptions: (state, action) => {
      state.siteOptions = action.payload;
    },
    resetMenu: (state) => {
      state.menu = [];
      state.siteOptions = {};
      state.searchPanel = false;
      state.count = 1;
      state.category = [];
      state.subCategory = [];
      state.drawer = false;
      state.catDrawer = false;
      state.subDrawer = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMenu cases
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          state.menu = action.payload;
        }
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchSiteOptions cases
      .addCase(fetchSiteOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSiteOptions.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.siteOptions = action.payload;
        }
      })
      .addCase(fetchSiteOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  setMenu,
  setCount,
  setSearchPanel,
  setDrawer,
  setCatDrawer,
  setSubDrawer,
  setCategory,
  setSubCategory,
  setSiteOptions,
  resetMenu,
} = menuSlice.actions;

// Export reducer
export default menuSlice.reducer;

// Selectors
export const selectMenu = (state) => state.menu.menu;
export const selectSiteOptions = (state) => state.menu.siteOptions;
export const selectSearchPanel = (state) => state.menu.searchPanel;
export const selectCount = (state) => state.menu.count;
export const selectCategory = (state) => state.menu.category;
export const selectSubCategory = (state) => state.menu.subCategory;
export const selectDrawer = (state) => state.menu.drawer;
export const selectCatDrawer = (state) => state.menu.catDrawer;
export const selectSubDrawer = (state) => state.menu.subDrawer;
export const selectMenuLoading = (state) => state.menu.loading;
export const selectMenuError = (state) => state.menu.error;