import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import clsx from "clsx";

import { fadeInOut } from "#/components/ui/motion/fade-in-out";
import { IoClose } from "react-icons/io5";
import EmptyCart from "./empty-cart";
import CartItem from "./cart-item";

export default function CartModal({
  isOpen,
  onClose,
  cart
}: {
  isOpen: boolean;
  onClose: () => void;
  cart: any;
}) {
  
  return (
    <AnimatePresence initial={false}>
      {/* {isOpen && ( */}
        <Dialog
          as={motion.div}
          initial="closed"
          animate="open"
          exit="closed"
          key="dialog"
          static
          open={isOpen}
          onClose={onClose}
          className="relative z-50"
        >
          <motion.div
            variants={{
              open: { opacity: 1, backdropFilter: 'blur(0.5px)' },
              closed: { opacity: 0, backdropFilter: 'blur(0px)' }
            }}
            className="fixed inset-0 bg-black/30"
            aria-hidden="true"
          /> 

          <div className="fixed inset-0 flex justify-end" data-testid="cart">
            <Dialog.Panel
              as={motion.div}
              variants={{
                open: { translateX: 0 },
                closed: { translateX: '100%' }
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              className="flex w-full flex-col bg-white text-black md:w-3/5 lg:w-[450px]"
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
                      {cart?.total}
                    </span>
                  
                  </Link>)  : null
                }
                </div>
              </div>

            </Dialog.Panel>
          </div>
        </Dialog>
       {/* )} */}
    </AnimatePresence>
  );
}