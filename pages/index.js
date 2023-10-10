import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";
import { AiOutlineSearch } from "react-icons/ai";
import { useStateContext } from "@/context/StateContext";
import Link from "next/link";

const Home = ({ products, bannerData, categories }) => {
  const { categoryHandler, categoryName } = useStateContext();

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className="category-serach-container">
        <div className="dropdown">
          <button className="dropbtn">Categories</button>
          <div className="dropdown-content dropdown-menu-center">
            <Link legacyBehavior href="/">
              <a>All Products</a>
            </Link>
            {categories?.map((category) => (
              <Link
                legacyBehavior
                key={category._id}
                href={`/category/${category._id}`}
              >
                <a id="link" key={category._id}>
                  {category.name}
                </a>
              </Link>
            ))}
          </div>
        </div>

        <div className="search">
          <form>
            <input type="text" placeholder=" Search.." name="search" />
            <button type="submit" className="search-icon">
              <AiOutlineSearch />
            </button>
          </form>
        </div>
      </div>

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

  //console.log(categories);
  //console.log(products);

  return {
    props: { products, bannerData, categories },
  };
};

export default Home;
