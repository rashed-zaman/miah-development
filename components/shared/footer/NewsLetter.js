import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import commonService from "../../../service/menu/commonService";
import { axiosCredential } from "../../../service/serviceConfig";

const initialValues = {
  email: "",
};

export default function NewsLetter() {
  const [mesage, setMesage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (values, { resetForm }) => {
    setLoading(true);
    setMesage("");

    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      commonService
        .postData("emailSubscription", values)
        .then((res) => {
          console.log(res.data.data.msg);
          if (res.data.status) {
            resetForm();
            setLoading(false);
            setMesage(res.data.data.msg);
          } else {
            resetForm();
            setLoading(false);
            setMesage(res.data.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <div className="col-12 col-md-5 col-lg-4">
      <div className="ps-footer--newsletter">
        <h5 className="ps-footer__title text-center">Join our newsletter</h5>
        <Formik initialValues={{ ...initialValues }} onSubmit={onSubmit}>
          <Form>
            <div className="ps-form--newsletter">
              <div className="input-group">
                <Field
                  className="form-control ps-input text-center"
                  type="email"
                  required
                  name="email"
                  placeholder="Your e-mail address"
                />

                {loading ? (
                  <button className="ps-btn ps-btn--danger ps-btn--rounded">
                    Processing
                  </button>
                ) : (
                  <button
                    className="ps-btn ps-btn--danger ps-btn--rounded"
                    type="submit"
                  >
                    Subscribe
                  </button>
                )}
                <div className="text-light mt-2">{mesage}</div>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
