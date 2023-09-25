import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useSelector } from "react-redux";

export default function useSchema() {
  const hasShipping = useSelector(
    (state) => state.checkout.formInitialValue.hasShipping
  );
  
  const rules = Yup.object().shape({
    billingCity: Yup.object().required("Requird"),
    billingArea: Yup.object().required("Requird"),
    billingDivision: Yup.object().required("Requird"),

    shippingDivision: Yup.object().required("Requird"),
    shippingCity: Yup.object().required("Requird"),
    shippingArea: Yup.object().required("Requird"),

    // terms: Yup.boolean().oneOf([true], "Message").required("Requird"),
    shippingInfo: Yup.object().shape({
      fName: Yup.string().required("Requird"),
      lName: Yup.string().required("Requird"),
      phone: Yup.string().required("Requird").matches(/^[0-9]{11}$/, 'mobile number must be exactly 11 digits'),
      address: Yup.string().required("Requird"),
      zipcode: Yup.string().required("Requird"),
    }),
    billigInfo: Yup.object().shape({
      fName: Yup.string().required("Requird"),
      lName: Yup.string().required("Requird"),
      phone: Yup.string().required("Requird").matches(/^[0-9]{11}$/, 'mobile number must be exactly 11 digits'),
      address: Yup.string().required("Requird"),
      // zipcode: Yup.string().required("Requird"),
    }),
    
  });

  const billingRules = Yup.object().shape({
    billingCity: Yup.object().required("Requird"),
    billingArea: Yup.object().required("Requird"),
    billingDivision: Yup.object().required("Requird"),

    // terms: Yup.boolean().oneOf([true], "Message").required("Requird"),

    billigInfo: Yup.object().shape({
      fName: Yup.string().required("Requird"),
      lName: Yup.string().required("Requird"),
      phone: Yup.string().required("Requird").matches(/^[0-9]{11}$/, 'mobile number must be exactly 11 digits'),
      address: Yup.string().required("Requird"),
      // zipcode: Yup.string().required("Requird"),
    }),
  });

  // state
  const [schema, setSchema] = useState(billingRules);

  useEffect(() => {
    if(hasShipping === true){
      setSchema(rules)
    }
  }, [hasShipping])
  



  return [schema];
}
