import {
  SET_COLOR_FILTER,
  SET_SIZE_FILTER,
  SET_FABRIC_FILTER,
  SET_OCCASION_FILTER,
  SET_PATTERN_FILTER,
  SET_SHORT_FILTER,
  SET_NULL_FILTER,
} from "./filterType";

export const setColorFilter = (payload) => {
  return {
    type: SET_COLOR_FILTER,
    payload: payload,
  };
};

export const setSizeFilter = (payload) => {
  return {
    type: SET_SIZE_FILTER,
    payload: payload,
  };
};

export const setFabricFilter = (payload) => {
  return {
    type: SET_FABRIC_FILTER,
    payload: payload,
  };
};

export const setOccasionFilter = (payload) => {
  return {
    type: SET_OCCASION_FILTER,
    payload: payload,
  };
};

export const setPatternFilter = (payload) => {
  return {
    type: SET_PATTERN_FILTER,
    payload: payload,
  };
};

export const setShortOrder = (payload) => {
  return {
    type: SET_SHORT_FILTER,
    payload: payload,
  };
};

export const setFilterNull = () => {
  return {
    type: SET_NULL_FILTER,
    payload: {
      color: "",
      size: "",
      fabric: "",
      ocassion: "",
      pattern: "",
      category: "",
    },
  };
};
