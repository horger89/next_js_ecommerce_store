import React from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineUser } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "@/context/StateContext";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { data: session } = useSession();

  const login = (
    <div className="auth">
      
        <button type="button" className="logout-icon" onClick={()=> signIn()}>
          Login
        </button>
     
    </div>
  );

  const profile = (
    <Link href="/profile/">
      <button type="button" className="cart-icon">
        <AiOutlineUser />
      </button>
    </Link>
  );

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Portfolio Store</Link>
      </p>

      <div>
        {session ? profile : login}

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
