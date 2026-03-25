'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {
  LayoutDashboard,
  PlusCircle,
  UserCog,
  ClipboardList,
  DollarSign,
  TrendingUp,
  Package,
  ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';
import {Home} from 'lucide-react';

export default function AdminIntegratedPage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="flex items-center gap-3 group mb-3">
        <Link href="/">
          <div className="p-2 rounded-xl bg-white border border-stone-200 text-stone-400 hover:text-amber-600 hover:border-amber-200 hover:bg-amber-50 transition-all cursor-pointer shadow-sm hover:scale-110 active:scale-95">
            <Home className="w-6 h-6" />
          </div>
        </Link>
        <h1 className="text-4xl font-black text-stone-800 tracking-tight">
          관리자 페이지
        </h1>
      </div>
      <div className="flex items-center gap-3 group">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-stone-100 p-1 rounded-xl grid grid-cols-4 w-full max-w-2xl">
            <TabsTrigger
              value="dashboard"
              className="rounded-lg gap-2   data-[state=active]:bg-amber-500 
               data-[state=active]:text-white 
               data-[state=active]:shadow-md">
              <LayoutDashboard className="w-4 h-4" /> 대시보드
            </TabsTrigger>
            <TabsTrigger
              value="upload"
              className="rounded-lg gap-2   data-[state=active]:bg-amber-500 
               data-[state=active]:text-white 
               data-[state=active]:shadow-md">
              <PlusCircle className="w-4 h-4" /> 상품등록
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="rounded-lg gap-2   data-[state=active]:bg-amber-500 
               data-[state=active]:text-white 
               data-[state=active]:shadow-md">
              <ClipboardList className="w-4 h-4" /> 주문현황
            </TabsTrigger>
            <TabsTrigger
              value="seller"
              className="rounded-lg gap-2   data-[state=active]:bg-amber-500 
               data-[state=active]:text-white 
               data-[state=active]:shadow-md">
              <UserCog className="w-4 h-4" /> 판매자설정
            </TabsTrigger>
          </TabsList>

          {/* --- [탭 1] 대시보드 (매출 및 요약) --- */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                title="오늘 매출"
                value="350,000원"
                icon={<DollarSign />}
                color="text-amber-600"
              />
              <StatCard
                title="이번 달 매출"
                value="8,420,000원"
                icon={<TrendingUp />}
                color="text-green-600"
              />
              <StatCard
                title="오늘 주문"
                value="12건"
                icon={<ShoppingBag />}
                color="text-blue-600"
              />
              <StatCard
                title="배송 준비"
                value="3건"
                icon={<Package />}
                color="text-purple-600"
              />
            </div>

            <Card className="border-stone-200">
              <CardHeader>
                <CardTitle>최근 주문 현황</CardTitle>
                <CardDescription>
                  실시간으로 들어오는 주문 목록입니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-stone-100">
                  <OrderItem
                    id="ORD-001"
                    name="철원 오대쌀 10kg"
                    price="35,000"
                    status="결제완료"
                    time="10분 전"
                  />
                  <OrderItem
                    id="ORD-002"
                    name="산지직송 배추 3망"
                    price="42,000"
                    status="배송준비"
                    time="2시간 전"
                  />
                  <OrderItem
                    id="ORD-003"
                    name="유기농 현미 5kg"
                    price="18,000"
                    status="배송중"
                    time="5시간 전"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- [탭 2] 상품 업로드 --- */}
          <TabsContent value="upload">
            <Card className="border-stone-200 max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>신규 상품 등록</CardTitle>
                <CardDescription>
                  상품 이미지와 상세 정보를 입력해 등록하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>대분류</Label>
                    <Input placeholder="곡류 / 채소류" />
                  </div>
                  <div className="space-y-2">
                    <Label>소분류</Label>
                    <Input placeholder="쌀, 배추, 무 등" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>상품명</Label>
                  <Input placeholder="상품 이름을 입력하세요" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>가격 (원)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                  <div className="space-y-2">
                    <Label>재고 (개)</Label>
                    <Input type="number" placeholder="0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>상품 설명</Label>
                  <Textarea
                    placeholder="상품에 대한 특징을 적어주세요."
                    className="h-24"
                  />
                </div>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-6 rounded-xl">
                  상품 등록 완료
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- [탭 3] 주문 관리 --- */}
          <TabsContent value="orders">
            <Card className="border-stone-200">
              <CardContent className="p-20 text-center text-stone-400">
                <ClipboardList className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>
                  전체 주문 이력을 관리하는 상세 테이블이 들어올 자리입니다.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* --- [탭 4] 판매자 설정 --- */}
          <TabsContent value="seller">
            <Card className="border-stone-200 max-w-xl mx-auto">
              <CardHeader>
                <CardTitle>판매자 프로필 관리</CardTitle>
                <CardDescription>
                  상세 페이지에 노출될 연락처와 정보를 수정합니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>농장/업체명</Label>
                  <Input defaultValue="오대산 청정 농원" />
                </div>
                <div className="space-y-2">
                  <Label>판매자 이름</Label>
                  <Input defaultValue="박철원" />
                </div>
                <div className="space-y-2">
                  <Label>연락처</Label>
                  <Input defaultValue="010-1234-5678" />
                </div>
                <Button className="w-full bg-stone-800 text-white font-bold py-6 rounded-xl">
                  설정 저장하기
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 💡 메인 탭 시스템 */}
    </div>
  );
}

// 💡 작은 부품들
function StatCard({title, value, icon, color}: any) {
  return (
    <Card className="border-stone-200 shadow-sm overflow-hidden">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-2xl font-black text-stone-800">{value}</p>
        </div>
        <div className={`${color} bg-stone-50 p-3 rounded-2xl`}>{icon}</div>
      </CardContent>
    </Card>
  );
}

function OrderItem({id, name, price, status, time}: any) {
  return (
    <div className="py-4 flex items-center justify-between hover:bg-stone-50 transition-colors px-2 rounded-lg">
      <div className="flex flex-col">
        <span className="text-xs text-stone-400 font-mono">{id}</span>
        <span className="font-bold text-stone-700">{name}</span>
      </div>
      <div className="text-right flex flex-col items-end gap-1">
        <span className="font-black text-stone-900">{price}원</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-stone-400">{time}</span>
          <span className="bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
