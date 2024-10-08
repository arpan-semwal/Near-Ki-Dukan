import React, { createContext, useContext, useState } from 'react';

// Create CartContext
const CartContext = createContext();

// Create CustomerContext
export const CustomerContext = createContext();

// Define custom hooks for using contexts
export const useCart = () => useContext(CartContext);
export const useCustomer = () => useContext(CustomerContext);

// Create CartProvider component
export const CartProvider = ({ children }) => {
  // State values
  const [cartItems, setCartItems] = useState({});
  const [customerName, setCustomerName] = useState('');
  const [shopID, setShopID] = useState('');
  const [shopName, setShopName] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [storeName, setStoreName] = useState('');
  const [userType, setUserType] = useState('customer');
  const [custPhoneNumber, setCustPhoneNumber] = useState('');
  const [shopkeeperPhoneNumber, setShopkeeperPhoneNumber] = useState(''); // Added
  const [name, setName] = useState('');
  const [firstCustomerName, setFirstCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shopPhoneNumber, setShopPhoneNumber] = useState('');
  const [customerPincode, setCustomerPincode] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false
  const [isRegistered, setIsRegistered] = useState(false); 
   

  // Function to add item to cart for a specific customer
  const addToCart = (custPhoneNumber, item, shopkeeperName, shopkeeperPhoneNumber, shopID, type = 'product') => {
    const updatedCartItems = { ...cartItems };
    if (!updatedCartItems[custPhoneNumber]) {
      updatedCartItems[custPhoneNumber] = [];
    }
  
    const existingItemIndex = updatedCartItems[custPhoneNumber].findIndex(cartItem =>
      cartItem.id === item.id && cartItem.shopID === shopID && cartItem.type === type
    );
  
    if (existingItemIndex !== -1) {
      updatedCartItems[custPhoneNumber][existingItemIndex].quantity++;
    } else {
      updatedCartItems[custPhoneNumber].push({
        ...item,
        quantity: 1,
        shopkeeperName, // Ensure this is correctly added
        shopkeeperPhoneNumber,
        shopID,
        type,
      });
    }
  
    setCartItems(updatedCartItems);
  };
  // Function to remove item from cart for a specific customer
  const removeFromCart = (custPhoneNumber, productId) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[custPhoneNumber] = updatedCartItems[custPhoneNumber].filter(item => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  // Function to clear cart for a specific customer
  const clearCart = (custPhoneNumber) => {
    const updatedCartItems = { ...cartItems };
    updatedCartItems[custPhoneNumber] = [];
    setCartItems(updatedCartItems);
  };

  const setGlobalPhoneNumber = (number) => {
    setPhoneNumber(number);
  }

  // Return the provider with context values
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        customerName,
        setCustomerName,
        shopID,
        setShopID,
        shopName,
        setShopName,
        custAddress,
        setCustAddress,
        pincode,
        setPincode,
        state,
        setState,
        city,
        setCity,
        storeName,
        setStoreName,
        userType,
        setUserType,
        custPhoneNumber,
        setCustPhoneNumber,
        shopkeeperPhoneNumber,  // Add this line
        name,
        setName,
        firstCustomerName,
        setFirstCustomerName,
        phoneNumber,
        setPhoneNumber,
        shopPhoneNumber,
        setShopPhoneNumber,
        setGlobalPhoneNumber,
      }}
    >
      <CustomerContext.Provider
        value={{
          customerName,
          setCustomerName,
          shopID,
          setShopID,
          shopName,
          setShopName,
          custAddress,
          setCustAddress,
          pincode,
          setPincode,
          state,
          setState,
          city,
          setCity,
          custPhoneNumber,
          setCustPhoneNumber,
          firstCustomerName,
          setFirstCustomerName,
          phoneNumber,
          setPhoneNumber,
          shopPhoneNumber,
          setShopPhoneNumber,
          customerPincode, // Add customerPincode
          setCustomerPincode, // Add setCustomerPincode function
          isLoggedIn,
          setIsLoggedIn,
          isRegistered,
          setIsRegistered
        }}
      >
        {children}
      </CustomerContext.Provider>
    </CartContext.Provider>
  );
};