"use client"

import React, { useContext, useState } from 'react'
import CartContext from '@/providers/CartProvider';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Cart = () => {
    const { cart, addItemToCart, deleteItemFromCart } = useContext(CartContext);
    const session = useSession();
    const router = useRouter();
    const increaseQuantity = (cartItem) => {
        const newQuantity = cartItem?.quantity + 1
        const item = { ...cartItem, quantity: newQuantity }
        if (newQuantity > Number(cartItem.stock)) return;
        addItemToCart(item)
    }
    const decreaseQuantity = (cartItem) => {
        const newQuantity = cartItem?.quantity - 1
        const item = { ...cartItem, quantity: newQuantity }
        if (newQuantity <= 0) return;
        addItemToCart(item)
    }

    let amountWithoutTax = 0;

    cart?.cartItems?.forEach(item => {
        amountWithoutTax += item.price * item.quantity;
    });

    let taxAmount = 13 / 100 * amountWithoutTax
    let totalAmount = amountWithoutTax + taxAmount

    const removeItem = (id) => {
        deleteItemFromCart(id)
        toast.success("Item removed")
    }

    const OrderProduct = async () => {
        if (session.status == "authenticated") {
            if (session?.data?.user?.role === "user") {
                const orderData = cart.cartItems.map(item => ({
                    id: item.id,
                    productname: item.productname,
                    price: item.price,
                    quantity: item.quantity
                }));
                const res = await fetch('/api/orders', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: session?.data?.user?.email,
                        products: orderData,
                        address: "address",
                        status: "Pending",
                        amount: totalAmount,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const data = await res.json()
                if (data.status == 200) {
                    toast.success("Order Placed Successfully")
                    router?.push("/user/orders")
                    localStorage.clear();
                }
            } else if (session?.data?.user?.role === "admin") {
                toast.error("You are an admin")
            } else {
                toast.error("Something Went Wrong!")
            }
        } else {
            router?.push("/login")
        }
    }
    return (
        <>
            <section className="py-5 sm:py-7 bg-blue-100">
                <div className="container max-w-screen-xl mx-auto px-4">
                    <h2 className="text-2xl font-semibold mb-2">
                        {cart?.cartItems?.length || 0} Item(s) in Cart
                    </h2>
                </div>
            </section>

            {cart?.cartItems?.length > 0 && (
                <section className="py-10">
                    <div className="container max-w-screen-xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <main className="md:w-3/4">
                                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                                    {cart?.cartItems?.map((cartItem, index) => (
                                        <div key={index}>
                                            <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                                                <div className="w-full lg:w-2/5 xl:w-2/4">
                                                    <figure className="flex leading-5">
                                                        <div>
                                                            <div className="block w-auto h-auto rounded border border-gray-200 overflow-hidden">
                                                                <Image src={cartItem.image} alt={cartItem.productname} width={50} height={50} />
                                                            </div>
                                                        </div>
                                                        <figcaption className="ml-3">
                                                            <p>
                                                                <Link href={`/product/${cartItem.id}`} className="hover:text-blue-600">
                                                                    {cartItem.productname}
                                                                </Link>
                                                            </p>
                                                            <p className="mt-1 text-gray-400">
                                                                {" "}
                                                                {/* Category: {cartItem.category} */}
                                                            </p>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                                <div className="w-24">
                                                    <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                                                        <button
                                                            data-action="decrement"
                                                            className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                                            onClick={() => decreaseQuantity(cartItem)}
                                                        >
                                                            <span className="m-auto text-2xl font-thin">
                                                                −
                                                            </span>
                                                        </button>
                                                        <input
                                                            type="number"
                                                            className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                                                            name="custom-input-number"
                                                            value={cartItem.quantity}
                                                            readOnly
                                                        ></input>
                                                        <button
                                                            data-action="increment"
                                                            className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                                            onClick={() => increaseQuantity(cartItem)}
                                                        >
                                                            <span className="m-auto text-2xl font-thin">
                                                                +
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="leading-5">
                                                        <p className="font-semibold not-italic">
                                                            ${cartItem.price * cartItem.quantity.toFixed(2)}
                                                        </p>
                                                        <small className="text-gray-400">
                                                            {" "}
                                                            ${cartItem.price} / per item{" "}
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="flex-auto">
                                                    <div className="float-right">
                                                        <button
                                                            className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                                            onClick={() =>
                                                                removeItem(cartItem?.id)
                                                            }
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr className="my-4" />
                                        </div>
                                    ))}
                                </article>
                            </main>
                            <aside className="md:w-1/4">
                                <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                                    <ul className="mb-5">
                                        <li className="flex justify-between text-gray-600  mb-1">
                                            <span>Amount before Tax:</span>
                                            <span>${amountWithoutTax.toFixed(2) || ""}</span>
                                        </li>
                                        <li className="flex justify-between text-gray-600  mb-1">
                                            <span>Total Units:</span>
                                            <span className="text-indigo-500">
                                                {cart?.cartItems?.reduce(
                                                    (acc, item) => acc + item.quantity,
                                                    0
                                                )}{" "}
                                                (Units)
                                            </span>
                                        </li>
                                        <li className="flex justify-between text-gray-600  mb-1">
                                            <span>TAX:</span>
                                            <span>${taxAmount.toFixed(2) || ""}</span>
                                        </li>
                                        <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                                            <span>Total price:</span>
                                            <span>${totalAmount.toFixed(2) || ""}</span>
                                        </li>
                                    </ul>

                                    <button onClick={OrderProduct} className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 cursor-pointer">
                                        Continue
                                    </button>

                                    <Link
                                        href={"/"}
                                        className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-indigo-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                                    >
                                        Back to shop
                                    </Link>
                                </article>
                            </aside>
                        </div>
                    </div>
                </section>
            )}
        </>
    );
}

export default Cart