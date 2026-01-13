import React from "react";
import axios from "axios";
import { getSession } from "next-auth/react";

import { BASE_URL } from "../../service/serviceConfig";
import { priceRangeOffset } from "../../service/common-service/commonService";
import LayoutProductList from "../../components/shared/layout/LayoutProductList";
import Custom404 from "../404";
import HeadComponent from "../../components/shared/formUI/head/HeadComponent";

const Category = ({ data }) => {
  if (data.error) {
    return (
      <div className="no-products-found">
        <Custom404 />
      </div>
    );
  }

  return (
    <>
      <HeadComponent data={data} />
      <LayoutProductList data={data} type="category" />
    </>
  );
};

export default Category;

// Utility function to determine device type
const getDeviceType = (userAgent) =>
  /mobi/i.test(userAgent) ? "mobile" : "desktop";

export async function getServerSideProps(context) {
  try {
    const session = await getSession(context);
    const { params, query, req } = context;
    const { category } = params;
    let getProductBy = "categoryId";

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token || ""}`,
    };

    const priceOffset = priceRangeOffset(context);
    const device = getDeviceType(req.headers["user-agent"]);

    // Fetch menu data
    const buildMenu = await axios
      .get(`${BASE_URL}buildMenu`)
      .then((res) => res.data.data);

    // Extract slugs from the menu data
    const slugs = buildMenu
      .map((item) =>
        item.category.map((cat) =>
          (cat.subcategory || []).map((subcat) => subcat.slug)
        )
      )
      .reduce((acc, val) => acc.concat(...val), []); // Flatten the nested array
    // console.log(slugs);

    // check if slug include

    if (slugs.includes(category)) {
      getProductBy = "subCategoryId";
    }

    // Construct the API URL for product list
    const apiUrl = `${BASE_URL}productList?${getProductBy}=${category}&offset=${priceOffset}&attribute=&tags=&price=&color=${
      query.color || ""
    }&fabric=${query.fabric || ""}&occasion=${query.occasion || ""}&price=${
      query.priceRange || ""
    }&sizes=${query.size || ""}&pattern=${query.pattern || ""}&sorting=${
      query.order || "DESC"
    }&device=${device}&styles=${query.styles || ""}&featured=${
      query.featured || ""
    }&priceOrder=${query.priceOrder || ""}&page=${query.page || 1}`;

    // Fetch product list
    const axiosRes = await axios
      .get(apiUrl, { headers })
      .then((response) => response.data);

    return { props: { data: axiosRes } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: { error: true } } };
  }
}
