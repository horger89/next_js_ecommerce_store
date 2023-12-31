import React from "react";
import { client } from "@/lib/client";
import { Product } from "@/components";
import CategorySearch from "@/components/CategorySearch";

const CategoryProducts = ({
  products,
  categories,
  categoryName,
  allproducts,
}) => {
  return (
    <div>
      <CategorySearch categories={categories} />

      <div className="products-heading">
        <h2>{categoryName.name} category</h2>
        <p>{products.length} Product(s) found in this category</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <div className="maylike-products-wrapper">
        <h2>Popular products</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {allproducts.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[type == "category" ]{
    _id
  }`;
  const categories = await client.fetch(query);
  const paths = categories.map((category) => ({
    params: {
      category: category._id,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { category } }) => {
  const query = `*[_type == "product" && category._ref == '${category}']`;
  const products = await client.fetch(query);

  const allquery = `*[_type == "product" ]`;
  const allproducts = await client.fetch(allquery);

  const nameQuery = `*[_type == "category" && _id == '${category}'][0]`;
  const categoryName = await client.fetch(nameQuery);

  const categoryQuery = '*[_type == "category"]';
  const categories = await client.fetch(categoryQuery);

  return {
    props: { products, categories, categoryName, allproducts },
  };
};

export default CategoryProducts;
