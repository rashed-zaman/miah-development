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
      <div className="ps-footer--newsletter  text-center">
        <span className="ps-footer__title text-center">Subscribe for Exclusive Offers!</span>
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
      <div className="ps-footer--widget">
        <ul className="ps-footer__list" style={{marginTop:'20px'}}>
            <li className="text-center">
              <span className="text-light text-center">Follow us on:</span>
            </li>
        </ul>
      </div>
      <div className="ps-footer--addres">
        <ul className="ps-social text-center">
          <li>
            <a
              className="ps-social__link facebook"
              href="https://www.facebook.com/MiahAndMiah/"
            >
              <i className="fa fa-facebook"> </i>
              <span className="ps-tooltip">Facebook</span>
            </a>
          </li>
          <li>
            <a
              className="ps-social__link instagram"
              href="https://www.instagram.com/miahandmiah/"
            >
              <i className="fa fa-instagram"></i>
              <span className="ps-tooltip">Instagram</span>
            </a>
          </li>
          <li>
            <a
              className="ps-social__link youtube"
              href="https://www.youtube.com/miahandmiah"
            >
              <i className="fa fa-youtube-play"></i>
              <span className="ps-tooltip">Youtube</span>
            </a>
          </li>
          <li>
            <a
              className="ps-social__link pinterest"
              href="https://www.pinterest.com/miahandmiah/"
            >
              <i className="fa fa-pinterest-p"></i>
              <span className="ps-tooltip">Pinterest</span>
            </a>
          </li>
          <li>
            <a
              className="ps-social__link linkedin"
              href="https://www.linkedin.com/company/miahandmiah/"
            >
              <i className="fa fa-linkedin"></i>
              <span className="ps-tooltip">Linkedin</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
