# What You'll See When Debugging

## 🖼️ The Debug Panel (Bottom-Right Corner)

```
┌─────────────────────────────────────────────────┐
│ 🐛 Formik Debug Panel              [Log to Console] │
├─────────────────────────────────────────────────┤
│                                                 │
│ 📊 Form Status                                  │
│ ┌───────────┬──────────┬──────────┬──────────┐ │
│ │ Valid: ✓  │ Dirty: ✗ │ Subm: ✗ │ Touch: ✗ │ │
│ │ (green)   │ (red)    │ (red)   │ (red)    │ │
│ └───────────┴──────────┴──────────┴──────────┘ │
│                                                 │
│ 📝 Form Values                                  │
│ {                                               │
│   billingCity: "Dhaka",                         │
│   billigInfo: {                                 │
│     fName: "John",                              │
│     lName: "Doe",                               │
│     phone: "01712345678",                       │
│     address: "123 Street"                       │
│   }                                             │
│ }                                               │
│                                                 │
│ ❌ Validation Errors                            │
│ (shows only if errors exist)                    │
│                                                 │
│ 👆 Touched Fields                               │
│ (shows only if user touched fields)             │
└─────────────────────────────────────────────────┘
```

---

## 🖥️ Browser Console Output

### When form validates:
```
🔍 FORMIK VALIDATE CALLED
📋 Current Form Values: {
  billingCity: "Dhaka",
  billigInfo: {
    fName: "John",
    lName: "Doe",
    phone: "01712345678",
    ...
  }
}
```

### When user submits:
```
🐛 [FORM SUBMISSION]
{
  formValues: {...all values...},
  hasShipping: false,
  shippingCharge: 0,
  couponDiscount: 0,
  userToken: "✓ Exists"
}
```

---

## 📱 Example: Field Validation Error

### **Scenario:** User leaves phone field empty

**In Debug Panel:**
```
Form Status
[Valid: ✗] [Dirty: ✓] [Subm: ✓] [Touch: ✓]
  (red)    (yellow)   (blue)   (yellow)

❌ Validation Errors
{
  "billigInfo": {
    "phone": "Required"
  }
}

📝 Form Values
{
  billigInfo: {
    phone: "",  ← Empty!
    ...
  }
}

👆 Touched Fields
{
  billigInfo: {
    phone: true  ← User touched this
  }
}
```

**In Browser Console:**
```
🐛 [FORM SUBMISSION]
{
  formValues: {...},
  hasShipping: false,
  userToken: "✓ Exists"
}

❌ Validation Error: billigInfo.phone = "Required"
```

---

## 📱 Example: Invalid Phone Format

### **Scenario:** User enters "123" instead of 11-digit phone

**Phone Regex Rule:** `/^[0-9]{11}$/`

**In Debug Panel:**
```
Form Status
[Valid: ✗] [Dirty: ✓] [Subm: ✗] [Touch: ✓]
  (red)    (yellow)

❌ Validation Errors
{
  "billigInfo": {
    "phone": "Must be exactly 11 digits"
  }
}

📝 Form Values
{
  billigInfo: {
    phone: "123",  ← Too short!
    ...
  }
}
```

**What Happens:**
- Submit button becomes disabled
- User cannot submit form
- Error message shows above field
- Debug panel shows exact error

---

## ✅ Example: Valid Form State

### **Scenario:** All fields filled correctly

**In Debug Panel:**
```
Form Status
[Valid: ✓] [Dirty: ✓] [Subm: ✗] [Touch: ✓]
(green)   (yellow)

❌ Validation Errors
(empty - no errors!)

📝 Form Values
{
  billingDivision: "Dhaka",
  billingCity: "Dhaka",
  billingArea: "Gulshan",
  billigInfo: {
    fName: "John",
    lName: "Doe",
    phone: "01712345678",  ← 11 digits ✓
    email: "john@example.com",
    address: "123 Street",
    zipcode: "1212"
  },
  paymentType: "card"
}

👆 Touched Fields
{
  billingDivision: true,
  billingCity: true,
  billingArea: true,
  billigInfo: {
    fName: true,
    lName: true,
    phone: true,
    email: true,
    address: true,
    zipcode: true
  }
}
```

**What Happens:**
- Submit button becomes enabled (green)
- User can click submit
- "Valid: ✓" shows in green
- Form is ready to submit

---

## 🔄 Example: After User Clicks Submit

