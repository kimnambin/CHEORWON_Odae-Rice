'use client';

import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCoverflow, Pagination, Navigation} from 'swiper/modules';
import ProductCard from '@/components/common/ProductCard';

// Swiper 스타일 불러오기
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 상품 데이터 타입 (기존과 동일)
interface RiceProduct {
  id: string;
  name: string;
  price: number;
  weight: number;
  millingDate: string;
  isBest?: boolean;
  imageUrl: string;
}

interface ProductSwiperProps {
  products: RiceProduct[];
}

export default function ProductSwiper({products}: ProductSwiperProps) {
  return (
    <div className="w-full py-10">
      <Swiper
        effect={'coverflow'} // 💡 핵심: 커버플로우 효과
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'} // 카드가 겹쳐 보이려면 auto가 좋습니다.
        coverflowEffect={{
          rotate: 50, // 회전 각도
          stretch: 0, // 카드 간의 거리 (겹침 정도)
          depth: 100, // 깊이감 (뒤로 얼마나 물러날지)
          modifier: 1, // 효과 배수
          slideShadows: true, // 카드 옆면 그림자
        }}
        pagination={{clickable: true}}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        touchStartPreventDefault={false}
        className="max-w-300 pb-14! touch-pan-y">
        {products.map(product => (
          <SwiperSlide key={product.id} className="max-w-[320px]">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 💡 Swiper 기본 화살표 색상 커스텀 (CSS) */}
      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #f59e0b !important; /* amber-500 색상 */
        }
        .swiper-pagination-bullet-active {
          background: #f59e0b !important;
        }
      `}</style>
    </div>
  );
}
