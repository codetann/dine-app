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
      url: d.url,
      phone: {
        number: d.phone,
        display: d.display_phone,
      },
      distance: d.distance * 0.000621371192,
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

const fetchData = async (lat, long, radius, limit) => {
  const res = await axios.get(
    `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&radius=${radius}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-type": "application/json",
      },
    }
  );

  return res.data;
};

const get = async (details) => {
  // get parameters
  const { price, distance, limit, location } = details;
  const { lat, long } = location;
  const radius = Math.floor(distance * 1609.344);
  const filter = price.join(", ");
  // get request to yelp api
  const data = await fetchData(lat, long, radius, limit);
  return _parseBusiness(data);
};

const nearby = async (location) => {
  // get parameters
  const limit = 30;
  const { lat, long } = location;
  const radius = Math.floor(25 * 1609.344);
  // get request to yelp api
  const data = await fetchData(lat, long, radius, limit);
  return _parseBusiness(data);
};

const test = async () => {
  return _parseBusiness(testData);
};

export default {
  get,
  nearby,
  test,
};
