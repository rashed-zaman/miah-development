# Formik Form Structure & Debug Flow

## Your Checkout Form Structure

```
CheckOut Component
│
├── State Management (Redux)
│   ├── INITIAL_FORM_STATE
│   ├── userInfo
│   ├── shoppingBag
│   ├── defaultAddress
│   └── hasShipping
│
├── Local State
│   ├── formState (initial values)
│   ├── schema (validation rules)
│   ├── debugMode ⭐ (controls debug panel)
│   └── other UI states
│
└── Formik Form
    ├── initialValues: {...formState}
    ├── validationSchema: {schema}
    ├── validate: (values) => {} ⭐ Debug logs here
    ├── onSubmit: handleOrderSubmit ⭐ Debug logs here
    │
    ├── Form Fields (nested in <Form>)
    │   ├── Billing Section
    │   │   ├── billingDivision (dropdown)
    │   │   ├── billingCity (dropdown)
    │   │   ├── billingArea (dropdown)
    │   │   └── billigInfo (object)
    │   │       ├── fName
    │   │       ├── lName
    │   │       ├── phone ⭐ (11 digits regex)
    │   │       ├── email
    │   │       ├── address
    │   │       └── zipcode
    │   │
    │   ├── Checkbox: "Ship to different address?"
    │   │   └── Sets hasShipping state
    │   │
    │   ├── Shipping Section (conditional)
    │   │   ├── shippingDivision (dropdown)
    │   │   ├── shippingCity (dropdown)
    │   │   ├── shippingArea (dropdown)
    │   │   └── shippingInfo (object)
    │   │       ├── fName
    │   │       ├── lName
    │   │       ├── phone ⭐ (11 digits regex)
    │   │       ├── address
    │   │       └── zipcode
    │   │
    │   ├── Payment Method Section
    │   └── Submit Button
    │
    └── FormikDebugPanel ⭐
        ├── Form Status (Valid, Dirty, Submitted, Touching)
        ├── Validation Errors
        ├── Form Values
        ├── Touched Fields
        └── Log Button
```

---

## Validation Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER INTERACTION                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    [Type]         [Blur]          [Submit]
        │              │              │
        │              │              │
        ├─→ onChange   ├─→ onBlur     ├─→ handleSubmit
        │    fires      │    fires     │    fires
        │              │              │
        ▼              ▼              ▼
   Formik.          Formik.          Schema
   values           touched          validation
   updated          updated          runs
        │              │              │
        │              │              ├─→ Errors?
        │              │              │
        ├─→ validate()  ├─→ validate()  ├─→ YES: Block submit
        │   hook runs   │   hook runs   │       Show errors
        │              │              │
        ▼              ▼              ▼
   Schema.eval  Schema.eval   onSubmit()
   Yup runs     Yup runs      handler
        │              │       fires if
        │              │       no errors
        ▼              ▼              ▼
   ✅ Check   ✅ Check      handleOrderSubmit()
   errors    errors       → registerUser() OR
        │              │       → submitOrder()
        │              │              │
        ├─→ Show in    ├─→ Show in     └─→ API call
        │   Debug      │   Debug           Backend
        │   Panel      │   Panel
        │              │              │
        ▼              ▼              ▼
   💾 Update  📋 Update      🔗 API
   Form      Form           Response
   Values    State
        │              │
        └──────────────┴────────────────→ Update UI
```

---

## Schema Validation Structure

```
Yup Schema
│
├── billingCity: required() 
│   └─ Error: "Required"
│
├── billingArea: required()
│   └─ Error: "Required"
│
├── billingDivision: required()
│   └─ Error: "Required"
│
├── shippingDivision: conditional (if hasShipping)
│   ├─ If false: notRequired()
│   └─ If true: required()
│
├── shippingCity: conditional (if hasShipping)
│   ├─ If false: notRequired()
│   └─ If true: required()
│
├── shippingArea: conditional (if hasShipping)
│   ├─ If false: notRequired()
│   └─ If true: required()
│
├── billigInfo: object
│   ├─ fName: string().required("Required")
│   ├─ lName: string().required("Required")
│   ├─ phone: string()
│   │   ├─ .required("Required")
│   │   └─ .matches(/^[0-9]{11}$/, "Must be exactly 11 digits")
│   ├─ email: (not in schema, but in object)
│   ├─ address: string().required("Required")
│   └─ zipcode: string().required("Required")
│
└── shippingInfo: conditional object
    ├─ If false: notRequired()
    └─ If true: shape({
        ├─ fName: string().required("Required")
        ├─ lName: string().required("Required")
        ├─ phone: string().required().matches(/^[0-9]{11}$/)
        ├─ address: string().required("Required")
        └─ zipcode: string().required("Required")
      })
```

---

## Debug Panel Component Hierarchy

```
FormikDebugPanel (uses useFormikContext())
│
├── Header
│   ├─ Title: "🐛 Formik Debug Panel"
│   └─ "Log to Console" Button
│
├── Form Status Section
│   ├─ Chip: Valid (✓/✗)
│   ├─ Chip: Dirty (✓/✗)
│   ├─ Chip: Submitted (✓/✗)
│   └─ Chip: Touching (✓/✗)
│
├── Validation Errors Section (if errors exist)
│   └─ Alert with error JSON
│
├── Form Values Section
│   ├─ All current form values
│   ├─ Nested objects shown as JSON
│   └─ Scrollable container
│
└── Touched Fields Section (if any touched)
    ├─ Shows which fields were interacted with
    └─ Scrollable container
