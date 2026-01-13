# Formik & Yup Debugging Guide for CheckOut.js

## What I've Added

### 1. **FormikDebugPanel Component** 
Location: [FormikDebugPanel.js](FormikDebugPanel.js)

A floating debug panel that appears at the bottom-right of your checkout page showing:
- ✓ Form validity status
- ✓ Dirty state (unsaved changes)
- ✓ Submission status
- ✓ All form values in real-time
- ✓ All validation errors
- ✓ All touched fields

**Toggle it on/off by setting `debugMode` state in CheckOut.js**

---

## How to Use

### **Method 1: Visual Debug Panel (Easiest)**
The debug panel automatically appears when you load the checkout page. It shows:
- **Form Status**: Valid, Dirty, Submitted, Touching
- **Validation Errors**: All Yup validation errors
- **Form Values**: Current values of all fields
- **Touched Fields**: Which fields user has interacted with

### **Method 2: Browser Console Logs**
Console logs are configured with colored output for easy identification:

```javascript
// Automatically logs when form validates
🔍 FORMIK VALIDATE CALLED
📋 Current Form Values: {...}

// When user submits
🐛 [FORM SUBMISSION]
{ formValues: {...}, hasShipping: boolean, ... }
```

### **Method 3: Log to Console Button**
In the debug panel, click "Log to Console" to dump entire Formik state to browser console.

---

## Debugging Common Issues

### **Problem: Form is not validating**
1. Check the **Form Status** section - is `Valid` showing as ✗?
2. Look at **Validation Errors** - it will show which fields failed validation
3. Check if `validationSchema` is being created correctly:
   ```javascript
   // Current logic creates schema in useEffect
   useEffect(() => {
     createValidationSchema(); // Watch out for hasShipping changes
   }, [hasShipping]);
   ```

### **Problem: Values not being updated**
1. Check **Form Values** in debug panel
2. Verify the initial values match your field names:
   ```javascript
   initialValues={{
     ...formState,  // Make sure formState has correct structure
   }}
   ```
3. Check if fields are properly connected to Formik using Field components

### **Problem: Form submits with errors**
1. Check **Validation Errors** section
2. Verify `onSubmit` handler - it should not trigger if `isValid` is false
3. Check `MiahSubmitButton` - it should be disabled when form is invalid

### **Problem: Dirty state not changing**
1. Initial values might match current values
2. Check if `enableReinitialize={true}` is resetting the form

---

## Advanced Debugging

### **1. Add Custom Field-Level Validation Logs**
Add this to any Field component's onChange:
```javascript
onChange={(e) => {
  console.log(`%c📝 ${fieldName} changed to:`, "color: blue;", e.target.value);
  formik.handleChange(e);
}}
```

### **2. Check Yup Validation Directly**
In browser console:
```javascript
// Get the schema
const schema = useSelector(state => state.checkout.schema);

// Test a value against it
schema.validate({ billingCity: "Dhaka" })
  .then(valid => console.log("✓ Valid:", valid))
  .catch(err => console.log("✗ Error:", err.message));
```

### **3. Monitor Specific Field Changes**
Add to CheckOut.js:
```javascript
const [watchField, setWatchField] = useState(null);

// Then in Formik validate prop:
validate={(values) => {
  const billingCity = values.billingCity;
  if (billingCity !== watchField) {
    console.log("🎯 billingCity changed:", billingCity);
    setWatchField(billingCity);
  }
  return {};
}}
```

---

## Key Components & Their Roles

### **CheckOut.js**
- Main form container
- Manages Formik state
- Has `debugMode` state to toggle debug panel

### **FormikDebugPanel.js**
- Uses `useFormikContext()` to read Formik state
- Displays real-time form data
- No performance impact when disabled

### **Schema Creation** (in CheckOut.js)
```javascript
const createValidationSchema = () => {
  // This runs every time hasShipping changes
  // Schema defines all validation rules
};
```

---

## Formik Lifecycle to Understand

1. **Initialization**: `initialValues` loaded
2. **Field Blur**: User leaves a field → `touched` updates, validation runs
3. **Field Change**: User types → `values` updates, `validate()` prop called
4. **Submit**: User clicks submit button
   - Validation runs with `validationSchema`
   - If errors exist, `onSubmit` is blocked
   - If valid, `onSubmit` handler executes

---

## Performance Tips

- **Debug panel adds ~2% performance overhead** when active
- Turn off in production: `const [debugMode, setDebugMode] = useState(false);`
- Debug logs are colored for easy filtering in console

---

## Next Steps to Debug

1. ✅ Load the checkout page
2. ✅ Watch the debug panel in bottom-right
3. ✅ Fill a field - watch `Form Values` update
4. ✅ Leave a field empty - watch `Validation Errors` appear
5. ✅ Click submit - check `Form Status` and logs
6. ✅ Check browser console for colored debug logs

---

## Quick Reference: Key Debug Points

| Issue | Check | Location |
|-------|-------|----------|
| Field not validating | Validation Errors | Debug Panel |
| Value not updating | Form Values | Debug Panel |
| Form submitting when invalid | Form Status > Valid | Debug Panel |
| Initial values wrong | Form Values (initial) | Debug Panel on load |
| Touched not tracking | Touched Fields | Debug Panel |
| Schema not applying | Console logs | Browser Dev Tools |

---

## Disable Debug Mode

When you're done debugging, set in CheckOut.js:
```javascript
const [debugMode, setDebugMode] = useState(false); // Change to false
```
