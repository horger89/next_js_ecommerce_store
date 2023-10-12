import React from "react";
import Link from "next/link";
import { useStateContext } from "@/context/StateContext";
import { AiOutlineSearch } from "react-icons/ai";

const CategorySearch = ({ categories }) => {
  const { searchValue, inputChangeHandler } = useStateContext();
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
        <form>
          <input
            onChange={inputChangeHandler}
            type="text"
            placeholder=" Search.."
            name="search"
            required
          />
          <Link href={`/search/${searchValue}`}>
            <button type="submit" className="search-icon">
              <AiOutlineSearch />
            </button>
          </Link>
        </form>
      </div>
      
    </div>
  );
};

export default CategorySearch;
