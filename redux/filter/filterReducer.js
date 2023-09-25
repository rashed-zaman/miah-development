import {
  SET_COLOR_FILTER,
  SET_SIZE_FILTER,
  SET_FABRIC_FILTER,
  SET_OCCASION_FILTER,
  SET_PATTERN_FILTER,
  SET_SHORT_FILTER,
  SET_NULL_FILTER,
} from "./filterType";

const initialState = {
  color: "",
  colorCode:'',
  size: "",
  fabric: "",
  ocassion: "",
  pattern: "",
  category: "",
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR_FILTER:
      return {
        ...state,
        color: action.payload,
      };
    case SET_SIZE_FILTER:
      return {
        ...state,
        size: action.payload,
      };
    case SET_FABRIC_FILTER:
      return {
        ...state,
        fabric: action.payload,
      };
    case SET_OCCASION_FILTER:
      return {
        ...state,
        ocassion: action.payload,
      };
    case SET_PATTERN_FILTER:
      return {
        ...state,
        pattern: action.payload,
      };
    case SET_SHORT_FILTER:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
