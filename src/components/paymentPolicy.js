import React, { useState, useEffect } from "react";
import commonService from "../../service/menu/commonService";
import Canonical from "../../components/cnonical/Canonical";
import StaticHeader from "../../components/shared/header/StaticHeader";

export default function PaymentPolicy() {
  // state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // side effects

  useEffect(() => {
    commonService
      .getData("page/paymentPolicy")
      .then((res) => {
        setTitle(res.title);
        setBody(res.body);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Canonical />
      <StaticHeader
        title="Payment Policy | MIAH"
        des="Learn about MIAH's payment policy, including secure payment options/methods and terms. Shop confidently with our easy and safe payment process."
      />
      <div className="container pt-5">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
}
