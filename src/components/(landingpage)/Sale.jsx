import Image from "next/image";

const Sale = () => {
    return (
        <div className="py-2 px-1">
            <div className="lg:max-w-[1440px] md:max-w-[744px] max-w-[375px] mx-auto bg-white relative lg:px-6 md:px-6 px-4 py-7">
                <div className="lg:max-w-[1280px] md:max-w-[696px] max-w-[343px] mx-auto bg-gray-200 rounded-lg">
                    <div className="lg:flex md:flex block justify-between items-center">
                        <div className="md:p-10 p-4">
                            <p className="text-base leading-none text-gray-800">
                                Save upto 30%
                            </p>
                            <p className="text-3xl font-semibold leading-9 text-gray-800 py-4">
                                Summer Sale
                            </p>
                            <p className="text-base leading-normal text-gray-600">
                                Want to save some cash and still look like a fashion diva ?
                                <br />
                                Checkout our summer sale now !!!
                            </p>
                        </div>
                        <div className="p-4">
                            <Image
                                src={"/sale.png"}
                                width={150}
                                height={150}
                                className="w-full h-full"
                                alt="Sale image"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sale;