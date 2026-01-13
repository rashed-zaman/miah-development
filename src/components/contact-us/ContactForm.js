"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import commonService from "../../service/menu/commonService";
import { useState } from "react";
import { axiosCredential } from "../../service/serviceConfig";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  subject: "",
  body: "",
};

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export default function ContactForm() {
  const [mesage, setMesage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (values, { resetForm }) => {
    setLoading(true);
    setMesage("");

    axiosCredential.get("sanctum/csrf-cookie").then((res) => {
      commonService
        .postData("contactUs", values)
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            resetForm();
            setLoading(false);
            setMesage(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });

    console.log(values);
  };
  return (
    <>
      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="ps-form--contact">
            <h2 className="ps-form__title">
              Fill up the form if you have any question
            </h2>
            <div className="row">
              <div className="col-12 col-md-4">
                <div className="ps-form__group">
                  <Field
                    className="form-control ps-form__input"
                    type="text"
                    name="name"
                    placeholder="Name"
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="ps-form__group">
                  <Field
                    className="form-control ps-form__input"
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="ps-form__group">
                  <Field
                    className="form-control ps-form__input"
                    type="email"
                    name="email"
                    placeholder="Your E-mail"
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-12">
                <div className="ps-form__group">
                  <Field
                    className="form-control ps-form__input"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="ps-form__group">
                  <Field
                    className="form-control ps-form__textarea"
                    rows="5"
                    name="body"
                    placeholder="Message"
                  ></Field>
                </div>
              </div>
            </div>
            <div className="text-uppercase">{mesage}</div>
            <div className="ps-form__submit">
              {loading ? (
                <button className="ps-btn ps-btn--rounded ps-product__buy">
                  Processing
                </button>
              ) : (
                <button
                  className="ps-btn ps-btn--rounded ps-product__buy"
                  type="submit"
                >
                  Send message
                </button>
              )}
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}
