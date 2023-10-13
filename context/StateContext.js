import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
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

  const [showCart, setShowCart] = useState(false);

  const [cartItemsStored, setCartItemsStored] = useLocalStorage(
    "cartItems",
    []
  );

  const [cartItems, setCartItems] = useState([]);

  const [totalPriceStored, setTotalPriceStored] = useLocalStorage(
    "totalPrice",
    0
  );

  const [totalPrice, setTotalPrice] = useState(0);

  const [totalQuantitiesStored, setTotalQuantitiesStored] = useLocalStorage(
    "totalQuantities",
    0
  );

  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    setCartItems(cartItemsStored);
    setTotalQuantities(totalQuantitiesStored);
    setTotalPrice(totalPriceStored);
  }, []);

  const [searchValue, setSearchValue] = useState("");

  const inputChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const chechProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    setTotalPriceStored(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    setTotalQuantitiesStored(
      (prevTotalQuantities) => prevTotalQuantities + quantity
    );

    if (chechProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItems(updatedCartItems);

      setCartItemsStored(updatedCartItems);
    } else {
      product.quantity = quantity;

      setCartItems([...cartItems, { ...product }]);

      setCartItemsStored([...cartItems, { ...product }]);
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

    setTotalPriceStored(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );

    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );

    setTotalQuantitiesStored(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );

    setCartItems(newCartItems);

    setCartItemsStored(newCartItems);
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

      setCartItemsStored(newCartInc);

      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);

      setTotalPriceStored(
        (prevTotalPrice) => prevTotalPrice + foundProduct.price
      );

      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);

      setTotalQuantitiesStored(
        (prevTotalQuantities) => prevTotalQuantities + 1
      );
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems(newCartDec);

        setCartItemsStored(newCartDec);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);

        setTotalPriceStored(
          (prevTotalPrice) => prevTotalPrice - foundProduct.price
        );

        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);

        setTotalQuantitiesStored(
          (prevTotalQuantities) => prevTotalQuantities - 1
        );
      }
    }
  };

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
        searchValue,
        inputChangeHandler,
        setSearchValue,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
