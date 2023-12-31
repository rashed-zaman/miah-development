export const formInitialValue = {
  billingDivision: "",
  billingCity: "",
  billingArea: "",
  shippingDivision: "",
  shippingCity: "",
  shippingArea: "",
  addressType: null,
  terms: false,

  tran_id: Date.now(),
  paymentType: "cash",
  hasShipping: false,
  creditAmountApply: false,
  coupn: '',
  creditAmmount:0,
  aditonalInfo: '',
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
}

export const defaultAddress = {
  billingAllData: {},
  shippingAllData: {},
  billing: [],
  billingFname: '',
  billingLname: '',
  billingContact: '',
  billingEmail: '',
  billingAddress: '',
  billingZip: '',

  shipping: [],
  shippingFname: '',
  shippingLname: '',
  shippingContact: '',
  shippingEmail: '',
  shippingContact: '',
  shippingAddress: '',
  shippingZip: '',
  defaultBilling: {},
  defaultShipping: {},
}