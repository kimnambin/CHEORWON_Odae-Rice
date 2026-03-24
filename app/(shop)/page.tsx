'use client';

import MainBanner from '@/components/shop/MainBanner';
import CategoryNav, {
  MainCategoryId,
  SubCategoryId,
} from '@/components/shop/CategoryNav';
import ProductCard from '@/components/common/ProductCard';
import MillingInfo from '@/components/shop/MillingInfo';
import FadeInUp from '@/components/common/FadeInUp';
import ProductSwiper from '@/components/shop/ProductSwiper';
import {useState} from 'react';
import {categories} from '@/components/shop/CategoryNav';
import {useRouter} from 'next/navigation';

interface Product {
  id: string;
  name: string;
  price: number;
  weight: number;
  millingDate: string;
  isBest: boolean;
  imageUrl: string;
  mainCategory: MainCategoryId;
  subCategory: SubCategoryId;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: '철원 오대쌀 (특등급)',
    price: 35000,
    weight: 10,
    millingDate: '2026-03-02',
    isBest: true,
    imageUrl: '/images/exp01.jpeg',
    mainCategory: 'grains',
    subCategory: 'rice',
  },
  {
    id: '2',
    name: '유기농 현미 (5kg)',
    price: 18000,
    weight: 5,
    millingDate: '2026-03-03',
    isBest: true,
    imageUrl: '/images/exp02.jpeg',
    mainCategory: 'grains',
    subCategory: 'brown',
  },
  {
    id: '3',
    name: '산지직송 싱싱 배추',
    price: 12000,
    weight: 3,
    millingDate: '2026-03-24',
    isBest: false,
    imageUrl: '/images/exp03.jpeg', // 실제 이미지로 교체 필요
    mainCategory: 'vegetables',
    subCategory: 'cabbage',
  },
];

export default function Home() {
  // 카테고라 대분류
  const [activeMain, setActiveMain] = useState<MainCategoryId>('grains');
  const [activeSub, setActiveSub] = useState<SubCategoryId>('all');

  //  카테고리 소분류
  const currentMain = categories.find(c => c.id === activeMain);
  const currentSub = currentMain?.subCategories.find(s => s.id === activeSub);
  const displayLabel = currentSub ? currentSub.label : '전체보기';

  const filteredProducts = mockProducts.filter(product => {
    const isMainMatch = product.mainCategory === activeMain;
    const isSubMatch = activeSub === 'all' || product.subCategory === activeSub;
    return isMainMatch && isSubMatch;
  });

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
                activeMain={activeMain}
                setActiveMain={setActiveMain}
                activeSub={activeSub}
                setActiveSub={setActiveSub}
              />
            </section>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <section className="min-h-100 flex flex-col">
              <div className="mb-2 text-center">
                <h2 className="text-3xl font-bold">{displayLabel}</h2>
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
                    onClick={() => setActiveSub('all')}
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
