import React, { useState, useEffect } from "react";
import commonService from "../../service/menu/commonService";
import Canonical from "../../components/cnonical/Canonical";
import StaticHeader from "../../components/shared/header/StaticHeader";

export default function ShippingPolicy() {
  // state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // side effects

  useEffect(() => {
    commonService
      .getData("page/shippingPolicy")
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
        title="Shipping & Delivery - Fast & Reliable | MIAH"
        des="Learn more about shipping and delivery at MIAH. Enjoy fast, reliable delivery for all your favorite fashion purchases across Bangladesh."
      />
      <div className="container pt-5">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
}
