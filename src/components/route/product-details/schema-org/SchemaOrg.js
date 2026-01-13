import Head from "next/head";
import React from "react";
import { IMAGE_URL } from "../../../../service/serviceConfig";

export default function SchemaOrg({ selectedVariation, product, resData }) {
  const withoutQuotes = product.sales_info.replace(/<\/?[^>]+(>|$)/g,"");
  const createSchemaData = () => {
    
    return {
        __html: `{
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "${product.name}",
            "sku": "${selectedVariation?.sku}",
            "image": [
                   "${IMAGE_URL + selectedVariation?.vImage[0]?.img}",
                   "${IMAGE_URL + selectedVariation?.vImage[1]?.img}",
                   "${IMAGE_URL + selectedVariation?.vImage[2]?.img}"
                   ],
           "description":"${withoutQuotes.replace(/['"]+/g,'')}",
            "category": "${resData.breadCam.root_category + '>' + resData.breadCam.category + '>' + resData.breadCam.sub_category}",
            "brand": {
                "@type": "Brand",
                "name": "${product.brand}"
              },
              "offers": {
                "@type": "Offer",
                "priceCurrency": "BDT",
                "price": "${[product?.sales_cost]}",
                "itemCondition": "https://schema.org/NewCondition",
                "availability": "https://schema.org/${resData.stockStatus}"
              }
        }`
    }
  }
  return (
    <>
      <Head>
      {/* <meta
          name="description"
          content="Miah-Shop"
          key="desc"
        /> */}
      <meta
          property="og:title"
          content={`${product.name} | MIAH`}
        />
      <meta
          property="og:description"
          content={`${withoutQuotes.replace(/['"]+/g,'')}`}
        />
      <meta
          property="og:url"
          content={`${ "https://miah.shop/product/" + product.slug}`}
        />
      <meta
          property="og:image"
          content={`${IMAGE_URL + selectedVariation?.vImage[0]?.img}`}
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={createSchemaData()}
         key={`productJSON-${product.id}`}
        />
      </Head>
    </>
  );
}
