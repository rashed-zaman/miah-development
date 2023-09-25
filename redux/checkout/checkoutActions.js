import commonService from "../../service/menu/commonService";
import {
  SET_BILLING_ADDRESS,
  SET_BILLING_AREA,
  SET_BILLING_CITY,
  SET_DEFAULT_ADDRESS,
  SET_HAS_SHIPPING,
  SET_LOCATIONS,
  SET_SHIPPING_ADDRESS,
  SET_SHIPPING_AREA,
  SET_SHIPPING_CITY,
  TEST_CHEOUT,
  SET_BILLING_DIVISION_ID,
  SET_FORM_INITIAL_VLAUE_NULL,
  SET_COUPON,
  SET_CREDIT,
  SET_OFFER_DISCOUNT,
  SET_SHIPPING_CHARGE,
} from "./checkoutTypes";

const initVal = {
  id: 10075543,
  billing_address: "Add New",
  billing_region_id: 2,
  billing_city_id: 59,
  billing_area_id: 1260,
  billing_zip_code: '',
  status: 0,
};

const shipptininitVal = {
  id: 10075555,
  shipping_address: "Add New",
  shipping_region_id: 2,
  shipping_city_id: 59,
  shipping_area_id: 1260,
  shipping_zip_code: '',
  status: 0,
};

export const setLocations = (locations) => {
  return {
    type: SET_LOCATIONS,
    payload: locations,
  };
};
export const testCheckout = (name) => {
  return {
    type: TEST_CHEOUT,
    payload: name,
  };
};

