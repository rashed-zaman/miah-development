import commonService from "@/service/menu/commonService";
import Canonical from "@/components/cnonical/Canonical";
import FaqAccordion from "@/components/faq/FaqAccordion";

export async function generateMetadata() {
  return {
    title: "FAQs - Your Questions Answered | MIAH",
    description:
      "Find answers to frequently asked questions in FAQs at MIAH. Learn about ordering, shipping, returns and shopping from our collections.",
    keywords: ["faq", "questions", "shipping", "returns", "MIAH"],
    alternates: { canonical: "/faq" },
    openGraph: {
      title: "FAQs - Your Questions Answered | MIAH",
      description:
        "Find answers to frequently asked questions in FAQs at MIAH. Learn about ordering, shipping, returns and shopping from our collections.",
      url: "https://example.com/faq",
    },
  };
}

export default async function FaqPage() {
  let faqs = [];

  try {
    faqs = await commonService.getData("faq");
  } catch (err) {
    console.error(err);
  }

  return (
    <>
      <Canonical path="/faq" />
      <div className="container pt-5 mb-5 pb-5">
        <div className="pl-3">
          <h1>FREQUENTLY ASKED QUESTIONS</h1>
        </div>
        <hr />
        {/* Client-side interactive accordion */}
        <FaqAccordion faqs={faqs} />
      </div>
    </>
  );
}
