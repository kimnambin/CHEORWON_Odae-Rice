'use client';

import {useState} from 'react';
import Image from 'next/image';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {
  Star,
  MapPin,
  CalendarCheck,
  Info,
  Home,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {useRouter} from 'next/navigation';
import {useCart} from '@/hooks/useCart';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog';

interface TasteGuide {
  stickiness: number; // 찰기
  softness: number; // 부드러움
  sweetness: number; // 단맛
}

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  imageUrl?: string;
}

interface ProductDetail {
  id: string;
  name: string;
  price: number;
  origin: string;
  millingDate: string;
  taste: TasteGuide;
  images: string[];
  reviews: Review[];
}

// 판매자 정보
interface SellerInfo {
  name: string;
  phone: string;
  address: string;
}

// 임시 판매자 데이터
const mockSeller: SellerInfo = {
  name: '박철원',
  phone: '010-1234-5678',
  address: '강원도 철원군 동송읍 ...',
};

// 임시 상품 데이터
const mockProduct: ProductDetail = {
  id: '1',
  name: '철원 오대쌀 (특등급)',
  price: 35000,
  origin: '강원도 철원군',
  millingDate: '주문 당일 도정',
  taste: {stickiness: 90, softness: 85, sweetness: 75},
  images: ['/images/exp01.jpeg'],
  reviews: [
    {
      id: 'r1',
      author: '김*빈',
      rating: 5,
      date: '2026.03.14',
      content:
        '밥에서 윤기가 좔좔 흐르네요! 갓 도정한 쌀이라 그런지 밥맛이 꿀맛입니다.',
      imageUrl: '/images/exp02.jpeg',
    },
  ],
};

const weightOptions = [1, 2, 3, 5, 10, 15, 20];

export default function ProductDetailPage() {
  const [selectedWeight, setSelectedWeight] = useState<number>(10);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {addToCart} = useCart();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleAddToCart = () => {
    addToCart({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      weight: selectedWeight,
      quantity: 1,
      imageUrl: mockProduct.images[0],
    });
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-sm">
          <Image
            src={mockProduct.images[0]}
            alt={mockProduct.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex gap-2 mb-3">
              <Badge
                variant="outline"
                className="text-amber-600 border-amber-600 bg-amber-50">
                <MapPin className="w-3 h-3 mr-1" /> {mockProduct.origin}
              </Badge>
              <Badge variant="secondary" className="bg-stone-100">
                <CalendarCheck className="w-3 h-3 mr-1" />{' '}
                {mockProduct.millingDate}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{mockProduct.name}</h1>
            <p className="text-3xl font-extrabold text-primary">
              {mockProduct.price.toLocaleString()}원{' '}
              <span className="text-lg font-normal text-muted-foreground">
                / 10kg 기준
              </span>
            </p>
          </div>

          <hr className="border-stone-200" />

          <div className="bg-amber-50/50 p-5 rounded-2xl border border-amber-100">
            <h3 className="font-semibold mb-3 flex items-center gap-2 text-amber-900">
              <UserCheck className="w-4 h-4" /> 판매자 정보
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-500">판매자명</span>
                <span className="text-sm font-medium text-stone-800">
                  {mockSeller.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-stone-500">연락처</span>
                <a
                  href={`tel:${mockSeller.phone}`}
                  className="text-sm font-bold text-amber-600 hover:underline">
                  {mockSeller.phone}
                </a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">
              무게 선택 ({selectedWeight}kg)
            </h3>
            <div className="flex flex-wrap gap-2">
              {weightOptions.map(weight => (
                <Button
                  key={weight}
                  variant={selectedWeight === weight ? 'default' : 'outline'}
                  onClick={() => setSelectedWeight(weight)}
                  className={`rounded-xl px-5 ${
                    selectedWeight === weight
                      ? 'bg-amber-500 hover:bg-amber-600 text-black'
                      : ''
                  }`}>
                  {weight}kg
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              * 20kg 선택 시 화물 배송비가 추가될 수 있습니다.
            </p>
          </div>

          <hr className="border-stone-200" />

          <div className="bg-stone-50 p-5 rounded-2xl">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600" /> 철원 오대쌀 밥맛
              가이드
            </h3>
            <div className="flex flex-col gap-4">
              <TasteBar
                label="찰기"
                value={mockProduct.taste.stickiness}
                tooltipText="쌀알이 뭉치는 쫀득하고 차진 정도를 나타냅니다."
              />
              <TasteBar
                label="부드러움"
                value={mockProduct.taste.softness}
                tooltipText="쌀알이 부드럽고 쫀득한 느낌을 나타냅니다."
              />
              <TasteBar
                label="단맛"
                value={mockProduct.taste.sweetness}
                tooltipText="쌀알의 자연스러운 단맛을 나타냅니다."
              />
            </div>
          </div>

          <div className="mt-auto pt-6 flex gap-3">
            <Button
              onClick={handleAddToCart}
              size="lg"
              variant="outline"
              className="w-1/3 text-lg rounded-full">
              장바구니
            </Button>
            <Button
              onClick={handleCheckout}
              size="lg"
              className="w-2/3 text-lg bg-amber-500 hover:bg-amber-600 text-black rounded-full">
              바로 구매하기
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[340px] rounded-2xl p-6 border-none shadow-2xl">
          <DialogHeader className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <DialogTitle className="text-xl font-black text-stone-800">
              장바구니 담기 완료!
            </DialogTitle>
            <p className="text-center text-stone-500 text-sm leading-relaxed">
              선택하신 상품이 장바구니에
              <br />
              안전하게 담겼습니다.
            </p>
          </DialogHeader>
          <DialogFooter className="flex flex-col gap-2 sm:flex-col">
            <Button
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold h-12 rounded-xl"
              onClick={() => router.push('/cart')}>
              장바구니 확인하기
            </Button>
            <Button
              variant="ghost"
              className="w-full text-stone-400 hover:text-stone-600"
              onClick={() => setIsModalOpen(false)}>
              쇼핑 계속하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ---  리뷰 영역 --- */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold mb-6">
          구매자의 리뷰 ({mockProduct.reviews.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockProduct.reviews.map(review => (
            <div
              key={review.id}
              className="border border-stone-200 rounded-2xl p-5 flex gap-5">
              {review.imageUrl && (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={review.imageUrl}
                    alt="리뷰 이미지"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col justify-center">
                <div className="flex text-amber-500 mb-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  {review.author} | {review.date}
                </div>
                <p className="text-stone-800 line-clamp-2">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 💡 tooltipText를 받을 수 있도록 타입을 추가했습니다.
function TasteBar({
  label,
  value,
  tooltipText,
}: {
  label: string;
  value: number;
  tooltipText: string;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-4 cursor-help group">
            <span className="w-16 text-sm font-medium text-stone-600   group-hover:text-amber-600 transition-colors">
              {label}
            </span>
            <div className="flex-1 h-2.5 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                style={{width: `${value}%`}}
              />
            </div>
          </div>
        </TooltipTrigger>

        <TooltipContent
          side="top"
          className="bg-stone-800 text-white border-none shadow-md">
          <p className="text-sm">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