**In Debug Panel:**
```
Form Status
[Valid: ✓] [Dirty: ✓] [Subm: ✓] [Touch: ✓]
(green)   (yellow)  (blue)   (yellow)

submitCount: 1
(form has been submitted once)
```

**In Browser Console:**
```
🐛 [FORM SUBMISSION]
{
  formValues: {
    billingDivision: "Dhaka",
    billigInfo: {
      fName: "John",
      lName: "Doe",
      phone: "01712345678",
      ...
    }
  },
  hasShipping: false,
  shippingCharge: 0,
  couponDiscount: 0,
  digitalDiscount: 0,
  userToken: "✓ Exists"
}
```

**Then:**
- `handleOrderSubmit()` is called
- User is authenticated (token exists)
- `submitOrder()` API call is made
- Order is processed

---

## 🚢 Example: Shipping Address Enabled

### **Scenario:** User checks "Ship to different address?"

**Changes in Debug Panel:**
```
BEFORE:
shippingDivision: notRequired (optional)
shippingCity: notRequired (optional)
shippingArea: notRequired (optional)
shippingInfo: notRequired (optional)

AFTER:
shippingDivision: required ← Must fill now!
shippingCity: required ← Must fill now!
shippingArea: required ← Must fill now!
shippingInfo: required ← Must fill now!
  ├─ fName: required
  ├─ lName: required
  ├─ phone: required (11 digits)
  ├─ address: required
  └─ zipcode: required
```

**Form Status Changes:**
```
Before: Valid: ✓ (all shipping fields not required)
After:  Valid: ✗ (new shipping fields required but empty)

User must fill shipping fields to make form valid again!
```

---

## 📊 Debug Panel Color Legend

```
✓ Green  = Valid/Passed/True
✗ Red    = Invalid/Failed/False
⚠️ Yellow = Changed/Dirty/Warning
ℹ️ Blue   = Info/Submitted/Just happened

Examples:
[Valid: ✓]     = Form is valid (GREEN)
[Valid: ✗]     = Form has errors (RED)
[Dirty: ✓]     = User made changes (GREEN)
[Dirty: ✗]     = No changes since load (RED)
[Submitted: ✓] = User clicked submit (BLUE)
[Submitted: ✗] = Never submitted (RED)
```

---

## 🔍 Console Color Legend

```
🐛 Red Bold   = [LABEL] format for main logs
🔍 Blue       = Validation logs
📋 Gray       = Data logs
✓ Green       = Success logs
✗ Red         = Error logs
⚠️ Orange     = Warning logs
```

---

## 📱 Real Phone Validation Examples

```
Valid Phone Numbers (11 digits):
✓ 01712345678
✓ 01814567890
✓ 01912345678

Invalid Phone Numbers:
✗ 123           (too short)
✗ 01712-345678  (has dash)
✗ 017 12345678  (has space)
✗ +88 01712345678 (has prefix)

When you type an invalid phone:
- Debug panel shows: "Must be exactly 11 digits"
- Form Status shows: "Valid: ✗"
- Submit button disabled
```

---

## 🎯 What to Look For

### **Form Is Valid:**
- [Valid: ✓] = GREEN
- Validation Errors = EMPTY
- Submit button = ENABLED
- Can submit form

### **Form Has Errors:**
- [Valid: ✗] = RED
- Validation Errors = LIST OF ERRORS
- Submit button = DISABLED
- Cannot submit form

### **User Interacted:**
- [Touch: ✓] = YELLOW
- Touched Fields = SHOWS WHICH FIELDS
- Errors show up after user leaves field

### **Form Is Dirty:**
- [Dirty: ✓] = YELLOW
- User made changes from initial state
- Form has unsaved changes

---

## 💾 Export to Console

**In Debug Panel, click: "Log to Console"**

Outputs entire Formik object:
```javascript
{
  values: {...all form values...},
  errors: {...all validation errors...},
  touched: {...touched fields...},
  isValid: true/false,
  dirty: true/false,
  isSubmitting: true/false,
  submitCount: number,
  // ...30+ more properties
}
```

**Then in console, copy and test:**
```javascript
// Copy the logged object
// Test validation against it
const formData = {...copied data...};
console.log(formData.isValid);  // true or false
```

---

## 🎊 Summary

When debugging your form:

1. **See something wrong?** → Look at Debug Panel
2. **Need more detail?** → Check Browser Console
3. **Don't understand?** → Read the documentation files
4. **Want to test?** → Copy from FORMIK_DEBUG_EXAMPLES.js

**The Debug Panel shows EVERYTHING happening with your form in real-time!**
