import axios from "axios";
import data from "./testData.json";
require("dotenv").config();

const baseURL = "https://api.yelp.com/v3/";
const API_KEY = process.env.YELP_API_KEY;

const _parseBusiness = (data) => {
  const businesses = data.businesses.map((d) => {
    return {
      id: d.id,
      name: d.name,
      image: d.image_url,
      categories: d.categories,
      price: d.price,
      location: {
        street: d.location.address1,
        city: d.location.city,
        zip: d.location.zip_code,
        country: d.location.country,
        state: d.location.state,
        address: d.location.display_address.join(" "),
      },
    };
  });

  return businesses;
};

export const yelpTEST = async () => {
  // ! ------------------------------------ ! //
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
  // ! ------------------------------------ ! //
  const businesses = _parseBusiness(data);
  return businesses;
};
