import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: [],
  mobileBagDialog: false,
};

const shoppingBagSlice = createSlice({
  name: "shoppingBag",
  initialState,
  reducers: {
    addToBag: (state, action) => {
      const item = action.payload;
      const exist = state.shoppingCart.find((p) => p.id === item.id);

      if (exist) {
        exist.qty = exist.qty + item.qty;
        exist.amount = exist.qty * exist.unitPrice;
      } else {
        const newItem = {
          ...item,
          amount: item.qty * item.unitPrice,
        };
        state.shoppingCart.push(newItem);
      }
    },

    addItemQty: (state, action) => {
      const item = state.shoppingCart.find((p) => p.id === action.payload.id);
      if (item) {
        item.qty += 1;
        item.amount = item.qty * item.unitPrice;
      }
    },

    removeItemQty: (state, action) => {
      const item = state.shoppingCart.find((p) => p.id === action.payload.id);
      if (item && item.qty > 0) {
        item.qty -= 1;
        item.amount = item.qty * item.unitPrice;
      }
    },

    removeFromBag: (state, action) => {
      state.shoppingCart = state.shoppingCart.filter(
        (item) => item.id !== action.payload.id
      );
    },

    setMobileBagDialog: (state, action) => {
      state.mobileBagDialog = action.payload;
    },

    replaceBag: (state, action) => {
      state.shoppingCart = action.payload;
    },

    setBagNull: (state) => {
      state.shoppingCart = [];
    },

    resetShoppingCart: (state) => {
      state.shoppingCart = [];
    },
  },
});

export const {
  addToBag,
  addItemQty,
  removeItemQty,
  removeFromBag,
  setMobileBagDialog,
  replaceBag,
  setBagNull,
  resetShoppingCart,
} = shoppingBagSlice.actions;

export default shoppingBagSlice.reducer;

// Selectors
export const selectShoppingBag = (state) => state.shoppingBag.shoppingCart;
export const selectMobileBagDialog = (state) => state.shoppingBag.mobileBagDialog;
