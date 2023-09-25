import commonService from "../../../service/menu/commonService";

export const  getDefaultAddress = async (token) => {
  let response = {}
  await commonService
    .authGetData("getBillingShipping", token)
    .then((res) => {
        response = res
    })
    .catch((error) => {
      console.log(error);
    });

    return response
}
