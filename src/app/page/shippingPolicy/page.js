import commonService from "@/service/menu/commonService";
import Canonical from "@/components/cnonical/Canonical";

/**
 * Server-side metadata for SEO
 */
export async function generateMetadata() {
  let res = {};
  try {
    res = await commonService.getData("page/shippingPolicy");
  } catch (err) {
    console.error(err);
  }

  return {
    title: res.title || "Shipping & Delivery - Fast & Reliable | MIAH",
    description:
      res.meta_description ||
      "Learn more about shipping and delivery at MIAH. Enjoy fast, reliable delivery for all your favorite fashion purchases across Bangladesh.",
    keywords: res.keywords || ["shipping", "delivery", "MIAH"],
    alternates: {
      canonical: "/shipping-policy",
    },
    openGraph: {
      title: res.title || "Shipping & Delivery - Fast & Reliable | MIAH",
      description:
        res.meta_description ||
        "Learn more about shipping and delivery at MIAH. Enjoy fast, reliable delivery for all your favorite fashion purchases across Bangladesh.",
      url: "https://example.com/shipping-policy",
    },
  };
}

/**
 * Server-side component to render content
 */
export default async function ShippingPolicyPage() {
  let data = { title: "", body: "" };

  try {
    data = await commonService.getData("page/shippingPolicy");
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      {/* Server-side canonical */}
      <Canonical path="/shipping-policy" />

      <div className="container pt-5">
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
      </div>
    </>
  );
}
