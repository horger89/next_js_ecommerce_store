import React from "react";
import { client, urlFor } from "@/lib/client";
import { Product } from "@/components";
import { AiOutlineSearch } from "react-icons/ai";
import Link from "next/link";

const CategoryProducts = ({ products, categories, categoryName }) => {
  return (
    <div>
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
        <h2>Check out our {categoryName.name} category</h2>
        <p>{products.length} Product(s) found in this category</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
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

  const nameQuery = `*[_type == "category" && _id == '${category}'][0]`;
  const categoryName = await client.fetch(nameQuery);

  const categoryQuery = '*[_type == "category"]';
  const categories = await client.fetch(categoryQuery);

  console.log(products);
  console.log(categoryName);

  return {
    props: { products, categories, categoryName },
  };
};

export default CategoryProducts;
