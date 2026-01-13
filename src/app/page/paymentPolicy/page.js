import React from "react";
import commonService from "@/service/menu/commonService";
import Canonical from "@/components/cnonical/Canonical";

/* ----------------------------------------
   Dynamic Metadata
----------------------------------------- */
export async function generateMetadata() {
  let data = { title: "Payment Policy", body: "" };
  try {
    data = await commonService.getData("page/paymentPolicy");
  } catch (e) {
    console.error("Failed to fetch page data:", e);
  }

  return {
    title: data.title || "Payment Policy | MIAH",
    description:
      "Learn about MIAH's payment policy, including secure payment options/methods and terms. Shop confidently with our easy and safe payment process.",
    openGraph: {
      title: data.title || "Payment Policy | MIAH",
      description:
        "Learn about MIAH's payment policy, including secure payment options/methods and terms. Shop confidently with our easy and safe payment process.",
    },
  };
}

/* ----------------------------------------
   Server Component
----------------------------------------- */
export default async function PaymentPolicy() {
  let data = { title: "", body: "" };
  try {
    data = await commonService.getData("page/paymentPolicy");
  } catch (e) {
    console.error("Failed to fetch page data:", e);
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
