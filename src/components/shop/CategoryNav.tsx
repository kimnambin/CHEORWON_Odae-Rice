'use client';

import {useEffect, useRef} from 'react';
import {Button} from '@/components/ui/button';

export type CategoryId = 'all' | 'odae' | 'brown' | 'large' | 'small' | 'gift';

export interface Category {
  id: CategoryId;
  label: string;
}

// 쌀 카테고리 목록 (원본은 그대로 둡니다)
export const categories: Category[] = [
  {id: 'all', label: '전체보기'},
  {id: 'odae', label: '철원 오대쌀'},
  {id: 'brown', label: '현미/잡곡'},
  {id: 'large', label: '대용량(20kg)'},
  {id: 'small', label: '소포장(1kg)'},
  {id: 'gift', label: '선물세트'},
];

export default function CategoryNav({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: CategoryId;
  setActiveCategory: (id: CategoryId) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeItem = categories.find(c => c.id === activeCategory);
  const otherItems = categories.filter(c => c.id !== activeCategory);

  const displayCategories = activeItem
    ? [activeItem, ...otherItems]
    : categories;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [activeCategory]);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-2 
                 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {displayCategories.map(category => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? 'default' : 'ghost'}
          onClick={() => setActiveCategory(category.id)}
          className={`
            whitespace-nowrap rounded-full px-5 transition-all duration-200
            hover:bg-transparent hover:underline underline-offset-4
            ${
              activeCategory === category.id
                ? 'bg-amber-500 text-black hover:bg-amber-600 no-underline'
                : 'text-muted-foreground'
            }
          `}>
          {category.label}
        </Button>
      ))}
    </div>
  );
}
