# 🐛 Formik Debugging Quick Reference Card

## Fast Facts About Your Form

| Aspect | Details |
|--------|---------|
| **Framework** | Formik + Yup |
| **Form Type** | Checkout (Billing + Shipping) |
| **Nested Fields** | billigInfo, shippingInfo, billing/shipping location dropdowns |
| **Conditional Validation** | shippingInfo only validates if `hasShipping = true` |
| **Phone Regex** | Must be exactly 11 digits: `/^[0-9]{11}$/` |
| **Debug Panel** | Bottom-right floating panel (enabled by default) |

---

## Console Commands Reference

### 🔍 Common Console Commands (Paste in DevTools)

```javascript
// 1. Find all form validation errors
console.log(document.querySelector('form')?.errors);

// 2. Get all form field values
const form = document.querySelector('[role="form"]');
console.log(form);

// 3. Test phone validation
const phoneRegex = /^[0-9]{11}$/;
console.log("Valid:", phoneRegex.test("01712345678")); // true
console.log("Invalid:", phoneRegex.test("123")); // false

// 4. Check Formik state (when using debug panel)
// Look at the browser console output from the debug panel button

// 5. Disable debug mode temporarily
// In console: window.debugMode = false; (if exposed globally)

// 6. Watch form submission in network tab
// Open DevTools > Network > Fill form > Submit > Watch API call
```

---

## 3 Ways to Spot the Problem

### **Problem: Field not validating**
```
Step 1: Open Debug Panel (bottom-right)
Step 2: Check "Validation Errors" section
Step 3: Look for your field name in errors
Step 4: Check if it matches schema definition
```

### **Problem: Form submits when invalid**
```
Step 1: Open Debug Panel
Step 2: Check "Form Status" section
Step 3: Verify "Valid: ✓" (green) shows
Step 4: If "Valid: ✗" (red), form shouldn't submit
Step 5: Check onSubmit handler for validation
```

### **Problem: Value not changing**
```
Step 1: Open Debug Panel
Step 2: Type in a field
Step 3: Watch "Form Values" section
Step 4: If not updating:
   - Field might not be connected to Formik
   - Check field name prop matches schema
   - Verify onChange handler
```

---

## The 4 Critical Validation Points

### 1️⃣ Schema Creation (happens in useEffect)
```javascript
// File: CheckOut.js
useEffect(() => {
  createValidationSchema(); // Recreated when hasShipping changes
}, [hasShipping]);
```
**Debug:** Check browser console for schema creation logs

### 2️⃣ Schema Validation (Yup)
```javascript
const schema = Yup.object().shape({
  billigInfo: Yup.object().shape({
    phone: Yup.string()
      .required("Required")
      .matches(/^[0-9]{11}$/, "Must be exactly 11 digits"),
    // ... more fields
  }),
});
```
**Debug:** Test in console: `schema.validate({...})`

### 3️⃣ Form Validation (Formik)
```javascript
validate={(values) => {
  // Formik runs this on every change
  // Returns object of errors or empty object
}}
```
**Debug:** Check console logs: "🔍 FORMIK VALIDATE CALLED"

### 4️⃣ Submission (onSubmit handler)
```javascript
onSubmit={(values) => {
  handleOrderSubmit(values); // Only runs if no errors
}}
```
**Debug:** Check console logs: "🐛 [FORM SUBMISSION]"

---

## Validation Flow Diagram

```
User Types ──→ onChange fires ──→ Formik updates values
                                        ↓
                        validate() prop called
                                        ↓
                    validationSchema (Yup) runs
                                        ↓
                        Errors object created
                                        ↓
            Form marked invalid if errors exist
                                        ↓
                    User sees errors in Debug Panel
                                        ↓
            User clicks Submit ──→ onSubmit blocked if errors
                                        ↓
                            onSubmit fires if valid
```

---

## Field Structure in Your Form

```javascript
Form Values = {
  // Location dropdowns
  billingCity: "Dhaka",          // Required
  billingArea: "Gulshan",        // Required
  billingDivision: "Dhaka",      // Required
  
  // Billing information (nested object)
  billigInfo: {                  // Note: typo in variable name
    fName: "John",               // Required
    lName: "Doe",                // Required
    phone: "01712345678",        // Required, 11 digits
    email: "john@example.com",   // Part of billigInfo
    address: "123 Street",       // Required
    zipcode: "1212",             // Required
    addNewBilling: false,        // Set when registering new user
  },
  
  // Shipping info (only if hasShipping = true)
  shippingDivision: "Chittagong",   // Required if hasShipping
  shippingCity: "Chittagong",       // Required if hasShipping
  shippingArea: "Halishahar",       // Required if hasShipping
  
  shippingInfo: {                   // Required if hasShipping
    fName: "Jane",                  // Required if shipping
    lName: "Smith",                 // Required if shipping
    phone: "01712345679",           // Required if shipping, 11 digits
    address: "456 Avenue",          // Required if shipping
    zipcode: "3434",                // Required if shipping
  },
  
  // Other fields
  paymentType: "card",              // 'card' or 'cash'
  hasShipping: false,               // Checkbox state
}
```

---

## Yup Validation Rules Used

| Field | Rule | Error Message |
|-------|------|---------------|
| All divisions/cities/areas | `required()` | "Required" |
| Phone fields | `matches(/^[0-9]{11}$/)` | "Must be exactly 11 digits" |
| Name fields | `required()` | "Required" |
| Address | `required()` | "Required" |
| Zipcode | `required()` | "Required" |

---

## What Each Debug Log Means

```javascript
// When form validates
🔍 FORMIK VALIDATE CALLED
📋 Current Form Values: {...}
// → Validation is running, showing current values

// When user submits
🐛 [FORM SUBMISSION]
{
  formValues: {...},
  hasShipping: true/false,
  shippingCharge: 0,
  userToken: "✓ Exists" or "✗ Missing"
}
// → Form is being submitted, showing all context
```

---

## Disable Debug Mode When Done

```javascript
// In CheckOut.js, find this line:
const [debugMode, setDebugMode] = useState(true);

// Change to:
const [debugMode, setDebugMode] = useState(false);
```

---

## Still Stuck? Checklist

- [ ] Debug Panel shows in bottom-right?
- [ ] Can you see "Form Status" section?
- [ ] Can you see "Validation Errors" section when empty?
- [ ] Do values update when you type?
- [ ] Can you see colored logs in Console (F12)?
- [ ] Do errors appear when field loses focus?
- [ ] Does form prevent submit when errors exist?

If all yes ✓ → Debug setup is working!
If not → Check if FormikDebugPanel is properly imported

---

**TL;DR:** Debug Panel shows everything. Console shows logs. Check both!
