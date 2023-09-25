import {
  LOG_OUT,
  MOBILE_USER_ACCOUNT,
  CHANGE_WISH_LIST,
  SET_AUTH_LOADING,
  SET_RECENT_SEARCH,
  SET_RECENT_VIEW,
  SET_USER_INFO,
} from "./authTypes";

const initialState = {
  userInfo: {},
  loading: false,
  mobileUserDialog: false,
  rectRearch: [],
  recentView: [],
  wishList: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case MOBILE_USER_ACCOUNT:
      return {
        ...state,
        mobileUserDialog: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        userInfo: action.payload,
      };
    case SET_RECENT_VIEW:
      if (state.recentView) {
        var tempRecent = state.recentView;
        if (tempRecent !== undefined) {
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
        }
      }
      return {
        ...state,
        recentView: tempRecent,
      };
    case SET_RECENT_SEARCH:
      let temp = state.rectRearch;
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
    case CHANGE_WISH_LIST:
      return {
        ...state,
        wishList: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