```

---

## Debug Logging Points

```
CheckOut.js
│
├── handleOrderSubmit()
│   ├─ DEBUG_LOG("FORM SUBMISSION", {...})
│   ├─ Shows: values, hasShipping, charges, discounts, token status
│   └─ Called when: User clicks submit button
│
├── Formik validate prop
│   ├─ console.log("🔍 FORMIK VALIDATE CALLED")
│   ├─ console.log("📋 Current Form Values:", values)
│   └─ Called when: Any field changes or validates
│
├── createValidationSchema()
│   └─ (Add logs to track schema creation)
│
└── useEffect([hasShipping])
    └─ Recreates schema when hasShipping changes
```

---

## Data Flow: User Input → Validation → Submission

```
INPUT LAYER
    │
    ├─ User types in phone: "01712345678"
    │
INPUT PROCESSING
    │
    ├─ onChange fires
    ├─ Formik.handleChange() called
    ├─ values.billigInfo.phone updated to "01712345678"
    │
VALIDATION LAYER
    │
    ├─ validate() hook called
    │  └─ Returns: {} (no errors)
    │
    ├─ User leaves field (onBlur)
    ├─ Field marked as touched
    │
OUTPUT LAYER
    │
    ├─ Debug Panel updates:
    │  ├─ Form Values: {..., phone: "01712345678", ...}
    │  ├─ Touched Fields: {..., phone: true, ...}
    │  └─ Validation Errors: {} (empty)
    │
    ├─ Console logs: 🔍 validation, 📋 values
    │
    ├─ UI updates to show:
    │  ├─ Field value: "01712345678"
    │  └─ No error message (valid!)
```

---

## How Changes to hasShipping Trigger Re-validation

```
User clicks "Ship to different address?" checkbox
    │
    ▼
handleHasShipping() fires
    │
    ├─ setLocalHasShipping(true)
    └─ dispatch(setHasShipping(true))
    │
    ▼
useEffect([hasShipping]) triggers
    │
    ├─ calls createValidationSchema()
    │
    ▼
New schema created with:
    ├─ shippingDivision: required()
    ├─ shippingCity: required()
    ├─ shippingArea: required()
    └─ shippingInfo: required()
    │
    ▼
setSchema(schema) updates state
    │
    ▼
Formik validationSchema prop updates
    │
    ▼
Validation re-runs on all fields
    │
    ▼
Debug Panel shows new validation status
```

---

## Error Message Flow

```
User leaves phone field empty
    │
    ▼
onBlur fires → touch.billigInfo.phone = true
    │
    ▼
Validation runs:
    Yup schema checks:
    ├─ Is required? → NO VALUE → Fail
    └─ Error: "Required"
    │
    ▼
errors.billigInfo.phone = "Required"
    │
    ▼
Debug Panel shows:
    ❌ Validation Errors
    {
      "billigInfo": {
        "phone": "Required"
      }
    }
    │
    ▼
FormField component shows error in UI:
    ├─ Text color changes to red
    ├─ Helper text displays: "Required"
    └─ Field has error styling
```

---

## Submit Flow with Error

```
User clicks "Place Order"
    │
    ▼
Formik.handleSubmit() called
    │
    ▼
Schema validation runs on ALL fields
    │
    ├─ Phone: 11 digits regex check
    ├─ Names: required check
    ├─ Address: required check
    ├─ etc.
    │
    ▼
Errors object built:
    {
      "billigInfo": {
        "phone": "Must be exactly 11 digits"
      }
    }
    │
    ▼
Has errors? YES
    │
    ├─ onSubmit() NOT called
    ├─ Form stays on page
    ├─ Errors shown in Debug Panel
    ├─ Console logs errors
    └─ User can fix and retry
    │
    ▼
Form Status shows:
    ├─ Valid: ✗ (red)
    ├─ Submitted: ✓ (tried to submit)
    └─ All errors visible
```

---

## Submit Flow WITHOUT Errors

```
All fields valid
    │
    ▼
User clicks "Place Order"
    │
    ▼
Formik.handleSubmit() called
    │
    ▼
Schema validation runs
    │
    ▼
errors = {} (empty)
    │
    ▼
onSubmit(values) called
    ├─ handleOrderSubmit(values)
    │
    ▼
Check userInfo.token:
    ├─ If EXISTS: submitOrder(values, token)
    │   └─ API POST to backend
    │
    └─ If MISSING: registerUser(values)
        └─ API POST to register
    │
    ▼
API Response
    │
    ├─ Success: Order confirmed
    ├─ Failure: Error shown
    │
    ▼
Navigation/Redirect to success page
```

---

## Color Coding in Debug Panel

```
✓ (Green Chip)   = Valid/Passed
✗ (Red Chip)     = Invalid/Failed
⚠️ (Yellow Chip) = Dirty/Changed
ℹ️ (Blue Chip)   = Informational

Error Box        = Red Alert with error JSON
Form Values      = White box with JSON
Touched Fields   = White box with touched JSON
```

---

## Toggle Debug Mode

```
Debug ON (true)
    │
    ├─ Debug Panel visible (fixed position, bottom-right)
    ├─ Console logs displayed with colors
    ├─ Adds ~2% performance overhead
    └─ Used for development/troubleshooting

Debug OFF (false)
    │
    ├─ Debug Panel hidden
    ├─ Console logs suppressed
    ├─ Zero performance overhead
    └─ Used for production
```

---

This diagram shows how all pieces fit together!
