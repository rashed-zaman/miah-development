import commonService from "@/service/menu/commonService";
import Canonical from "@/components/cnonical/Canonical";

/**
 * Server-side metadata for SEO
 */
export async function generateMetadata() {
  let res = {};
  try {
    res = await commonService.getData("page/company");
  } catch (err) {
    console.error(err);
  }

  return {
    title: res.title || "About Us - Our Story and Mission | MIAH",
    description:
      res.meta_description ||
      "Learn about MIAH, a leading fashion brand in Bangladesh. Explore our journey, mission, and commitment to premium-quality fashion.",
    keywords: res.keywords || ["about us", "company", "MIAH", "fashion"],
    alternates: {
      canonical: "/company",
    },
    openGraph: {
      title: res.title || "About Us - Our Story and Mission | MIAH",
      description:
        res.meta_description ||
        "Learn about MIAH, a leading fashion brand in Bangladesh. Explore our journey, mission, and commitment to premium-quality fashion.",
      url: "https://example.com/company",
    },
  };
}

/**
 * Server-side component to render content
 */
export default async function CompanyPage() {
  let data = { title: "", body: "" };

  try {
    data = await commonService.getData("page/company");
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      {/* Server-side canonical */}
      <Canonical path="/company" />

      <div className="container pt-5">
        <h1>{data.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.body }} />
      </div>
    </>
  );
}
