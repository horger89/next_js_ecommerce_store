import React from "react";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/router";

const CategorySearch = ({ categories }) => {
  const { searchValue, inputChangeHandler } = useStateContext();

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue != "") {
      router.push(`/search/${searchValue}`);
    }
  };

  return (
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
        <form onSubmit={handleSubmit}>
          <input
            onChange={inputChangeHandler}
            type="text"
            placeholder=" Search.."
            name="search"
          />
          <button type="submit" className="search-icon">
            <AiOutlineSearch />
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default CategorySearch;
