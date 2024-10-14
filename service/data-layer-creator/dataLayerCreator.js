export const singleProductDataLayer = (product) => {
  window.dataLayer?.push({
    event: "'productClick'",
    ecommerce: {
      click: {
        actionField: { list: "Product click" },
        products: [
          {
            item_name: product.name,
            item_id: product.id,
            price: product.sales_cost,
            item_variant: product.color,
          },
        ],
      },
    },
  });
};

export const productDetailsDatalayer = (product, selectedVariation) => {
  window.dataLayer?.push({
    event: "view_item",
    ecommerce: {
      detail: {
        actionField: { list: "Product Gallery" },
        products: [
          {
            item_name: product.name,
            item_id: selectedVariation.sku,
            price: product.sales_cost,
            item_brand: product.brand,
            item_category: product.category,
            item_variant: selectedVariation.color,
            quantity: selectedVariation.inventory,
            // item_list man, lungi, stripe
          },
        ],
      },
    },
  });
};

export const addBagDataLayer = (item) => {
  window.dataLayer?.push({
    event: "add_to_cart",
    ecommerce: {
      currencyCode: "BDT",
      add: {
        products: [
          {
            item_id: item.id,
            item_name: item.name,
            price: item.unitPrice,
            item_brand: item.brand,
            item_category: item.category,
            item_variant: item.variant,
            quantity: item.qty,
          },
        ],
      },
    },
  });
};

export const checkOutDataLayer = (shoppingBag) => {
  let prodList = shoppingBag.map((item) => {
    return {
      item_id: item.id,
      item_name: item.name,
      price: item.unitPrice,
      item_brand: item.brand,
      item_category: item.category,
      item_variant: item.variant,
      quantity: item.qty,
    };
  });

  window.dataLayer?.push({
    event: "begin_checkout",
    ecommerce: {
      checkout: {
        actionField: { step: 1 },
        products: prodList,
      },
    },
  });
};

export const purchaseDataLayer = (
  value,
  shoppingBag,
  shippingCharge,
  siteOptions
) => {
  const prodList = shoppingBag.map((item) => {
    return {
      item_id: item.id,
      item_name: item.name,
      price: item.unitPrice,
      item_brand: item.brand,
      item_category: item.category,
      item_variant: item.variant,
      quantity: item.qty,
    };
  });

  const {fName, lName, phone, email, zipcode, address } = value.billigInfo
  const {name} = value.billingCity

  const revenue = shoppingBag.reduce((a, b) => a + (b.amount || 0), 0);
  const content_ids = shoppingBag.map(item => item.id)
  const tax = (siteOptions.tax * revenue) / 100;

  window.dataLayer?.push({
    event: "purchase",
    ecommerce: {
      purchase: {
        actionField: {
          transaction_id: value.tran_id,
          value: revenue + tax + shippingCharge,
          tax: tax,
          shipping: shippingCharge,
        },
        products: prodList,
        user_data: {
          first_name: fName,
          last_name: lName,
          city: name,
          postal_code: zipcode,
          email_address: email,
          phone_number: phone,
          address: address
        },
        content_ids
      },
    },
  });
};

export const promotionDatalayer = (id, name, slot, location) => {
  dataLayer.push({
    event: "select_promotion",
    ecommerce: {
      promotions: [
        {
          promotion_id: id,
          promotion_name: name,
          creative_slot: slot,
          location_id: location,
        },
      ],
    },
  });
};

export const productListDatalayer = (data, type) => {
  let listName = "";

  if (type === "rootCategory") {
    listName = data.breadCam.root_category;
  } else if (type === "category") {
    listName = data.breadCam.category;
  } else if (type === "subcategory") {
    listName = data.breadCam.sub_category;
  }

  const prodList = data.product.data.map((item) => {
    return {
      item_id: item.id,
      item_name: item.name,
      list:listName,
    };
  });

  dataLayer.push({
    event: "view_item_list",
    ecommerce: {
      products: {
        list:listName,
      },
    },
  });
};

export const refundDataLayer = (id) => {
  window.dataLayer?.push({
    event: "refund",
    ecommerce: {
      refund: {
        actionField: {
          id: id,
        },
      },
    },
  });
};

export const partialrefundDataLayer = (product) => {
  window.dataLayer?.push({
    event: "partialrefund",
    ecommerce: {
      partialrefund: {
        actionField: {
          id:product.sku,
        },
        products: [{
          name: product.product_name,
          price: product.sales_cost,
          qty: product.qty,
          order_id:product.order_id,
        }]
      },
    },
  });
};

export const removecartDataLayer = (item) => {
  window.dataLayer?.push({
    event: "removeFromCart",
    ecommerce: {
      remove: {
        products: [{
          id:item.sku,
          name: item.name,
          price: item.unitPrice,
          brand: item.brand,
          category: item.category_id,
          varient: item.variant,
          dimension: item.size,
          qty: item.qty,
        }]
      },
    },
  });
};


export const wishListDataLayer = (item) => {
  window.dataLayer?.push({
    event: "add_to_cart",
    ecommerce: {
      currencyCode: "BDT",
      add: {
        products: [
          {
            item_id: item.id,
            item_name: item.name,
            price: item.unitPrice,
            item_brand: item.brand,
            item_category: item.category,
            item_variant: item.variant,
            quantity: item.qty,
          },
        ],
      },
    },
  });
};


export const searchDataLayer = (srch) => {
  window.dataLayer?.push({
    event: "search",
    ecommerce: {
      search_term: srch,
    },
  });
};


export const loginDataLayer = () => {
  window.dataLayer?.push({
    event: "login",
    ecommerce: {
      clientType: 'VIP',
    },
  });
};


