import { useFormikContext } from "formik";

const FormikDebugger = () => {
  const formik = useFormikContext();
  
  useEffect(() => {
    console.log("🔍 Formik render state:", {
      values: formik.values,
      errors: formik.errors,
      isValid: formik.isValid,
      isSubmitting: formik.isSubmitting
    });
  }, [formik.values, formik.errors, formik.isValid, formik.isSubmitting]);
  
  return null;
};

// Then use it like this:
<Formik
  initialValues={{ ...formState }}
  validationSchema={schema}
  enableReinitialize={true}
  onSubmit={(values) => {
    handleOrderSubmit(values);
  }}
>
  <Form>
    <FormikDebugger />
    
    <Grid container spacing={2} sx={{ mb: 12 }}>
      {/* Your form content */}
    </Grid>
  </Form>
</Formik>