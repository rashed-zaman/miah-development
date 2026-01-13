import commonService from "../../service/menu/commonService";
import { TEST_SET_MENU, TEST_TYPE } from "./testTypes";

export const testActonCreator = (data) => {
  return {
    type: TEST_TYPE,
    payload: data,
  };
};

export const setMenu = (menu) => {
  return {
    type: TEST_SET_MENU,
    payload: menu,
  };
};

export const fetchMenuTest = () => {
  return (dispatch) => {
    commonService
      .getData("buildMenu")
      .then((res) => {
        const menu = res;
        if (menu.length > 0) {
          dispatch(setMenu(menu));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};