import {
  getData,
  getSiteOptions,
} from "../../service/common-service/commonService";

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

export const getMenu = (menu) => {
  return {
    type: GET_MENU,
    payload: menu,
  };
};

export const setCount = () => {
  return {
    type: SET_COUNT,
    payload: 1,
  };
};

export const fetchMenu = () => {
  return (dispatch) => {
    getData("buildMenu")
      .then((res) => {
        const menu = res;
        if (menu.length > 0) {
          dispatch(getMenu(menu));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const drawer = (drawer) => {
  return {
    type: DRAWER,
    payload: drawer,
  };
};

export const catDrawer = (drawer) => {
  return {
    type: CAT_DRAWER,
    payload: drawer,
  };
};

export const subDrawer = (drawer) => {
  return {
    type: SUB_DRAWER,
    payload: drawer,
  };
};

export const loadCategory = (category) => {
  return {
    type: LOAD_CATEGORY,
    payload: category,
  };
};

export const loadSubCategory = (category) => {
  return {
    type: LOAD_SUB_CATEGORY,
    payload: category,
  };
};

export const setSiteOptions = (optons) => {
  return {
    type: SET_SITE_OPTIONS,
    payload: optons,
  };
};

export const fetchStieOptions = () => {
  return (dispatch) => {
    getSiteOptions("option")
      .then((res) => {
        const options = res;
        if (options) {
          dispatch(setSiteOptions(options));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setSearchPanel = (srch) => {
  return {
    type: SET_SEARCH_PANEL,
    payload: srch,
  };
};
