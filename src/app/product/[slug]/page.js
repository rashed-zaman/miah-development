import React from "react";

import { BASE_URL } from "@/service/serviceConfig";
import LayoutSingleProduct from "@/components/shared/layout/LayoutSingleProduct";

export default async function ProductPage({ params }) {
  // ✅ params is sync
  const { slug } = await params;
  const endpoint = `${BASE_URL}productById/${slug}`;

  let data;
  try {
    const res = await fetch(endpoint, {
      headers: {},
      cache: "no-store",
    });
    data = await res.json();
    console.log(data);
  } catch (e) {
    data = { error: true, message: e.message };
  }
  return (
    <LayoutSingleProduct
      responseData={data}
      product={data?.data?.[0] ?? {}}
      variants={data?.data?.[0].variants ?? []}
    />
  );
}

export async function generateMetadata({ params }) {
  // ✅ params is sync
  const { slug } = await params;
  const endpoint = `${BASE_URL}productById/${slug}`;

  let data;
  try {
    const res = await fetch(endpoint, {
      headers: {},
      cache: "no-store",
    });
    data = await res.json();

    const { breadCam } = data || {};
    const { title, description } = breadCam || {};

    return {
      title: title || "Products",
      description: description || "Browse products",
      openGraph: {
        title: title || "Products",
        description: description || "Browse products",
      },
    };
  } catch (e) {
    data = { error: true, message: e.message };
  }
}
