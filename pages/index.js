import React from "react";
import {
  Product,
  FooterBanner,
  HeroBanner,
} from "../components";
import { client } from "../lib/client";
import CategorySearch from "@/components/CategorySearch";

const Home = ({ products, bannerData, categories }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <CategorySearch categories={categories} />

      <div className="products-heading">
        <h2>All Products</h2>
        <p>Products of many variations</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const categoryQuery = '*[_type == "category"]';
  const categories = await client.fetch(categoryQuery);

  return {
    props: { products, bannerData, categories },
  };
};

export default Home;
