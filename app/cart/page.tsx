'use client';

import {useCart} from '@/hooks/useCart';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {Trash2, Plus, Minus, ShoppingBag, AlertCircle} from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const {cart, removeFromCart, updateQuantity, totalPrice} = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-stone-200 mb-4" />
        <h2 className="text-2xl font-bold text-stone-800">
          장바구니가 비어있습니다.
        </h2>
        <p className="text-stone-500 mt-2 mb-8">맛있는 쌀을 담아보세요!</p>
        <Link href="/">
          <Button className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-6 rounded-full font-bold">
            쇼핑하러 가기
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-3xl font-black mb-8">장바구니</h1>

      {/* 💡 주의사항 문구 (요청하신 부분) */}
      <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 mb-8">
        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
        <div className="text-sm text-blue-700">
          <p className="font-bold">안내사항</p>
          <p>
            현재 비회원으로 이용 중입니다.{' '}
            <strong>
              브라우저의 캐시를 삭제하거나 다른 기기/브라우저로 접속할 경우
            </strong>{' '}
            장바구니 내역이 사라질 수 있으니 유의해 주세요.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 상품 리스트 */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div
              key={`${item.id}-${item.weight}`}
              className="flex items-center gap-4 p-4 border border-stone-100 rounded-2xl bg-white shadow-sm">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-stone-800">{item.name}</h3>
                <p className="text-sm text-stone-400">{item.weight}kg</p>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.weight, -1)}
                    className="p-1 border rounded-md hover:bg-stone-50">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.weight, 1)}
                    className="p-1 border rounded-md hover:bg-stone-50">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-black text-lg">
                  {(item.price * item.quantity).toLocaleString()}원
                </p>
                <button
                  onClick={() => removeFromCart(item.id, item.weight)}
                  className="text-stone-300 hover:text-red-500 mt-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 주문 요약 박스 */}
        <div className="lg:col-span-1">
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100 sticky top-10">
            <h3 className="font-bold text-lg mb-4">결제 예정 금액</h3>
            <div className="space-y-2 mb-6 text-sm text-stone-600">
              <div className="flex justify-between">
                <span>상품금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>배송비</span>
                <span>0원 (무료배송)</span>
              </div>
              <hr className="my-4 border-stone-200" />
              <div className="flex justify-between text-lg font-black text-stone-900">
                <span>총 결제 금액</span>
                <span className="text-amber-600">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
            <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black py-7 rounded-2xl font-black text-lg shadow-lg shadow-amber-100">
              구매하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
