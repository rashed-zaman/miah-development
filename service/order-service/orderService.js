import axios from "axios";
import { BASE_URL } from "../serviceConfig";

export const stockStatus = async (body) => {
  try {
    const response = await axios.post(BASE_URL + "productStockChk", body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createItem = (
  product,
  sku,
  selectedVariation,
  size,
  cutFabQty,
  cutFabricDescription,
  itemQty
) => {
  let item = {};

  item.id = sku.sku;
  item.proID = product.id;
  item.category_id = product.category_id;
  item.name = product.name;
  item.weight = parseFloat(product.weight);
  item.image = selectedVariation.vImage[0].img;
  item.skuId = sku.id;
  item.cutDescription = cutFabricDescription;
  item.unitPrice = parseFloat(product.sales_cost);
  item.qty = product.category_id === 7 ? cutFabQty : itemQty;
  item.size = size && size;
  item.amount = parseFloat(product.sales_cost);
  item.stock = false;

  // data layer purpose
  item.slug = product.slug
  item.category = product.category;
  item.brand = product.brand;
  item.variant = selectedVariation.color;

  return item;
};
