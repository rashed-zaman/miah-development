import {
  ADD_QTY,
  ADD_TO_BAG,
  DEDUCT_QTY,
  MOBILE_BAG_DIALOG,
  REMOVE_FROM_BAG,
  REPLEACE_BAG,
  SET_BAG_NULL,
  RESET_SHOPPING_CART,
} from "./shoppingBagTypes";

const initialState = {
  shoppingCart: [],
  mobileBagDialog: false,
};
const shoppingBagReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_BAG:
      const prodExist = state.shoppingCart.find(
        (item) => item.id === action.payload.id
      );
      if (prodExist) {
        let addItem = [];
        state.shoppingCart.map((item) => {
          if (item.id === action.payload.id) {
            (item.qty = prodExist.qty + action.payload.qty),
              // action.payload.category_id === 7
              //   ? prodExist.qty + action.payload.qty
              //   : prodExist.qty + 1
              (item.amount = item.qty * item.unitPrice);
          }
          return addItem.push(item);
        });
        return {
          ...state,
          shoppingCart: addItem,
        };
      } else {
        let newItem = action.payload
            newItem.amount = newItem.qty * newItem.unitPrice
        return {
          ...state,
          shoppingCart: [...state.shoppingCart, newItem],
        };
      }
    case ADD_QTY:
      const isItemExist = state.shoppingCart.find(
        (item) => item.id === action.payload.id
      );
      if (isItemExist) {
        let addItem = [];
        state.shoppingCart.map((item) => {
          if (item.id === action.payload.id) {
            item.qty += 1;
            item.amount = item.qty * item.unitPrice;
          }
          return addItem.push(item);
        });
        return {
          ...state,
          shoppingCart: addItem,
        };
      }
    case DEDUCT_QTY:
      const isExist = state.shoppingCart.find(
        (item) => item.id === action.payload.id
      );
      if (isExist) {
        let addItem = [];
        state.shoppingCart.map((item) => {
          if (item.id === action.payload.id) {
            item.qty -= 1;
            item.amount = item.qty * item.unitPrice;
          }
          return addItem.push(item);
        });
        return {
          ...state,
          shoppingCart: addItem,
        };
      }
    case REMOVE_FROM_BAG:
      let filProduct = state.shoppingCart.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        shoppingCart: filProduct,
      };
    case MOBILE_BAG_DIALOG:
      return {
        ...state,
        mobileBagDialog: action.payload,
      };
    case REPLEACE_BAG:
      return {
        ...state,
        shoppingCart: action.payload,
      };
    case SET_BAG_NULL:
      return {
        ...state,
        shoppingCart: [],
      };
    case RESET_SHOPPING_CART:
      return {
        ...state,
        shoppingCart: [],
      };
    default:
      return state;
  }
};
export default shoppingBagReducer;
