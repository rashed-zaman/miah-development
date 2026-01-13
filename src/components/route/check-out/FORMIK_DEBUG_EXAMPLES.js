/**
 * Advanced Formik/Yup Debugging Examples
 * Add these to your CheckOut.js to debug specific issues
 */

// ============================
// 1. MONITOR FIELD CHANGES IN REAL-TIME
// ============================
// Add this in the validate prop of Formik:

// validate={(values) => {
//   console.log("%c📊 Formik Field Changes:", "background: #222; color: #bada55; padding: 5px;");
//   console.log("Billing Phone:", values.billigInfo?.phone);
//   console.log("Billing Email:", values.billigInfo?.email);
//   console.log("Has Shipping:", values.hasShipping);
//   console.log("Shipping Phone:", values.shippingInfo?.phone);
//   return {};
// }}


// ============================
// 2. VALIDATE FIELD INDIVIDUALLY IN CONSOLE
// ============================
// Paste this in browser console while on checkout page:

// // Get and test a single field
// const schema = Yup.object().shape({
//   phone: Yup.string()
//     .required("Required")
//     .matches(/^[0-9]{11}$/, "Must be exactly 11 digits"),
// });
//
// const testPhone = "01712345678"; // Replace with test value
// schema.validate({ phone: testPhone })
//   .then(valid => console.log("✓ Phone valid:", valid))
//   .catch(err => console.error("✗ Validation error:", err.message));


// ============================
// 3. CREATE FORMIK STATE LOGGER HOOK
// ============================
// Add this to CheckOut.js to track all Formik state changes:

// const useFormikLogger = (formikRef) => {
//   const prevValuesRef = useRef(null);
//   const prevErrorsRef = useRef(null);
//
//   useEffect(() => {
//     if (!formikRef?.current) return;
//
//     const { values, errors, touched, isValid, dirty } = formikRef.current;
//
//     // Log when values change
//     if (JSON.stringify(values) !== JSON.stringify(prevValuesRef.current)) {
//       console.log("%c📝 Values Changed:", "color: #3498db; font-weight: bold;", values);
//       prevValuesRef.current = values;
//     }
//
//     // Log when errors change
//     if (JSON.stringify(errors) !== JSON.stringify(prevErrorsRef.current)) {
//       console.log("%c❌ Errors Changed:", "color: #e74c3c; font-weight: bold;", errors);
//       prevErrorsRef.current = errors;
//     }
//
//     console.log("%c🔄 Formik State:", "color: #9b59b6;", {
//       isValid,
//       dirty,
//       touched,
//       submitCount: formikRef.current.submitCount,
//     });
//   });
// };
//
// Usage in Formik:
// <Formik
//   innerRef={formikRef}
//   ...
// >


// ============================
// 4. FIELD-LEVEL VALIDATION LOGGING
// ============================
// Add this wrapper for any Field component:

// import { Field } from "formik";
// import DebugField from "./DebugField";
//
// <DebugField
//   name="billigInfo.phone"
//   label="Phone"
//   component={TextField}
// />

// -------- DebugField.js --------
// import { Field } from "formik";
//
// export const DebugField = ({ name, label, component: Component, ...props }) => {
//   return (
//     <Field
//       name={name}
//       validate={(value) => {
//         console.log(`%c🔍 Validating ${name}:`, "color: orange;", value);
//         // Return validation errors
//       }}
//     >
//       {({ field, form, meta }) => (
//         <Component
//           {...field}
//           {...props}
//           label={label}
//           error={meta.touched && meta.error ? true : false}
//           helperText={meta.touched && meta.error}
//           onChange={(e) => {
//             console.log(`%c✏️  ${name} changed to:`, "color: green;", e.target.value);
//             field.onChange(e);
//           }}
//           onBlur={(e) => {
//             console.log(`%c👆 ${name} touched`, "color: blue;");
//             field.onBlur(e);
//           }}
//         />
//       )}
//     </Field>
//   );
// };


// ============================
// 5. ASYNC VALIDATION DEBUGGER
// ============================
// If using async validation, add logging:

// validate={async (values) => {
//   const errors = {};
//   try {
//     // Validate each field
//     console.log("%c⏳ Async validation starting...", "color: #f39c12;");
//
//     // Example: validate phone uniqueness
//     const phoneResponse = await checkPhoneExists(values.billigInfo.phone);
//     if (!phoneResponse.valid) {
//       errors["billigInfo.phone"] = "Phone already registered";
//       console.log("❌ Phone validation failed");
//     }
//
//     console.log("✓ Async validation complete:", errors);
//     return errors;
//   } catch (error) {
//     console.error("💥 Async validation error:", error);
//     return errors;
//   }
// }}


