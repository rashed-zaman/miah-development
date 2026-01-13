"use client";

import { usePathname } from "next/navigation";
import { ROOT_URL } from "../../../../service/serviceConfig";

export default function HeadComponent({ data, type }) {
  // In Next 15, usePathname() instead of useRouter().asPath
  const pathname = usePathname();
  const canonicalUrl = `${ROOT_URL}${pathname.split("?")[0]}`;

  const { breadCam } = data || {};
  const { title, description, keywords } = breadCam || {};

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
}
