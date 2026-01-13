import React, { useState, useEffect } from "react";
import commonService from "../../service/menu/commonService";
import Canonical from "../../components/cnonical/Canonical";
import StaticHeader from "../../components/shared/header/StaticHeader";

export default function Company() {
  // state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // side effects

  useEffect(() => {
    commonService
      .getData("page/company")
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
      <StaticHeader title="About Us - Our Story and Mission | MIAH" des="Learn about MIAH, a leading fashion brand in Bangladesh. Explore our journey, mission, and commitment to premium-quality fashion." />
      <div className="container pt-5">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
}
