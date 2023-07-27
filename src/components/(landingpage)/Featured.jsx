"use client"

import Image from "next/image";
import Link from "next/link";

const Featured = () => {
    return (
        <div className="feature" id="feature">
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center">Featured Products</h2>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">

                        {/* Product 1 */}
                        <div key={""} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <Image
                                    width={256}
                                    height={500}
                                    src={"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"}
                                    alt={""}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link href={""}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            product name
                                        </Link>
                                    </h3>
                                    <p className="text-sm font-medium text-gray-900">$ price</p>
                                </div>
                                <button className="text-sm bg-black text-white m-2 p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 dark:border-gray-700">Add to Cart</button>
                            </div>
                        </div>
                        {/* Product 2 */}
                        <div key={""} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <Image
                                    width={256}
                                    height={500}
                                    src={"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg"}
                                    alt={""}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link href={""}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            product name
                                        </Link>
                                    </h3>
                                    <p className="text-sm font-medium text-gray-900">$ price</p>
                                </div>
                                <button className="text-sm bg-black text-white m-2 p-2 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-700 dark:border-gray-700">Add to Cart</button>
                            </div>
                        </div>

                        {/* Product 3 */}
                        <div key={""} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <Image
                                    width={256}
                                    height={500}
                                    src={"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg"}
                                    alt={""}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link href={""}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            product name
                                        </Link>
                                    </h3>
                                    <p className="text-sm font-medium text-gray-900">$ price</p>
                                </div>
                                <button className="text-sm bg-black text-white m-2 p-2 rounded-md">Add to Cart</button>
                            </div>
                        </div>

                        {/* Product 4 */}
                        <div key={""} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <Image
                                    width={256}
                                    height={500}
                                    src={"https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg"}
                                    alt={""}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link href={""}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            product name
                                        </Link>
                                    </h3>
                                    <p className="text-sm font-medium text-gray-900">$ price</p>
                                </div>
                                <button className="text-sm bg-black text-white m-2 p-2 rounded-md">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured;