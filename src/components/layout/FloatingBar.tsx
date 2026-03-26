'use client';

import Link from 'next/link';
import {Home, ShoppingCart, User} from 'lucide-react';
import {CartItem, useCart} from '@/hooks/useCart';
import {motion, AnimatePresence} from 'framer-motion';
import {useState, useEffect} from 'react';

export default function FloatingBar() {
  const {cart} = useCart();
  const [render, setRender] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const handleStorage = () => setRender(prev => prev + 1);
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);
  const updateCount = () => {
    const savedCart = localStorage.getItem('rice-shop-cart');
    if (savedCart) {
      const cart: CartItem[] = JSON.parse(savedCart);
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setTotalItems(count);
    }
  };

  useEffect(() => {
    updateCount();

    window.addEventListener('cart-updated', updateCount);

    window.addEventListener('storage', updateCount);

    return () => {
      window.removeEventListener('cart-updated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-stone-900/90 backdrop-blur-md text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-8 border border-stone-700/50">
        {/* 1. 홈 버튼 */}
        <Link
          href="/"
          className="flex flex-col flex-1 items-center gap-1 hover:text-amber-400 transition-colors group">
          <Home className="w-5 h-5 group-active:scale-90 transition-transform" />
          <span className="absolute -top-8 text-[10px] bg-stone-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            홈
          </span>
        </Link>

        {/* 2. 장바구니 버튼 (숫자 배지 포함) */}
        <Link
          href="/cart"
          className="relative flex flex-col flex-1 items-center gap-1 hover:text-amber-400 transition-colors group">
          <ShoppingCart className="w-5 h-5 group-active:scale-90 transition-transform" />
          <span className="absolute -top-12 text-[10px] bg-stone-800 text-white px-2 py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            장바구니
          </span>
          {totalItems > 0 && (
            <div className="absolute -top-1 -right-2 bg-amber-500 text-stone-900 text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
              {totalItems > 99 ? '99+' : totalItems}
            </div>
          )}
        </Link>

        {/* 3. 마이페이지 버튼 */}
        <Link
          href="/mypage"
          className="flex flex-col flex-1 items-center gap-1 hover:text-amber-400 transition-colors group">
          <User className="w-5 h-5 group-active:scale-90 transition-transform" />
          <span className="absolute -top-8 text-[10px] bg-stone-800 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            마이페이지
          </span>
        </Link>
      </div>
    </div>
  );
}