// ============================
// 6. COMPARE INITIAL VS CURRENT VALUES
// ============================
// Add to Formik submit handler:

// onSubmit={(values) => {
//   const initialValues = {...INITIAL_FORM_STATE};
//   const changes = {};
//
//   Object.keys(values).forEach(key => {
//     if (JSON.stringify(values[key]) !== JSON.stringify(initialValues[key])) {
//       changes[key] = {
//         before: initialValues[key],
//         after: values[key]
//       };
//     }
//   });
//
//   console.log("%c🔀 Changes from initial:", "color: #16a085; font-weight: bold;", changes);
//   handleOrderSubmit(values);
// }}


// ============================
// 7. SCHEMA VALIDATION DEBUGGER
// ============================
// Add this to check if schema is correctly built:

// useEffect(() => {
//   if (schema) {
//     console.log("%c✓ Validation Schema Created:", "color: #27ae60; font-weight: bold;");
//     console.log("Schema fields:", Object.keys(schema.fields));
//
//     // Test with sample values
//     const testValues = {
//       billingCity: "Dhaka",
//       billingArea: "Gulshan",
//       billingDivision: "Dhaka",
//       billigInfo: {
//         fName: "John",
//         lName: "Doe",
//         phone: "01712345678",
//         address: "123 Street",
//         zipcode: "1212"
//       }
//     };
//
//     schema.validate(testValues)
//       .then(valid => console.log("✓ Sample values valid:", valid))
//       .catch(err => console.error("✗ Sample values failed:", err.message));
//   }
// }, [schema]);


// ============================
// 8. FORM SUBMISSION FLOW LOGGER
// ============================
// Track the entire submission flow:

// const [submissionLog, setSubmissionLog] = useState([]);
//
// const logSubmissionStep = (step, data) => {
//   const timestamp = new Date().toLocaleTimeString();
//   const logEntry = `[${timestamp}] ${step}`;
//   console.log(`%c${logEntry}`, "color: #8e44ad; font-weight: bold;", data);
//   setSubmissionLog(prev => [...prev, { step, timestamp, data }]);
// };
//
// // In handleOrderSubmit:
// const handleOrderSubmit = (values) => {
//   logSubmissionStep("SUBMISSION_STARTED", values);
//
//   if (!userInfo.token) {
//     logSubmissionStep("USER_NOT_AUTHENTICATED", { hasToken: false });
//     logSubmissionStep("REGISTERING_USER", values.billigInfo);
//     registerUser(values);
//   } else {
//     logSubmissionStep("USER_AUTHENTICATED", { token: userInfo.token });
//     logSubmissionStep("SUBMITTING_ORDER", { 
//       values, 
//       shippingCharge, 
//       hasShipping 
//     });
//     submitOrder(values, userInfo.token, shippingCharge);
//   }
// };


// ============================
// 9. YESNO VALIDATION BYPASS
// ============================
// If you need to skip validation temporarily for testing:

// <Formik
//   validationSchema={schema}
//   validate={(values) => {
//     // Check a flag to bypass validation
//     if (window.__DEBUG_SKIP_VALIDATION) {
//       console.log("⚠️  Validation skipped (DEBUG MODE)");
//       return {};
//     }
//     return {};
//   }}
// >
//
// // In console to enable: window.__DEBUG_SKIP_VALIDATION = true;


// ============================
// 10. NESTED FIELD VALIDATION
// ============================
// Since your form has nested objects (billigInfo, shippingInfo):

// const validateBillingInfo = (billigInfo) => {
//   const errors = {};
//   if (!billigInfo.fName) {
//     errors.fName = "First name required";
//     console.log("❌ billigInfo.fName validation failed");
//   }
//   if (!billigInfo.phone || !/^[0-9]{11}$/.test(billigInfo.phone)) {
//     errors.phone = "Invalid phone (must be 11 digits)";
//     console.log("❌ billigInfo.phone validation failed:", billigInfo.phone);
//   }
//   return errors;
// };
//
// // In Yup schema:
// billigInfo: Yup.object().shape({
//   fName: Yup.string()
//     .required("Required")
//     .test("validate", "Validation failed", function(value) {
//       console.log("Testing fName:", value);
//       return value && value.length > 0;
//     }),
//   phone: Yup.string()
//     .required("Required")
//     .test("phone-format", "Invalid format", function(value) {
//       const isValid = /^[0-9]{11}$/.test(value);
//       if (!isValid) console.log("❌ Invalid phone format:", value);
//       return isValid;
//     }),
// })


// ============================
// USAGE: Copy-paste these examples into your browser console or CheckOut.js
// ============================

