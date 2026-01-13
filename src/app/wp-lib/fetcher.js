import axios from "axios";

const WP_API = "https://blog.miah.shop/graphql";

async function fetcher(query, { variables } = {}) {
  // const data = await axios.post(WP_API, JSON.stringify({ query, variables }), {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const res = await fetch(WP_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  return json;
  // return data.data;
}

export default fetcher;
