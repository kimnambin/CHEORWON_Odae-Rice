'use client';

import {useState, useEffect} from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  weight: number;
  quantity: number;
  imageUrl: string;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 로컬 스토리지에서 가져오기
  useEffect(() => {
    const savedCart = localStorage.getItem('rice-shop-cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // 장바구니 상태가 변할 때마다 로컬 스토리지 동기화
  useEffect(() => {
    localStorage.setItem('rice-shop-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: CartItem) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.weight === product.weight,
      );
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.weight === product.weight
            ? {...item, quantity: item.quantity + 1}
            : item,
        );
      }
      return [...prev, product];
    });
    alert('장바구니에 담겼습니다!');
  };

  const removeFromCart = (id: string, weight: number) => {
    setCart(prev =>
      prev.filter(item => !(item.id === id && item.weight === weight)),
    );
  };

  const updateQuantity = (id: string, weight: number, delta: number) => {
    setCart(prev =>
      prev.map(item => {
        if (item.id === id && item.weight === weight) {
          const newQty = Math.max(1, item.quantity + delta);
          return {...item, quantity: newQty};
        }
        return item;
      }),
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return {cart, addToCart, removeFromCart, updateQuantity, totalPrice};
};
