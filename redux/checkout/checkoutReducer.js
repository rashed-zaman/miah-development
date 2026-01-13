import {
  SET_LOCATIONS,
  SET_DEFAULT_ADDRESS,
  TEST_CHEOUT,
  SET_BILLING_CITY,
  SET_BILLING_AREA,
  SET_BILLING_ADDRESS,
  SET_SHIPPING_CITY,
  SET_SHIPPING_AREA,
  SET_SHIPPING_ADDRESS,
  SET_BILLING_DIVISION_ID,
  SET_HAS_SHIPPING,
  SET_FORM_INITIAL_VLAUE_NULL,
  SET_COUPON,
  SET_CREDIT,
  SET_OFFER_DISCOUNT,
  SET_SHIPPING_CHARGE,
} from "./checkoutTypes";
import * as Yup from "yup";

const initialState = {
  fullName: "Abul Kashem",
  shippingCharge: 0,
  locations: [],
  billingCities: [],
  billingAreas: [],
  shippingCities: [],
  shippingAreas: [],
  defaultAddress: {
    billingAllData: {},
    shippingAllData: {},
    billing: [],
    billingFname: "",
    billingLname: "",
    billingContact: "",
    billingEmail: "",
    billingAddress: "",
    billingZip: "",

    shipping: [],
    shippingFname: "",
    shippingLname: "",
    shippingContact: "",
    shippingEmail: "",
    shippingContact: "",
    shippingAddress: "",
    shippingZip: "",
    defaultBilling: {},
    defaultShipping: {},
  },

  offerDiscount: {
    casbackAmount: 0,
    discountValue: 0,
    shippingFree: false,
  },

  coupon: {
    code: "",
    discountAmount: 0,
  },

  credit: {
    amount: 0,
    creditAmountApply: false,
  },

  formInitialValue: {
    billingType: 'new',
    billingDivision: "",
    billingCity: "",
    billingArea: "",
    shippingDivision: "",
    shippingCity: "",
    shippingArea: "",
    addressType: null,
    terms: true,

    tran_id: Date.now(),
    paymentType: "cash",
    hasShipping: false,
    creditAmountApply: false,
    coupn: "",
    creditAmmount: 0,
    aditonalInfo: "",
    shippingInfo: {
      addNewShipping: false,
      fName: "",
      lName: "",
      phone: "",
      email: "",
      divisionId: "",
      cityId: "",
      areaId: "",
      address: "",
      zipcode: "",
    },
    billigInfo: {
      addNewBilling: true,
      fName: "",
      lName: "",
      phone: "",
      email: "",
      divisionId: "",
      cityId: "",
      areaId: "",
      address: "",
      zipcode: "",
    },
  },
};

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_CHEOUT:
      return {
        ...state,
        formInitialValue: {
          ...state.formInitialValue,
          billigInfo: {
            ...state.formInitialValue.billigInfo,
            divisionId: action.payload,
          },
        },
      };
    case SET_HAS_SHIPPING:
      return {
        ...state,
        formInitialValue: {
          ...state.formInitialValue,
          hasShipping: action.payload,
        },
      };
    case SET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };
    case SET_DEFAULT_ADDRESS:
      return {
        ...state,
        defaultAddress: {
          ...state.defaultAddress,
          billing: action.payload.billing.billing,
          defaultBilling: action.payload.billing.defaultBilling,
          shipping: action.payload.shipping.shipping,
          defaultShipping: action.payload.shipping.defaultShipping,
          billingAllData: action.payload.billing,
          shippingAlldata: action.payload.shipping,
        },
        formInitialValue: {
          ...state.formInitialValue,
          billingType: 'new',
          billingDivision: action.payload.billing.billingDivision,
          billingCity: action.payload.billing.billingCity,
          billingArea: action.payload.billing.billingArea,

          shippingDivision: action.payload.shipping.shippingDivision,
          shippingCity: action.payload.shipping.shippingCity,
          shippingArea: action.payload.shipping.shippingArea,
          billigInfo: {
            ...state.formInitialValue.billigInfo,
            addNewBilling: action.payload.billing.addNewBilling,
            fName: action.payload.billing.fName,
            lName: action.payload.billing.lName,
            email: action.payload.billing.email,
            phone: action.payload.billing.contact,
            address: action.payload.billing.address,
            zipcode: action.payload.billing.zip,
          },
          shippingInfo: {
            ...state.formInitialValue.shippingInfo,
            fName: action.payload.shipping.fName,
            lName: action.payload.shipping.lName,
            email: action.payload.shipping.email,
            phone: action.payload.shipping.contact,
            address: action.payload.shipping.address,
            zipcode: action.payload.shipping.zip,
          },
        },
      };
    case SET_BILLING_CITY:
      return {
        ...state,
        billingCities: action.payload,
      };
    case SET_BILLING_AREA:
      return {
        ...state,
        billingAreas: action.payload,
      };
    case SET_BILLING_DIVISION_ID:
      return {
        ...state,
        formInitialValue: {
          ...state.formInitialValue,
          billigInfo: {
            ...state.formInitialValue.billigInfo,
            divisionId: action.payload,
          },
        },
      };
    case SET_BILLING_ADDRESS:
      return {
        ...state,
        formInitialValue: {
          ...state.formInitialValue,
          billingDivision: action.payload.billingDivision,
          billingCity: action.payload.billingCity,
          billingArea: action.payload.billingArea,
          billigInfo: {
            ...state.formInitialValue.billigInfo,
            addNewBilling: action.payload.addNewBilling,
            zipcode: action.payload.zipcode,
            address: action.payload.address,
          },
        },
      };
    case SET_SHIPPING_CITY:
      return {
        ...state,
        shippingCities: action.payload,
      };
    case SET_SHIPPING_AREA:
      return {
        ...state,
        shippingAreas: action.payload,
      };
    case SET_SHIPPING_ADDRESS:
      return {
        ...state,
        formInitialValue: {
          ...state.formInitialValue,
          shippingDivision: action.payload.shippingDivision,
          shippingCity: action.payload.shippingCity,
          shippingArea: action.payload.shippingArea,
          shippingInfo: {
            ...state.formInitialValue.shippingInfo,
            addNewShipping: action.payload.addNewShipping,
            zipcode: action.payload.zipcode,
            address: action.payload.address,
            fName: action.payload.first_name,
            lName: action.payload.last_name,
            email: action.payload.email,
            phone: action.payload.phone,
          },
        },
      };
    case SET_FORM_INITIAL_VLAUE_NULL:
      return {
        ...state,
        formInitialValue: action.payload.formInitialValue,
        defaultAddress: action.payload.defaultAddress,
      };
    case SET_COUPON:
      return {
        ...state,
        coupon: action.payload,
      };
    case SET_CREDIT:
      return {
        ...state,
        formInitialValue: {
          ...state.formInitialValue,
          creditAmountApply: action.payload.creditAmountApply,
          creditAmmount: action.payload.amount,
        },
        credit: action.payload,
      };
    case SET_OFFER_DISCOUNT:
      return {
        ...state,
        offerDiscount: action.payload,
      };
    case SET_SHIPPING_CHARGE:
      return {
        ...state,
        shippingCharge: action.payload,
      };
    default:
      return state;
  }
};

export default checkoutReducer;
