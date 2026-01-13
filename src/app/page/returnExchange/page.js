// app/return-exchange/page.js
import commonService from "@/service/menu/commonService";
import Canonical from "@/components/cnonical/Canonical";

export async function generateMetadata() {
  const res = await commonService.getData("page/returnExchange");

  return {
    title: res.title || "Return & Exchange - MIAH",
    description:
      res.meta_description ||
      "Explore MIAH's easy Return & Exchange options. Shop with confidence.",
    keywords: res.keywords || ["return", "exchange", "MIAH"],
    alternates: {
      canonical: "/return-exchange",
    },
  };
}

export default async function ReturnExchangePage() {
  const data = await commonService.getData("page/returnExchange");

  return (
    <>
      {/* Server-side canonical */}
      <Canonical path="/return-exchange" />

      <div className="container pt-5">
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
      </div>
    </>
  );
}
