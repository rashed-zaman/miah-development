import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData, postData } from '@/lib/commonService';
import { axiosCredential } from '@/lib/serviceConfig';
import { loginDataLayer } from '@/lib/data-layer/dataLayerCreator';
import { replaceBag } from '@/store/shoppingBagSlice';

// Async thunks
export const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async ({ body, localShoppingBag }, { dispatch, rejectWithValue }) => {
    try {
      await axiosCredential.get('sanctum/csrf-cookie');
      const response = await postData('login', body);
      
      // Check user saved cart after successful login
      if (response.data.data?.shoppingCart) {
        dispatch(checkUserSavedCart({
          cart: response.data.data.shoppingCart,
          localShoppingBag
        }));
      }
      
      loginDataLayer();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const checkUserSavedCart = createAsyncThunk(
  'auth/checkUserSavedCart',
  async ({ cart, localShoppingBag }, { dispatch }) => {
    const combinedCart = [...cart, ...localShoppingBag];
    const uniq = Object.values(combinedCart.reduce((result, obj) => {
      if (!result[obj.id]) {
        result[obj.id] = { ...obj };
      } else {
        result[obj.id].qty += parseInt(obj.qty);
      }
      return result;
    }, {}));

    dispatch(replaceBag(uniq));
    return uniq;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: {},
    loading: false,
    mobileUserDialog: false,
    rectRearch: [],
    recentView: [],
    wishList: [],
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMobileUserAccount: (state, action) => {
      state.mobileUserDialog = action.payload;
    },
    logout: (state) => {
      state.userInfo = {};
    },
    setRecentSearch: (state, action) => {
      const temp = state.rectRearch;
      if (temp.length > 0) {
        const prodExist = temp.find((item) => item === action.payload);
        if (!prodExist) {
          if (temp.length > 7) {
            temp.pop();
            temp.unshift(action.payload);
          } else {
            temp.unshift(action.payload);
          }
        }
      } else {
        temp.unshift(action.payload);
      }
      state.rectRearch = temp;
    },
    setRecentView: (state, action) => {
      if (state.recentView) {
        const tempRecent = [...state.recentView];
        if (tempRecent.length > 0) {
          const rcntProdExist = tempRecent.find(
            (item) => item.id === action.payload.id
          );
          if (!rcntProdExist) {
            if (tempRecent.length > 3) {
              tempRecent.pop();
              tempRecent.unshift(action.payload);
            } else {
              tempRecent.unshift(action.payload);
            }
          }
        } else {
          tempRecent.unshift(action.payload);
        }
        state.recentView = tempRecent;
      }
    },
    changeWishList: (state, action) => {
      state.wishList = action.payload;
    },
    clearRecentSearch: (state) => {
      state.rectRearch = [];
    },
    deleteRecentSearch: (state, action) => {
      state.rectRearch = state.rectRearch.filter(item => item !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
        state.userInfo = {};
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Export actions
export const {
  setUserInfo,
  setAuthLoading,
  setMobileUserAccount,
  logout,
  setRecentSearch,
  setRecentView,
  changeWishList,
  clearRecentSearch,
  deleteRecentSearch,
} = authSlice.actions;

// Export reducer
export default authSlice.reducer;

// Selectors
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectMobileUserDialog = (state) => state.auth.mobileUserDialog;
export const selectRecentSearch = (state) => state.auth.rectRearch;
export const selectRecentView = (state) => state.auth.recentView;
export const selectWishList = (state) => state.auth.wishList;