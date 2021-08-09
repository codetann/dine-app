import axios from "axios";
require("dotenv").config();

const baseURL = "https://api.yelp.com/v3/";
const API_KEY = process.env.YELP_API_KEY;
console.log(API_KEY);

const yelp = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-type": "application/json",
  },
  method: "get",
});

export const yelpTEST = async () => {
  const res = await yelp("/businesses/search", {
    params: {
      location: "New York",
      limit: 10,
    },
  });
  // const location = "Seattle";
  // const limit = 10;
  // const res = await axios.get(
  //   `https://api.yelp.com/v3/businesses/search?location=${location}&limit=${limit}`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${API_KEY}`,
  //       "Content-type": "application/json",
  //     },
  //   }
  // );
  const businesses = res.data;
  console.log(res);
  return businesses;
};
