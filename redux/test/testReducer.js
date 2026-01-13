import { TEST_SET_MENU, TEST_TYPE } from "./testTypes";

const initialState = {
  testDataToChange: 'let change',
  testMent: [],
};

const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_TYPE:
      return {
        ...state,
        testDataToChange: action.payload,
      };
    case TEST_SET_MENU:
      return {
        ...state,
        testMent: action.payload,
      };
      default:
      return state;
  }
};

export default testReducer;