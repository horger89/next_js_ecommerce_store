import product from "@/sanity-ecommerce/schemas/product";
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  // new code here
  const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } catch (err) {
        console.error(err);
        return initialValue;
      }
    });

    const setValue = (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (err) {
        console.error(err);
      }
    };
    return [storedValue, setValue];
  };
  // till here

  const [showCart, setShowCart] = useState(false);
  // new code here
  const [cartItemsStored, setCartItemsStored] = useLocalStorage(
    "cartItems",
    []
  );
  // till here
  const [cartItems, setCartItems] = useState([]);
  // new code here
  const [totalPriceStored, setTotalPriceStored] = useLocalStorage(
    "totalPrice",
    0
  );
  // till here
  const [totalPrice, setTotalPrice] = useState(0);
  // new code here
  const [totalQuantitiesStored, setTotalQuantitiesStored] = useLocalStorage(
    "totalQuantities",
    0
  );
  // till here
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const chechProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    // new code here
    setTotalPriceStored(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    // till here
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    // new code here
    setTotalQuantitiesStored(
      (prevTotalQuantities) => prevTotalQuantities + quantity
    );
    // till here

    if (chechProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);
      // new code here
      setCartItemsStored(updatedCartItems);
      // till here
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);
      // new code here
      setCartItemsStored([...cartItems, { ...product }]);
      // till here
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
    setQty(1);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    // new code here
    setTotalPriceStored(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    // till here
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    // new code here
    setTotalQuantitiesStored(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    // till here
    setCartItems(newCartItems);
    // new code here
    setCartItemsStored(newCartItems);
    // till here
  };

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    //const newCartItems = cartItems.filter((item) => item._id !== id);
    const newCartInc = cartItems.map((c) =>
      c._id === id ? { ...c, quantity: foundProduct.quantity + 1 } : c
    );
    const newCartDec = cartItems.map((c) =>
      c._id === id ? { ...c, quantity: foundProduct.quantity - 1 } : c
    );

    console.log(foundProduct);

    if (value === "inc") {
      setCartItems(newCartInc);
      // new code here
      setCartItemsStored(newCartInc);
      // till here
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      // new code here
      setTotalPriceStored(
        (prevTotalPrice) => prevTotalPrice + foundProduct.price
      );
      // till here
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
      // new code here
      setTotalQuantitiesStored(
        (prevTotalQuantities) => prevTotalQuantities + 1
      );
      // till here
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems(newCartDec);
        // new code here
        setCartItemsStored(newCartDec);
        // till here
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        // new code here
        setTotalPriceStored(
          (prevTotalPrice) => prevTotalPrice - foundProduct.price
        );
        // till here
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
        // new code here
        setTotalQuantitiesStored(
          (prevTotalQuantities) => prevTotalQuantities - 1
        );
        // till here
      }
    }
  };

  console.log(cartItemsStored);
  console.log(totalQuantitiesStored);
  console.log(totalPriceStored);

  // new code here
  useEffect(() => {
    setCartItems(cartItemsStored);
    setTotalQuantities(totalQuantitiesStored);
    setTotalPrice(totalPriceStored);
  }, []);
  // till here

  function incQty() {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
