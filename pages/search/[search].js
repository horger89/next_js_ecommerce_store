import React from "react";
import { client } from "@/lib/client";
import { Product } from "@/components";
import CategorySearch from "@/components/CategorySearch";

const SearchedProducts = ({
  products,
  categories,
  searchedProducts,
  search,
}) => {
  return (
    <div>
      <CategorySearch categories={categories} />

      <div className="products-heading">
        <h2>Search results for: '{search}'</h2>
        <p>{searchedProducts.length} result(s)</p>
      </div>

      <div className="products-container">
        {searchedProducts?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);

  const categoryQuery = '*[_type == "category"]';
  const categories = await client.fetch(categoryQuery);

  const { search } = ctx.query;

  const searchQuery = `*[_type == "product" && name match '*${search}*']`;
  const searchedProducts = await client.fetch(searchQuery);

  console.log(searchedProducts);

  return {
    props: { products, categories, searchedProducts, search },
  };
};

export default SearchedProducts;
