'use client';

import MainBanner from '@/components/shop/MainBanner';
import CategoryNav from '@/components/shop/CategoryNav';
import ProductCard from '@/components/common/ProductCard';
import MillingInfo from '@/components/shop/MillingInfo';
import FadeInUp from '@/components/common/FadeInUp';
import ProductSwiper from '@/components/shop/ProductSwiper';
import {useState} from 'react';
import {CategoryId, categories} from '@/components/shop/CategoryNav';

const mockProducts = [
  {
    id: '1',
    name: '철원 오대쌀 (특등급)',
    price: 35000,
    weight: 10,
    millingDate: '2026-03-02',
    isBest: true,
    imageUrl: '/images/exp01.jpeg',
  },
  {
    id: '2',
    name: '철원 오대쌀 (등급)',
    price: 25000,
    weight: 10,
    millingDate: '2026-03-03',
    isBest: true,
    imageUrl: '/images/exp02.jpeg',
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  const currentCategory = categories.find(c => c.id === activeCategory);

  // 만약 못 찾으면 기본값으로 '전체보기'를 씁니다.
  const displayLabel = currentCategory ? currentCategory.label : '전체보기';

  return (
    // 최상위 부모: 전체 화면을 감싸고 세로 스크롤 스냅을 지시합니다.
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {/* 메인 배너 */}
      <div className="snap-start snap-always h-screen">
        <MainBanner />
      </div>

      {/* 카테고리 + 인기 상품 스와이퍼 */}

      <div className="snap-start snap-always min-h-screen bg-white flex flex-col justify-center py-10">
        <div className="container mx-auto px-4 flex flex-col gap-8">
          {/* 카테고리 네비게이션 */}
          <FadeInUp>
            <section>
              <h2 className="text-xl font-semibold mb-6">
                어떤 쌀을 찾으시나요?
              </h2>
              <CategoryNav
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </section>
          </FadeInUp>

          {/* 베스트 상품*/}
          <FadeInUp delay={0.2}>
            <section>
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold">{displayLabel}</h2>
                <p className="text-muted-foreground mt-2">
                  좌우로 밀어서 쌀을 구경해 보세요.
                </p>
              </div>

              <ProductSwiper products={mockProducts} />
            </section>
          </FadeInUp>
        </div>
      </div>

      {/* 도정 정보 안내 */}
      <div className="snap-start snap-always min-h-screen bg-stone-50 flex items-center">
        <div className="container mx-auto px-4 w-full">
          <FadeInUp delay={0.3}>
            <MillingInfo />
          </FadeInUp>
        </div>
      </div>
    </div>
  );
}
