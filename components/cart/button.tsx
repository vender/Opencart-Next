'use client';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import CartIcon from '#/components/icons/cart';
import Cartdrawer from './drawer';

export default function CartButton({
  cart,
  sessionIdUpdated,
  sessionId
}: {
  cart: any;
  sessionIdUpdated: boolean;
  sessionId: any
}) {

  const [cartIsOpen, setCartIsOpen] = useState(false);
  // const quantityRef = useRef(cart.items.length);
  const [, setCookie] = useCookies(['x-session-id']);
  const itemsInCart = cart?.items?.length ? cart.items.length : 0;

  // Temporary hack to update the `cartId` cookie when it changes since we cannot update it
  // on the server-side (yet).
  useEffect(() => {
    if (sessionIdUpdated) {
      setCookie('x-session-id', sessionId, {
        path: '/',
        // sameSite: 'none',
        secure: process.env.NODE_ENV === 'production'
      });
    }
    return;
  }, [setCookie, sessionIdUpdated, sessionId]);

  return (
    <>
      <Cartdrawer isOpen={cartIsOpen} onClose={() => setCartIsOpen(false)} cart={cart} />

      <button
        onClick={() => {
          setCartIsOpen(true);
        }}
        className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none transform"
        aria-label="cart-button"
      >
        <CartIcon />
        <span className="cart-counter-badge flex items-center justify-center bg-heading text-white absolute -top-2.5 xl:-top-3 rounded-full -right-2.5 xl:-right-3  font-bold">
          {itemsInCart}
        </span>
      </button>
    </>
  );
}