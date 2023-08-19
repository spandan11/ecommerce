"use client"

import React, { useState, createContext, useEffect } from "react"
import { useRouter } from "next/navigation";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const router = useRouter();
    useEffect(() => {
        setCartToState();
    }, [])
    const setCartToState = () => {
        setCart(
            localStorage.getItem("cart")
                ? JSON.parse(localStorage.getItem("cart"))
                : []
        )
    }
    const addItemToCart = async ({
        id,
        productname,
        price,
        stock,
        image,
        quantity = 1,
    }) => {
        const item = {
            id,
            productname,
            price,
            stock,
            image,
            quantity,
        };

        const isItemExist = cart?.cartItems?.find(
            (i => i.id === item.id)
        )

        let newCartItems;

        if (isItemExist) {
            newCartItems = cart?.cartItems?.map((i) =>
                i.id === isItemExist.id ? item : i)
        } else {
            newCartItems = [...(cart?.cartItems || []), item]
        }

        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))
        setCartToState();
    }
    const deleteItemFromCart = (pid) => {
        const newCartItems = cart?.cartItems?.filter((i) => i.id !== pid)
        localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }))
        setCartToState();
    }
    return (
        <CartContext.Provider value={{ cart, addItemToCart, deleteItemFromCart }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;