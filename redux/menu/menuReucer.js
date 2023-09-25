import {
  CAT_DRAWER,
  DRAWER,
  GET_MENU,
  LOAD_CATEGORY,
  LOAD_SUB_CATEGORY,
  SET_COUNT,
  SET_SEARCH_PANEL,
  SET_SITE_OPTIONS,
  SUB_DRAWER,
} from "./menuType";

const initialState = {
  menu: [],
  siteOptions: {},
  searchPanel: false,
  count: 1,
  category: [],
  subCategory: [],
  drawer: false,
  catDrawer: false,
  subDrawer: false,
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MENU:
      return {
        ...state,
        menu: action.payload,
      };
    case SET_COUNT:
      return {
        ...state,
        count: action.payload + parseInt(state.count),
      };
    case DRAWER:
      return {
        ...state,
        drawer: action.payload,
      };
    case SUB_DRAWER:
      return {
        ...state,
        subDrawer: action.payload,
      };
    case CAT_DRAWER:
      return {
        ...state,
        catDrawer: action.payload,
      };
    case LOAD_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case LOAD_SUB_CATEGORY:
      return {
        ...state,
        subCategory: action.payload,
      };
    case SET_SITE_OPTIONS:
      return {
        ...state,
        siteOptions: action.payload,
      };
    case SET_SEARCH_PANEL:
      return {
        ...state,
        searchPanel: action.payload,
      };
    default:
      return state
  }
};

export default menuReducer;
