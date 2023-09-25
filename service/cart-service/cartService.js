import commonService from "../menu/commonService";


export const sendtCartToSave = (cart, userToken) => {
    if (userToken) {
        commonService.postAuthData("cartLog", cart, userToken).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
}


export const saveUserCart = (cart, localShoppingBag) => {
    const combinedCart = [...cart, ...localShoppingBag]
    const uniq = Object.values(combinedCart.reduce((result, obj) => {
      if (!result[obj.id] ) {
        result[obj.id] = { ...obj };
      } else {
        result[obj.id].qty += parseInt(obj.qty);
      }
      return result;
    }, {}));
  
    return uniq
}