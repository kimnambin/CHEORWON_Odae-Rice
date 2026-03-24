'use client';

import {useEffect, useRef} from 'react';
import {Button} from '@/components/ui/button';

export type MainCategoryId = 'grains' | 'vegetables';
export type SubCategoryId =
  | 'all'
  | 'rice'
  | 'brown'
  | 'black' // 곡류
  | 'cabbage'
  | 'radish'
  | 'altari'
  | 'greenOnion'
  | 'pumpkin'
  | 'eggplant'
  | 'pepper'; // 채소류

export interface SubCategory {
  id: SubCategoryId;
  label: string;
}

export interface MainCategory {
  id: MainCategoryId;
  label: string;
  subCategories: SubCategory[];
}

//  2단 카테고리 데이터 구축
export const categories: MainCategory[] = [
  {
    id: 'grains',
    label: '곡류',
    subCategories: [
      {id: 'all', label: '전체보기'},
      {id: 'rice', label: '쌀'},
      {id: 'brown', label: '현미'},
      {id: 'black', label: '흑미'},
    ],
  },
  {
    id: 'vegetables',
    label: '채소류',
    subCategories: [
      {id: 'all', label: '전체보기'},
      {id: 'cabbage', label: '배추'},
      {id: 'radish', label: '무'},
      {id: 'altari', label: '알타리무'},
      {id: 'greenOnion', label: '파'},
      {id: 'pumpkin', label: '호박'},
      {id: 'eggplant', label: '가지'},
      {id: 'pepper', label: '고추'},
    ],
  },
];

interface CategoryNavProps {
  activeMain: MainCategoryId;
  setActiveMain: (id: MainCategoryId) => void;
  activeSub: SubCategoryId;
  setActiveSub: (id: SubCategoryId) => void;
}

export default function CategoryNav({
  activeMain,
  setActiveMain,
  activeSub,
  setActiveSub,
}: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentSubCategories =
    categories.find(c => c.id === activeMain)?.subCategories || [];

  const handleMainCategoryClick = (mainId: MainCategoryId) => {
    setActiveMain(mainId);
    setActiveSub('all'); // 대분류가 바뀌면 소분류는 무조건 '전체보기'로 초기화!
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1단: 대분류 (곡류 / 채소류) */}
      <div className="flex gap-4 border-b border-stone-200 pb-2 items-center justify-center">
        {categories.map(main => (
          <button
            key={main.id}
            onClick={() => handleMainCategoryClick(main.id)}
            className={` text-lg font-bold pb-2 border-b-2 transition-all duration-200 ${
              activeMain === main.id
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}>
            {main.label}
          </button>
        ))}
      </div>

      {/*  2단: 소분류 (가로 스크롤) */}
      <div
        ref={scrollRef}
        className="flex items-center justify-center gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {currentSubCategories.map(sub => (
          <Button
            key={sub.id}
            variant={activeSub === sub.id ? 'default' : 'outline'}
            onClick={() => setActiveSub(sub.id)}
            className={`
              whitespace-nowrap rounded-full px-5 transition-all duration-200
              ${
                activeSub === sub.id
                  ? 'bg-amber-500 text-black border-amber-500 hover:bg-amber-600'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }
            `}>
            {sub.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
