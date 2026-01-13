// hooks/useBreadcrumbs.js
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { ROOT_URL, IMAGE_URL } from "../service/serviceConfig";

export const useBreadcrumbs = (type, data) => {
  const router = useRouter();
  const currentPath = router.asPath;

  const [breadCrumbs, setBreadCrumbs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [breadCrumbstitle, setBreadCrumbsTitle] = useState("");
  const [structuredData, setStructuredData] = useState({});
  const [collectionStructuredData, setCollectionStructuredData] = useState({});
  const [itemListStructuredData, setItemListStructuredData] = useState({});
  const [productStructuredData, setProductStructuredData] = useState({});

  useEffect(() => {
    if (!data?.breadCam) return;

    let crumbs = [];
    let currentTitle = "";

    const { breadCam, product } = data;
    const { description, title } = breadCam;
    const { data: productList = [] } = product || {};

    switch (type) {
      case "rootCategory":
        currentTitle = breadCam.root_category;
        break;

      case "category":
        crumbs = [
          {
            title: breadCam.root_category,
            slug: `/${breadCam.department_slug}`,
          },
        ];
        currentTitle = breadCam.category;
        break;

      case "subcategory":
        crumbs = [
          {
            title: breadCam.root_category,
            slug: `/${breadCam.department_slug}`,
          },
          {
            title: breadCam.category,
            slug: `/${breadCam.department_slug}/${breadCam.category_slug}`,
          },
        ];
        currentTitle = breadCam.sub_category;
        break;

      case "product":
        crumbs = [
          {
            title: breadCam.root_category,
            slug: `/${breadCam.department_slug}`,
          },
          {
            title: breadCam.category,
            slug: `/${breadCam.department_slug}/${breadCam.category_slug}`,
          },
          {
            title: breadCam.sub_category,
            slug: `/${breadCam.department_slug}/${breadCam.category_slug}/${breadCam.slug}`,
          },
        ];
        break;

      default:
        break;
    }

    setBreadCrumbs(crumbs);
    setTitle(title);
    setDescription(description);
    setBreadCrumbsTitle(currentTitle);

    // Breadcrumb Schema
    if (crumbs.length > 0) {
      const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@id": ROOT_URL + item.slug,
            name: item.title,
          },
        })),
      };
      setStructuredData(schema);
    }

    // CollectionPage Schema
    if (type !== "product") {
      const schema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: currentTitle,
        description: description,
        url: `${ROOT_URL}${currentPath}`
      };
      setCollectionStructuredData(schema);
    }

    // ItemList Schema for Product Listing
    if (type !== "product" && Array.isArray(productList)) {
      const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: productList.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${ROOT_URL}/product/${product.slug}`
        }))
      };
      setItemListStructuredData(itemListSchema);
    }

    // Product Schema
    if (type === "product" && Array.isArray(data?.data) && data.data.length > 0) {
      const productInfo = data.data[0];
      const productUrl = `${ROOT_URL}/product/${productInfo.slug}`;
      const sku = productInfo?.variants?.[0]?.sku || "";
      const images = (productInfo.images || []).map(img => IMAGE_URL + img.img);

      const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productInfo.name,
        "sku": sku,
        "image": images,
        "description": (description || "").trim(),
        "brand": {
          "@type": "Brand",
          "name": productInfo.brand || ""
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "BDT",
          "price": productInfo.sales_cost,
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "url": productUrl
        }
      };

      setProductStructuredData(schema);
    }

  }, [data, type]);

  return {
    breadCrumbs,
    title,
    breadCrumbstitle,
    structuredData,
    collectionStructuredData,
    itemListStructuredData,
    description,
    productStructuredData
  };
};
