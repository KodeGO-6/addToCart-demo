import React, { createContext, useState } from 'react'
import useFetchData from '../useFetchData'

export const ShopContext = createContext(null)

const PRODUCTS = localStorage.getItem('PRODUCTS')

const getDefaultCart = () => {
    let cart = {}
    for (let i = 1; i < PRODUCTS.length + 1; i++){
        cart[i] = 0;
    }
    return cart;
}

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const { data, loading, error } = useFetchData('https://fakestoreapi.com/products')

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = data.find((product) => product.id === Number(item));
                totalAmount += cartItems[item] * itemInfo.price
            }
        }
        return totalAmount;
    }

    const addToCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev, [itemId]: prev[itemId] + 1
        }))
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({
            ...prev, [itemId]: 
            prev[itemId] - 1
        }))
    }

    const updateCartItemCount = (newAmount, itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: newAmount
        }))
    }

    const contextValue = { cartItems, addToCart, removeFromCart, updateCartItemCount, getTotalCartAmount }

    // console.log(cartItems)
  return (
    <ShopContext.Provider value={contextValue}>
        {props.children}
    </ShopContext.Provider>
  )
}
