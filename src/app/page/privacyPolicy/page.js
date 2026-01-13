import React from "react";
import commonService from "@/service/menu/commonService";
import Canonical from "@/components/cnonical/Canonical";

/* ----------------------------------------
   Dynamic Metadata for SEO
----------------------------------------- */
export async function generateMetadata() {
  let data = { title: "Privacy Policy", body: "" };

  try {
    data = await commonService.getData("page/privacyPolicy");
  } catch (e) {
    console.error("Failed to fetch privacy policy:", e);
  }

  return {
    title: data.title || "Privacy Policy | MIAH",
    description:
      "Read the privacy policy at MIAH to understand how we protect your personal information when you shop for our exclusive fashion collections.",
    openGraph: {
      title: data.title || "Privacy Policy | MIAH",
      description:
        "Read the privacy policy at MIAH to understand how we protect your personal information when you shop for our exclusive fashion collections.",
    },
  };
}

/* ----------------------------------------
   Server Component
----------------------------------------- */
export default async function PrivacyPolicy() {
  let data = { title: "", body: "" };

  try {
    data = await commonService.getData("page/privacyPolicy");
  } catch (e) {
    console.error("Failed to fetch privacy policy:", e);
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
