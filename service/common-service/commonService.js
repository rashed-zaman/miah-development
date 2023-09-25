import axios from "axios";
import { BASE_URL } from "../serviceConfig";

export const getData = async (api) => {
  try {
    const response = await axios.get(BASE_URL + api);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async (api) => {
  let data = null;
  await axios
    .get(BASE_URL + api)
    .then((res) => {
      data = res.data.data;
    })
    .catch((error) => {
      data = "erro happend";
    });

  return data;
};

export const priceRangeOffset = (option) => {
  let offest = 0;

  if (option.req.url.indexOf("from=") !== -1) {
    // let temp = option.req.url.substring(
    //   option.req.url.indexOf("from=") + 5,
    //   option.req.url.length
    // );
    offest =
      parseInt(option.query.from) === 20 ? 0 : parseInt(option.query.from);
  }
  return (offest-20);

  // let queryObj = {
  //   color: '',
  //   occasion: '',
  //   fabric: ''
  // }

  // if (
  //   option.req.url.indexOf("from=") !== -1 &&
  //   option.req.url.indexOf("filter=") === -1
  // ) {
  //   let temp = option.req.url.substring(
  //     option.req.url.indexOf("from=") + 5,
  //     option.req.url.length
  //   );

  //   offest = temp;
  // }

  // let priceRange = [];

  // if (
  //   option.req.url.indexOf("from=") !== -1 &&
  //   option.req.url.indexOf("strtprice=") === -1
  // ) {
  //   let temp = option.req.url.substring(
  //     option.req.url.indexOf("from=") + 5,
  //     option.req.url.length
  //   );

  //   offest = temp;
  // }

  // if (
  //   option.req.url.indexOf("from=") !== -1 &&
  //   option.req.url.indexOf("strtprice=") !== -1
  // ) {
  //   let temp = option.req.url.substring(
  //     option.req.url.indexOf("from=") + 5,
  //     option.req.url.lastIndexOf("&strtprice")
  //   );

  //   offest = temp;
  // }

  // if (option.req.url.indexOf("strtprice=") !== -1) {
  //   let strtTemp = option.req.url.substring(
  //     option.req.url.indexOf("strtprice=") + 10,
  //     option.req.url.lastIndexOf("&endprice")
  //   );
  //   let endTemp = option.req.url.substring(
  //     option.req.url.indexOf("&endprice=") + 10,
  //     option.req.url.length
  //   );

  //   priceRange = [parseInt(strtTemp), parseInt(endTemp)];
  // }

  // return {
  //   offest,
  //   priceRange,
  // };
};

export const getSiteOptions = async (api) => {
  try {
    const response = await axios.get(BASE_URL + api);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOffset = (router) => {
  let offset = 0;
  if (router.asPath.indexOf("from=") !== -1) {
    offset = parseInt(router.query.from);
  }

  return offset;
};
