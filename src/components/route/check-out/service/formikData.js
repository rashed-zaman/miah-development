import * as Yup from "yup";
export const CHECKOUT_STATE = 
{
  division: "",
  shippingDivision: "",
  city: "",
  shippingCity: "",
  area: "",
  shippingArea: "",
  billigInfo: {
    addNewBilling: true,
    fName: 'Akram',
    lName: '',
    phone: '',
    email: '',
    divisionId: '',
    cityId: '',
    areaId: '',
    address: '',
    zipcode: '',
  },
  shippingInfo: {
    addNewShipping: false,
    fName: '',
    lName: '',
    phone: '',
    email: '',
    divisionId: '',
    cityId: '',
    areaId: '',
    address: '',
    zipcode: '',
  },
};

export const CHECKOUT_VALIDATION = Yup.object().shape({
  division: Yup.object().required("Requird"),
  shippingDivision: Yup.object().required("Requird"),

  city: Yup.object().required("Requird"),
  shippingCity: Yup.object().required("Requird"),

  area: Yup.object().required("Requird"),
  shippingArea: Yup.object().required("Requird"),

  shippingInfo: Yup.object().shape({
    fName: Yup.string().required("Requird"),
    lName: Yup.string().required("Requird"),
    phone: Yup.string().required("Requird"),
    email: Yup.string().required("Requird"),
    address: Yup.string().required("Requird"),
    zipcode: Yup.string().required("Requird"),
  }),
  billigInfo: Yup.object().shape({
    fName: Yup.string().required("Requird"),
    lName: Yup.string().required("Requird"),
    phone: Yup.string().required("Requird"),
    email: Yup.string().required("Requird"),
    address: Yup.string().required("Requird"),
    zipcode: Yup.string().required("Requird"),
  })
});

export const INITIAL_ADDRESS_TYPE = [
  {
    id: 1,
    name: "New",
  },
  {
    id: 2,
    name: "Selected",
  },
  {
    id: 3,
    name: "New Shipping address"
  }
];

export const SET_STATE_VALUE = () => {
  console.log(CHECKOUT_STATE);
}