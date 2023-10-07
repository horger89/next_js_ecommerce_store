import React from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Portfolio Store</Link>
      </p>

      <div>
        <div className="auth">
          <p className="logout-icon">Logout</p>
        </div>

        <button type="button" className="cart-icon">
          <AiOutlineUser />
        </button>
        <button
          type="button"
          className="cart-icon"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
