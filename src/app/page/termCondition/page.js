import React from "react";
import commonService from "@/service/menu/commonService";
import Canonical from "@/components/cnonical/Canonical";

/* ----------------------------------------
   Dynamic Metadata
----------------------------------------- */
export async function generateMetadata() {
  let data = { title: "Terms & Conditions", body: "" };

  try {
    data = await commonService.getData("page/termCondition");
  } catch (e) {
    console.error("Failed to fetch terms & conditions:", e);
  }

  return {
    title: data.title || "Terms & Conditions | MIAH",
    description:
      "Read the terms & conditions at MIAH to understand shopping policies, including returns, exchanges and guidelines for a smooth shopping experience.",
    openGraph: {
      title: data.title || "Terms & Conditions | MIAH",
      description:
        "Read the terms & conditions at MIAH to understand shopping policies, including returns, exchanges and guidelines for a smooth shopping experience.",
    },
  };
}

/* ----------------------------------------
   Server Component
----------------------------------------- */
export default async function TermCondition() {
  let data = { title: "", body: "" };

  try {
    data = await commonService.getData("page/termCondition");
  } catch (e) {
    console.error("Failed to fetch terms & conditions:", e);
  }

  return (
    <>
      <Canonical />
      <div className="container pt-5">
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
      </div>
    </>
  );
}
