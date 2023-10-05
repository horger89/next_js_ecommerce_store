import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";

const Home = ({ products, bannerData, categories }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <div className="dropdown">
          <button className="dropbtn">Categories</button>
          <div className="dropdown-content dropdown-menu-center">
            {categories?.map((category) => (
              <a href="#">{category.name}</a>
            ))}
          </div>
        </div>
        <h2>Best Selling Products</h2>
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
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const categoryQuery = '*[_type == "category"]';
  const categories = await client.fetch(categoryQuery);

  console.log(categories);

  return {
    props: { products, bannerData, categories },
  };
};

export default Home;
