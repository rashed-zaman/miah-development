import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { priceRangeOffset } from "@/service/common-service/commonService";
import { BASE_URL } from "@/service/serviceConfig";
import LayoutProductList from "@/components/shared/layout/LayoutProductList";
import Custom404 from "@/404";

export default async function SubcategoryPage({ params, searchParams }) {
  // Server-side session (App Router)
  const session = await getServerSession(authOptions);

  const { rootCategory, category, subcategory } = await params;

  const search = await searchParams;
  const price = (await search.price) || null;

  //  const priceOffset = priceRangeOffset(searchParams);

  // Build query string safely
  const qs = new URLSearchParams();

  qs.set("subCategoryId", subcategory);
  qs.set("attribute", "");
  qs.set("tags", "");
  qs.set("price", "");
  qs.set("device", "desktop");
  qs.set("color", search?.color ?? "");
  qs.set("fabric", search?.fabric ?? "");
  qs.set("occasion", search?.occasion ?? "");
  qs.set("price", search?.priceRange ?? "");
  qs.set("sizes", search?.size ?? "");
  qs.set("pattern", search?.pattern ?? "");
  qs.set("sorting", search?.order ?? "DESC");
  qs.set("styles", search?.styles ?? "");
  qs.set("bestSelling", search?.bestSelling ?? "");
  qs.set("featured", search?.featured ?? "");
  qs.set("priceOrder", search?.priceOrder ?? "");
  qs.set("page", String(search?.page ?? "1"));

  const token = session?.token ?? session?.accessToken ?? "";
  const headersObj = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Fetch server-side. I recommend fetch with cache:'no-store' for per-request SSR.
  const endpoint = `${BASE_URL}productList?${qs.toString()}`;
  let data;
  try {
    const res = await fetch(endpoint, {
      headers: headersObj,
      cache: "no-store",
    });
    data = await res.json();
  } catch (e) {
    data = { error: true, message: e.message };
    return <Custom404 />;
  }

  return <LayoutProductList data={data} type="rootCategory" />;
}




export async function generateMetadata({ params, searchParams }) {
  // Server-side session (App Router)
  const session = await getServerSession(authOptions);

  const { rootCategory, category, subcategory } = await params;

  const search = await searchParams;
  const price = (await search.price) || null;

  //  const priceOffset = priceRangeOffset(searchParams);

  // Build query string safely
  const qs = new URLSearchParams();

  qs.set("subCategoryId", subcategory);
  qs.set("attribute", "");
  qs.set("tags", "");
  qs.set("price", "");
  qs.set("device", "desktop");
  qs.set("color", search?.color ?? "");
  qs.set("fabric", search?.fabric ?? "");
  qs.set("occasion", search?.occasion ?? "");
  qs.set("price", search?.priceRange ?? "");
  qs.set("sizes", search?.size ?? "");
  qs.set("pattern", search?.pattern ?? "");
  qs.set("sorting", search?.order ?? "DESC");
  qs.set("styles", search?.styles ?? "");
  qs.set("bestSelling", search?.bestSelling ?? "");
  qs.set("featured", search?.featured ?? "");
  qs.set("priceOrder", search?.priceOrder ?? "");
  qs.set("page", String(search?.page ?? "1"));

  const token = session?.token ?? session?.accessToken ?? "";
  const headersObj = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  // Fetch server-side. I recommend fetch with cache:'no-store' for per-request SSR.
  const endpoint = `${BASE_URL}productList?${qs.toString()}`;
  let data;
  try {
    const res = await fetch(endpoint, {
      headers: headersObj,
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

// SubcategoryPage
