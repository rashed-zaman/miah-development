import React, { useState, useEffect } from "react";
import commonService from "../../service/menu/commonService";
import Canonical from "../../components/cnonical/Canonical";
import StaticHeader from "../../components/shared/header/StaticHeader";

export default function ReturnExchange() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    commonService
      .getData("page/returnExchange")
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
        title="Return & Exchange - Hassle-Free Process | MIAH"
        des="Explore MIAH's easy Return & Exchange options. Shop with confidence, knowing you can quickly return or exchange items for a hassle-free experience."
      />
      <div className="container pt-5">
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
}
