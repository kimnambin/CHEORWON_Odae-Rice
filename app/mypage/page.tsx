'use client';

import {useState, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Badge} from '@/components/ui/badge';
import {Package, Truck, CheckCircle, Search, ShoppingBag} from 'lucide-react';
import React from 'react';
import {Checkbox} from '@/components/ui/checkbox';

// 주문 데이터 타입
interface Order {
  id: string;
  date: string;
  productName: string;
  price: number;
  status: '결제완료' | '상품준비중' | '배송중' | '배송완료';
  imageUrl: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-20260315-001',
    date: '2026.03.15',
    productName: '철원 오대쌀 (특등급) 10kg',
    price: 35000,
    status: '배송중',
    imageUrl: '/images/exp01.jpeg',
  },
  {
    id: 'ORD-20260210-089',
    date: '2026.02.10',
    productName: '유기농 현미 5kg',
    price: 18000,
    status: '배송완료',
    imageUrl: '/images/exp02.jpeg',
  },
];

export default function MyPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const [rememberMe, setRememberMe] = useState(false);

  // 로컬 스토리지에서 정보(이름,전화번호) 불러오기
  useEffect(() => {
    const savedName = localStorage.getItem('rice_shop_name');
    const savedPhone = localStorage.getItem('rice_shop_phone');

    if (savedName && savedPhone) {
      setName(savedName);
      setPhone(savedPhone);
      setRememberMe(true);
    }
  }, []);

  // 조회 버튼 클릭 시 로직
  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() === '' || phone.trim() === '') {
      alert('이름과 전화번호를 입력해주세요.');
      return;
    }

    if (rememberMe) {
      localStorage.setItem('rice_shop_name', name);
      localStorage.setItem('rice_shop_phone', phone);
    } else {
      localStorage.removeItem('rice_shop_name');
      localStorage.removeItem('rice_shop_phone');
    }

    // 테스트용 데이터 분기 처리
    if (name === '테스트') {
      setOrders([]);
    } else {
      setOrders(mockOrders);
    }
    setIsLoggedIn(true);
  };

  //  로그인(조회) 전 화면
  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-32 max-w-md flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6">
          <Search className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold mb-2">주문 조회</h1>
        <p className="text-stone-500 mb-8 text-center">
          주문 시 입력하신 이름과 전화번호를
          <br />
          입력해 주세요.
        </p>

        <Card className="w-full border-stone-200 shadow-lg">
          <CardContent className="pt-6">
            <form onSubmit={handleLookup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="예: 홍길동 (내역 없음은 '테스트')"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={e =>
                    setPhone(e.target.value.replace(/[^0-9]/g, ''))
                  }
                  placeholder="숫자만 입력"
                  maxLength={11}
                />
              </div>

              {/* 정보 기억하기 체크박스 UI 추가 */}
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={checked => setRememberMe(checked as boolean)}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-stone-600 font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  내 정보 기억하기
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-12 mt-4 text-lg">
                조회하기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 로그인(조회) 후 화면
  return (
    <div className="container mx-auto px-4 py-28 max-w-4xl">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">
            <span className="text-amber-600">{name}</span>님의 마이페이지
          </h1>
          <p className="text-stone-500 mt-2">최근 6개월간의 주문 내역입니다.</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsLoggedIn(false)}
          size="sm">
          다른 정보로 조회
        </Button>
      </div>

      {orders.length > 0 ? (
        <div className="space-y-8">
          {/* 주문이 있을 때: 주문/배송 리스트 */}
          {orders.map(order => (
            <Card
              key={order.id}
              className="overflow-hidden border-stone-200 shadow-sm">
              <CardHeader className="bg-stone-50 border-b border-stone-100 py-3 px-6 flex flex-row justify-between items-center">
                <span className="font-semibold text-stone-600">
                  {order.date} 주문
                </span>
                <span className="text-sm text-stone-400">
                  주문번호: {order.id}
                </span>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  {/* 상품 정보 */}
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                      <Image
                        src={order.imageUrl}
                        alt={order.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Badge
                        variant="secondary"
                        className="w-fit bg-amber-100 text-amber-800 border-none">
                        {order.status}
                      </Badge>
                      <h3 className="font-bold text-lg line-clamp-1">
                        {order.productName}
                      </h3>
                      <p className="font-bold text-stone-600">
                        {order.price.toLocaleString()}원
                      </p>
                    </div>
                  </div>

                  {/* 배송 상태(진행률) */}
                  <div className="w-full md:w-1/2 flex justify-between items-center px-4 relative">
                    {/* 배경 선 */}
                    <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-stone-200 -z-10 -translate-y-1/2"></div>

                    <StatusStep
                      icon={<Package />}
                      label="결제완료"
                      active={true}
                    />
                    <StatusStep
                      icon={<Package />}
                      label="상품준비중"
                      active={
                        order.status === '상품준비중' ||
                        order.status === '배송중' ||
                        order.status === '배송완료'
                      }
                    />
                    <StatusStep
                      icon={<Truck />}
                      label="배송중"
                      active={
                        order.status === '배송중' || order.status === '배송완료'
                      }
                    />
                    <StatusStep
                      icon={<CheckCircle />}
                      label="배송완료"
                      active={order.status === '배송완료'}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* 💡 주문이 없을 때 */
        <div className="flex flex-col items-center justify-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
            <ShoppingBag className="w-10 h-10 text-stone-300" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-stone-700">
            주문 내역이 없습니다
          </h2>
          <p className="text-stone-500 text-center mb-8">
            고객님의 정보로 조회된 최근 주문 내역이 존재하지 않습니다.
            <br />
            맛있는 철원 오대쌀을 구경해 보시겠어요?
          </p>
          <Link href="/">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 h-12 rounded-full text-lg">
              상품 구경하러 가기
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

// 배송 상태 아이콘
function StatusStep({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 bg-white px-2 z-10">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors [&>svg]:w-5 [&>svg]:h-5
        ${
          active
            ? 'bg-amber-500 border-amber-500 text-white shadow-md'
            : 'bg-white border-stone-200 text-stone-300'
        }
      `}>
        {icon}
      </div>
      <span
        className={`text-xs font-bold ${
          active ? 'text-amber-700' : 'text-stone-400'
        }`}>
        {label}
      </span>
    </div>
  );
}