export const fetchLocations = () => {
  return (dispatch) => {
    commonService
      .getData("allLocation")
      .then((res) => {
        const menu = res;
        if (menu.length > 0) {
          dispatch(setLocations(menu));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const setDefaultAddress = (locations) => {
  return {
    type: SET_DEFAULT_ADDRESS,
    payload: locations,
  };
};

export const fetchDefaultAddress = (token) => {
  return (dispatch, getState) => {
    const state = getState();
    const userInfo = state.auth.userInfo;
    commonService
      .authGetData("getBillingShipping", token)
      .then((res) => {
        if (res.data) {
          let addressData = {
            billing: {
              billing: [],
              defaultBilling: "",
              billingDivision: "",
              billingCity: "",
              billingArea: "",
              fName: "",
              lName: "",
              contact: "",
              email: "",
              address: "",
              zip: "",
            },
            shipping: {
              shipping: [],
              defaultShipping: "",
              shippingDivision: "",
              shippingArea: "",
              shippingCity: "",
              fName: "",
              lName: "",
              contact: "",
              email: "",
              address: "",
              zip: "",
            },
          };
          let billing = res.data.billing;
          let shipping = res.data.shipping;

          billing.push(initVal);
          shipping.push(shipptininitVal);

          addressData.billing.billing = billing;
          addressData.shipping.shipping = shipping;

          const defaultBilling = billing.find((item) => parseInt(item.status) === 1);
          const defaultShipping = shipping.find((item) => parseInt(item.status) === 1);


          if (defaultBilling) {
            addressData.billing.defaultBilling = defaultBilling;

            const billingDivision = state.checkout.locations.find(
              (item) => item.id === defaultBilling.billing_region_id
            );
            const billingCity = billingDivision?.city?.find(
              (item) => item.id === defaultBilling.billing_city_id
            );
            const billingArea = billingCity.area.find(
              (item) => item.id === defaultBilling.billing_area_id
            );

            addressData.billing.billingDivision = billingDivision;
            addressData.billing.billingCity = billingCity;
            addressData.billing.billingArea = billingArea;

            addressData.billing.addNewBilling = false;
            addressData.billing.fName = userInfo.first_name;
            addressData.billing.lName = userInfo.last_name;
            addressData.billing.contact = userInfo.phone;
            addressData.billing.email = userInfo.email;
            addressData.billing.address = defaultBilling.billing_address;
            addressData.billing.zip = defaultBilling.billing_zip_code;
          } else {
            addressData.billing.addNewBilling = true;
            addressData.billing.fName = userInfo.first_name;
            addressData.billing.lName = userInfo.last_name;
            addressData.billing.contact = userInfo.phone;
            addressData.billing.email = userInfo.email;
          }

          if (defaultShipping) {
            addressData.shipping.defaultShipping = defaultShipping;

            const shippingDivision = state.checkout.locations.find(
              (item) => item.id === defaultShipping.shipping_region_id
            );
            const shippingCity = shippingDivision.city.find(
              (item) => item.id === defaultShipping.shipping_city_id
            );
            const shippingArea = shippingCity.area.find(
              (item) => item.id === defaultShipping.shipping_area_id
            );

            addressData.shipping.shippingDivision = shippingDivision;
            addressData.shipping.shippingCity = shippingCity;
            addressData.shipping.shippingArea = shippingArea;

            addressData.shipping.fName = defaultShipping.first_name;
            addressData.shipping.lName = defaultShipping.last_name;
            addressData.shipping.contact = defaultShipping.contact;
            addressData.shipping.email = defaultShipping.email;
            addressData.shipping.address = defaultShipping.shipping_address;
            addressData.shipping.zip = defaultShipping.shipping_zip_code;
          }
          dispatch(setDefaultAddress(addressData));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// ======================= set shipping city, area, address... ===========================
export const setBillingCity = (city) => {
  return {
    type: SET_BILLING_CITY,
    payload: city,
  };
};

export const setHasShippingAction = (value) => {
  return {
    type: SET_HAS_SHIPPING,
    payload: value,
  };
};

export const getBillingCity = (city) => {
  return (dispatch) => {
    dispatch(setBillingCity(city));
  };
};

export const setBillingArea = (area) => {
  return {
    type: SET_BILLING_AREA,
    payload: area,
  };
};

export const setBillingAddress = (address) => {
  return {
    type: SET_BILLING_ADDRESS,
    payload: address,
  };
};

export const getBillingAddress = (address) => {
  return (dispatch, getState) => {
    const state = getState();
    const billingDivision = state.checkout.locations.find(
      (item) => item.id === address.billing_region_id
    );
    const billingCity = billingDivision.city.find(
      (item) => item.id === address.billing_city_id
    );
    const billingArea = billingCity.area.find(
      (item) => item.id === address.billing_area_id
    );
    let data = {
      billingDivision: billingDivision,
      billingCity: billingCity,
      billingArea: billingArea,
      address: address.billing_address,
      zipcode: address.billing_zip_code,
      addNewBilling: address.billing_address == 'Add New' ? true : false,
    };
    dispatch(setBillingAddress(data));
  };
};

// ======================= set shipping city, area, address... ===========================

export const setShippingCity = (city) => {
  return {
    type: SET_SHIPPING_CITY,
    payload: city,
  };
};

export const setShippingArea = (area) => {
  return {
    type: SET_SHIPPING_AREA,
    payload: area,
  };
};

export const getShippingAddress = (address) => {
  return (dispatch, getState) => {
    const state = getState();
    const shippingDivision = state.checkout.locations.find(
      (item) => item.id === address.shipping_region_id
    );
    const shippingCity = shippingDivision.city.find(
      (item) => item.id === address.shipping_city_id
    );
    const shippingArea = shippingCity.area.find(
      (item) => item.id === address.shipping_area_id
    );
    let data = {
      shippingDivision: shippingDivision,
      shippingCity: shippingCity,
      shippingArea: shippingArea,
      first_name:address.first_name ? address.first_name : '',
      last_name:address.last_name ? address.last_name : '',
      address: address.shipping_address === 'Add New' ? '' : address.shipping_address,
      zipcode: address.shipping_zip_code ? address.shipping_zip_code : '',
      email: address.email ? address.email : '',
      phone: address.contact ? address.contact : '',
      addNewShipping: address.shipping_address === 'Add New' ? true: false,
    };
    // console.log({address, data});
    dispatch(setShippingAddress(data));
  };
};

export const setShippingAddress = (address) => {
  return {
    type: SET_SHIPPING_ADDRESS,
    payload: address,
  };
};

export const setFormInitailValueNull = (data) => {
  return {
    type: SET_FORM_INITIAL_VLAUE_NULL,
    payload: data,
  };
};

export const setCoupon = (data) => {
  return {
    type: SET_COUPON,
    payload: data,
  };
};

export const setCredit = (data) => {
  return {
    type: SET_CREDIT,
    payload: data,
  };
};

export const setOfferDiscount = (data) => {
  return {
    type: SET_OFFER_DISCOUNT,
    payload: data,
  };
};

export const setShippingChrage = (data) => {
  return {
    type: SET_SHIPPING_CHARGE,
    payload: data,
  };
};
