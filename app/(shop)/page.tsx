'use client';

import MainBanner from '@/components/shop/MainBanner';
import CategoryNav from '@/components/shop/CategoryNav';
import ProductCard from '@/components/common/ProductCard';
import MillingInfo from '@/components/shop/MillingInfo';
import FadeInUp from '@/components/common/FadeInUp';
import ProductSwiper from '@/components/shop/ProductSwiper';
import {useState} from 'react';
import {CategoryId, categories} from '@/components/shop/CategoryNav';
import {useRouter} from 'next/navigation';

const mockProducts = [
  {
    id: '1',
    name: '철원 오대쌀 (특등급)',
    price: 35000,
    weight: 10,
    millingDate: '2026-03-02',
    isBest: true,
    imageUrl: '/images/exp01.jpeg',
    categoryId: 'odae',
  },
  {
    id: '2',
    name: '철원 오대쌀 (등급)',
    price: 25000,
    weight: 10,
    millingDate: '2026-03-03',
    isBest: true,
    imageUrl: '/images/exp02.jpeg',
    categoryId: 'brown',
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  const currentCategory = categories.find(c => c.id === activeCategory);
  const displayLabel = currentCategory ? currentCategory.label : '전체보기';

  const filteredProducts =
    activeCategory === 'all'
      ? mockProducts
      : mockProducts.filter(p => p.categoryId === activeCategory);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {/* 메인 배너 */}
      <div className="snap-start snap-always h-screen">
        <MainBanner />
      </div>

      {/*  상품 섹션 */}
      <div
        id="products-section"
        className="snap-start snap-always min-h-screen bg-white flex flex-col justify-center py-10">
        <div className="container mx-auto px-4 flex flex-col gap-8">
          <FadeInUp>
            <section>
              {/* <h2 className="text-xl font-semibold mb-6">
                어떤 쌀을 찾으시나요?
              </h2> */}
              <CategoryNav
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </section>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <section className="min-h-[400px] flex flex-col">
              <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold">{displayLabel}</h2>
                <p className="text-muted-foreground text-stone-400 mt-2 text-sm md:text-base">
                  좌우로 밀어서 쌀을 구경해 보세요.
                </p>
              </div>

              {/* 상품이 있을 때와 없을 때를 구분 */}
              {filteredProducts.length > 0 ? (
                <ProductSwiper products={filteredProducts} />
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-stone-400">
                  <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-4xl">
                    🌾
                  </div>
                  <h3 className="text-xl font-medium mb-2">
                    아직 상품을 준비 중입니다.
                  </h3>
                  <p className="text-sm italic">
                    다른 카테고리를 확인해 보시겠어요?
                  </p>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="mt-6 text-amber-600 hover:underline font-semibold">
                    전체 상품 보기
                  </button>
                </div>
              )}
            </section>
          </FadeInUp>
        </div>
      </div>

      {/* 도정 정보  */}
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
