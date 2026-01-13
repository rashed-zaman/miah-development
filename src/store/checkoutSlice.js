import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commonService from "@/service/menu/commonService";

/* ======================================================
   HELPERS (NO LOGIC CHANGE)
====================================================== */

const ADD_NEW_BILLING = {
  id: 10075543,
  billing_address: "Add New",
  billing_region_id: 2,
  billing_city_id: 59,
  billing_area_id: 1260,
  billing_zip_code: "",
  status: 0,
};

const ADD_NEW_SHIPPING = {
  id: 10075555,
  shipping_address: "Add New",
  shipping_region_id: 2,
  shipping_city_id: 59,
  shipping_area_id: 1260,
  shipping_zip_code: "",
  status: 0,
};

const findLocation = (locations, regionId, cityId, areaId) => {
  const division = locations.find(d => d.id === regionId);
  const city = division?.city?.find(c => c.id === cityId);
  const area = city?.area?.find(a => a.id === areaId);
  return { division, city, area };
};

/* ======================================================
   ASYNC THUNKS
====================================================== */

export const fetchLocations = createAsyncThunk(
  "checkout/fetchLocations",
  async (_, { rejectWithValue }) => {
    try {
      return await commonService.getData("allLocation");
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchDefaultAddress = createAsyncThunk(
  "checkout/fetchDefaultAddress",
  async (token, { getState, rejectWithValue }) => {
    try {
      const { checkout, auth } = getState();
      const { locations } = checkout;
      const userInfo = auth.userInfo;

      const res = await commonService.authGetData(
        "getBillingShipping",
        token
      );
      if (!res?.data) return null;

      const billing = [...res.data.billing, ADD_NEW_BILLING];
      const shipping = [...res.data.shipping, ADD_NEW_SHIPPING];

      const defaultBilling = billing.find(i => +i.status === 1);
      const defaultShipping = shipping.find(i => +i.status === 1);

      const buildAddress = (type, def) => {
        if (!def) {
          return {
            addNew: true,
            fName: userInfo.first_name,
            lName: userInfo.last_name,
            contact: userInfo.phone,
            email: userInfo.email,
          };
        }

        const { division, city, area } = findLocation(
          locations,
          def[`${type}_region_id`],
          def[`${type}_city_id`],
          def[`${type}_area_id`]
        );

        return {
          division,
          city,
          area,
          addNew: false,
          fName: userInfo.first_name,
          lName: userInfo.last_name,
          contact: userInfo.phone,
          email: userInfo.email,
          address: def[`${type}_address`],
          zip: def[`${type}_zip_code`],
        };
      };

      return {
        billing,
        shipping,
        defaultBilling,
        defaultShipping,
        billingInfo: buildAddress("billing", defaultBilling),
        shippingInfo: buildAddress("shipping", defaultShipping),
      };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getBillingAddress = createAsyncThunk(
  "checkout/getBillingAddress",
  async (address, { getState, dispatch }) => {
    const { locations } = getState().checkout;

    const { division, city, area } = findLocation(
      locations,
      address.billing_region_id,
      address.billing_city_id,
      address.billing_area_id
    );

    dispatch(
      setBillingAddress({
        billingDivision: division,
        billingCity: city,
        billingArea: area,
        address: address.billing_address,
        zipcode: address.billing_zip_code,
        addNewBilling: address.billing_address === "Add New",
      })
    );
  }
);

export const getShippingAddress = createAsyncThunk(
  "checkout/getShippingAddress",
  async (address, { getState, dispatch }) => {
    const { locations } = getState().checkout;

    const { division, city, area } = findLocation(
      locations,
      address.shipping_region_id,
      address.shipping_city_id,
      address.shipping_area_id
    );

    dispatch(
      setShippingAddress({
        shippingDivision: division,
        shippingCity: city,
        shippingArea: area,
        address:
          address.shipping_address === "Add New"
            ? ""
            : address.shipping_address,
        zipcode: address.shipping_zip_code || "",
        email: address.email || "",
        phone: address.contact || "",
        addNewShipping: address.shipping_address === "Add New",
      })
    );
  }
);

/* ======================================================
   INITIAL STATE (UNCHANGED)
====================================================== */

const initialState = {
  shippingCharge: 0,
  locations: [],
  billingCities: [],
  billingAreas: [],
  shippingCities: [],
  shippingAreas: [],

  defaultAddress: {
    billing: [],
    shipping: [],
    defaultBilling: {},
    defaultShipping: {},
    billingAllData: {},
    shippingAllData: {},
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
    billingType: "new",
    tran_id: Date.now(),
    paymentType: "cash",
    hasShipping: false,
    creditAmountApply: false,
    coupn: "",
    creditAmmount: 0,
    aditonalInfo: "",
    terms: true,

    billingDivision: "",
    billingCity: "",
    billingArea: "",
    shippingDivision: "",
    shippingCity: "",
    shippingArea: "",

    shippingInfo: {
      addNewShipping: false,
      fName: "",
      lName: "",
      phone: "",
      email: "",
      address: "",
      zipcode: "",
    },

    billigInfo: {
      addNewBilling: true,
      fName: "",
      lName: "",
      phone: "",
      email: "",
      address: "",
      zipcode: "",
    },
  },
};

/* ======================================================
   SLICE
====================================================== */

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setHasShipping: (state, action) => {
      state.formInitialValue.hasShipping = action.payload;
    },

    setBillingCity: (state, action) => {
      state.billingCities = action.payload;
    },

    setBillingArea: (state, action) => {
      state.billingAreas = action.payload;
    },

    setShippingCity: (state, action) => {
      state.shippingCities = action.payload;
    },

    setShippingArea: (state, action) => {
      state.shippingAreas = action.payload;
    },

    setBillingAddress: (state, action) => {
      const f = state.formInitialValue;
      const b = f.billigInfo;
      const p = action.payload;

      f.billingDivision = p.billingDivision;
      f.billingCity = p.billingCity;
      f.billingArea = p.billingArea;

      b.address = p.address;
      b.zipcode = p.zipcode;
      b.addNewBilling = p.addNewBilling;
    },

    setShippingAddress: (state, action) => {
      const f = state.formInitialValue;

      f.shippingDivision = action.payload.shippingDivision;
      f.shippingCity = action.payload.shippingCity;
      f.shippingArea = action.payload.shippingArea;

      Object.assign(f.shippingInfo, action.payload);
    },

    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },

    setCredit: (state, action) => {
      state.credit = action.payload;
      state.formInitialValue.creditAmountApply =
        action.payload.creditAmountApply;
      state.formInitialValue.creditAmmount = action.payload.amount;
    },

    setOfferDiscount: (state, action) => {
      state.offerDiscount = action.payload;
    },

    setShippingCharge: (state, action) => {
      state.shippingCharge = action.payload;
    },

    resetForm: (state, action) => {
      state.formInitialValue = action.payload.formInitialValue;
      state.defaultAddress = action.payload.defaultAddress;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations = action.payload || [];
      })
      .addCase(fetchDefaultAddress.fulfilled, (state, action) => {
        if (!action.payload) return;

        const {
          billing,
          shipping,
          defaultBilling,
          defaultShipping,
          billingInfo,
          shippingInfo,
        } = action.payload;

        state.defaultAddress.billing = billing;
        state.defaultAddress.shipping = shipping;
        state.defaultAddress.defaultBilling = defaultBilling;
        state.defaultAddress.defaultShipping = defaultShipping;

        state.defaultAddress.billingAllData = {
          billing,
          defaultBilling,
          ...billingInfo,
        };

        state.defaultAddress.shippingAllData = {
          shipping,
          defaultShipping,
          ...shippingInfo,
        };

        const f = state.formInitialValue;

        f.billingDivision = billingInfo.division;
        f.billingCity = billingInfo.city;
        f.billingArea = billingInfo.area;

        Object.assign(f.billigInfo, {
          addNewBilling: billingInfo.addNew,
          fName: billingInfo.fName || "",
          lName: billingInfo.lName || "",
          phone: billingInfo.contact || "",
          email: billingInfo.email || "",
          address: billingInfo.address || "",
          zipcode: billingInfo.zip || "",
        });

        f.shippingDivision = shippingInfo.division;
        f.shippingCity = shippingInfo.city;
        f.shippingArea = shippingInfo.area;

        Object.assign(f.shippingInfo, {
          addNewShipping: shippingInfo.addNew,
          fName: shippingInfo.fName || "",
          lName: shippingInfo.lName || "",
          phone: shippingInfo.contact || "",
          email: shippingInfo.email || "",
          address: shippingInfo.address || "",
          zipcode: shippingInfo.zip || "",
        });
      });
  },
});

/* ======================================================
   EXPORTS
====================================================== */

export const {
  setHasShipping,
  setBillingCity,
  setBillingArea,
  setShippingCity,
  setShippingArea,
  setBillingAddress,
  setShippingAddress,
  setCoupon,
  setCredit,
  setOfferDiscount,
  setShippingCharge,
  resetForm,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
