import React from 'react'
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IoClose } from "react-icons/io5";
import CartItem from "./cart-item";
import EmptyCart from "./empty-cart";
import { fadeInOut } from "#/components/ui/motion/fade-in-out";
import clsx from "clsx";
import VaulDrawer from "#/components/layout/Drawer";

export default function Cartdrawer({
    isOpen,
    onClose,
    cart
}: {
    isOpen: boolean;
    onClose: () => void;
    cart: any;
}) {
    return (
        <VaulDrawer
            open={isOpen}
            placement="right"
            onClose={onClose}
            contentClass="right-0 top-0 bottom-0 fixed z-[100] h-full outline-none bg-white"
        >
            <div className="flex flex-col w-full h-full justify-between">
                <div className="w-full flex justify-between items-center relative ps-5 md:ps-7 py-0.5 border-b border-gray-100">
                    <h2 className="font-bold text-xl md:text-2xl m-0 text-heading">
                        Корзина
                    </h2>
                    <button
                        className="flex text-2xl items-center justify-center text-gray-500 px-4 md:px-6 py-6 focus:outline-none transition-opacity hover:opacity-60"
                        onClick={onClose}
                        aria-label="close"
                    >
                        <IoClose className="text-black mt-1 md:mt-0.5" />
                    </button>

                </div>

                {cart?.items?.length > 0 ? (
                    <div className="w-full px-5 md:px-7 flex-grow overflow-y-auto">
                        {cart?.items?.map((item: any) => (
                            <CartItem item={item} key={item.product_id} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        layout
                        initial="from"
                        animate="to"
                        exit="from"
                        variants={fadeInOut(0.25)}
                        className="px-5 md:px-7 pt-8 pb-5 flex justify-center flex-col items-center"
                    >
                        <EmptyCart />
                        <h3 className="text-lg text-heading font-bold pt-8">
                            В корзине пусто
                        </h3>
                    </motion.div>
                )}

                <div
                    className="flex flex-col px-5 md:px-7 py-3"
                    onClick={onClose}
                >
                    {cart?.total ?
                        (<Link
                            href={cart?.total > 0 ? "/checkout" : "/"}
                            className={clsx(
                                "w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded-md text-sm sm:text-base text-white focus:outline-none transition duration-300 hover:bg-gray-600",
                                {
                                    "cursor-not-allowed bg-gray-400 hover:bg-gray-400": cart?.items?.length == 0,
                                }
                            )}
                        >

                            <span className="w-full pe-5 -mt-0.5 py-0.5">
                                Оформление заказа
                            </span>
                            <span className="ms-auto flex-shrink-0 -mt-0.5 py-0.5">
                                <span className="border-s border-white pe-5 py-0.5" />
                                {cart?.total} ₽
                            </span>

                        </Link>) : null
                    }
                </div>
            </div>
        </VaulDrawer>
    )
}
