// import store from '../store/store'
export default {
  calculateShipping(area, totalWight) {
    let shippingPrice = 0;
    if (area) {
      if (totalWight < 1000) {
        shippingPrice = area.kg_one;
      } else if (totalWight < 2000) {
        shippingPrice = area.kg_two;
      } else if (totalWight < 3000) {
        shippingPrice = area.kg_three;
      } else if (totalWight > 3000) {
        const extraWeigt = Math.ceil((totalWight - 3000) / 1000);
        const extraShipping = extraWeigt * area.extra_kg;
        shippingPrice = parseFloat(area.kg_three) + parseFloat(extraShipping);
      }
    }
    return shippingPrice;
  },
};
