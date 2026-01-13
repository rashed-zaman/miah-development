import dynamic from 'next/dynamic'
import Head from "next/head";
import Blogs from '../components/route/home/blogs/Blogs';
import { ROOT_URL } from '../service/serviceConfig';

const Header = dynamic(() => import("../components/shared/header/Header"))
const Banner = dynamic(() => import("../components/route/home/banner/Banner"))
const Promo = dynamic(() => import("../components/route/home/promo/Promo"))
const Service = dynamic(() => import("../components/route/home/service/Service"))
const Feature = dynamic(() => import("../components/route/home/feature/Feature"))

export default function Home() {

    const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MIAH",
    "url": "https://miah.shop/",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://miah.shop/search?searchBy={search_term}",
      "query-input": "required name=search_term"
    }
  };

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "name": "MIAH",
    "logo": "https://miah.shop/img/web-black-logo.gif",
    "slogan": "Find your next signature look",
    "sameAs": [
      "https://www.facebook.com/MiahAndMiah/",
      "https://www.instagram.com/miahandmiah/",
      "https://www.youtube.com/miahandmiah",
      "https://www.pinterest.com/miahandmiah/",
      "https://www.linkedin.com/company/miahandmiah/"
    ]
  }

  return (
    <>
      <Head>
        <title>MIAH – Traditional & Innovative Fashion Brand in Bangladesh</title>
        <meta name="description" content="MIAH is a trusted fashion brand offering traditional & modern clothing. Shop authentic styles for men, women & kids. Visit us now!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={ROOT_URL} />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {/* Brand Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
        />
        
      </Head>
      <Header />
      <div className="ps-home ps-home--4">
        <Banner />
        {/* <EidBanner/> */}
        <Promo />
      </div>
      <div>
        {/* <Feature /> */}
        {/* <Video /> */}
        {/* <PromoLungi /> */}
        {/* <Post /> */}
        {/* <PromoAbaya /> */}
        <Blogs />
        <Service />
        {/* <Instagram /> */}
      </div>
    </>
  );
}
