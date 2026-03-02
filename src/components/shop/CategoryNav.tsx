'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';

// 1. 카테고리 아이디와 데이터의 타입을 명확하게 정의합니다.
type CategoryId = 'all' | 'odae' | 'brown' | 'large' | 'small' | 'gift';

interface Category {
  id: CategoryId;
  label: string;
}

// 2. 화면에 보여줄 쌀 카테고리 목록입니다.
const categories: Category[] = [
  {id: 'all', label: '전체보기'},
  {id: 'odae', label: '철원 오대쌀'},
  {id: 'brown', label: '현미/잡곡'},
  {id: 'large', label: '대용량(20kg)'},
  {id: 'small', label: '소포장(1kg)'},
  {id: 'gift', label: '선물세트'},
];

export default function CategoryNav() {
  // 3. 현재 어떤 카테고리가 눌렸는지 기억하는 장치입니다. 기본값은 "전체보기(all)" 입니다.
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  return (
    // 가로로 스크롤이 가능하도록 설정한 영역입니다. (모바일 화면 대비)
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map(category => (
        <Button
          key={category.id}
          // 클릭된 카테고리면 색상을 진하게("default"), 아니면 테두리만 있는 형태("outline")로 보여줍니다.
          variant={activeCategory === category.id ? 'default' : 'outline'}
          // 버튼을 클릭하면 현재 선택된 카테고리를 변경합니다.
          onClick={() => setActiveCategory(category.id)}
          className="whitespace-nowrap rounded-full px-5">
          {category.label}
        </Button>
      ))}
    </div>
  );
}
