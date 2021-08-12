import axios from "axios";
import testData from "./testData.json";
require("dotenv").config();

const API_KEY = process.env.YELP_API_KEY;

const _parseBusiness = (data) => {
  const businesses = data.businesses.map((d) => {
    return {
      id: d.id,
      name: d.name,
      image: d.image_url,
      categories: d.categories,
      price: d.price,
      rating: d.rating,
      review_count: d.review_count,
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

export const yelp = async (details) => {
  console.log(details);
  // post parameters
  const { price, distance, limit, location } = details;
  const { lat, long } = location;
  const meters = Math.floor(distance * 1609.344);
  const filter = price.join(", ");
  // post request to yelp api
  const res = await axios.get(
    `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&radius=${meters}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-type": "application/json",
      },
    }
  );
  const data = await res.data;
  return _parseBusiness(data);
};

export const yelpTest = async () => {
  return _parseBusiness(testData);
};
