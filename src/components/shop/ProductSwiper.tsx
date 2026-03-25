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
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        effect={'coverflow'}
        coverflowEffect={{
          rotate: 0, // 🔥 모바일 blur 줄이기
          stretch: 0,
          depth: 0,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          768: {
            effect: 'coverflow',
            coverflowEffect: {
              rotate: 20,
              stretch: 0,
              depth: 50,
              modifier: 1,
              slideShadows: false,
            },
          },
        }}
        pagination={{clickable: true}}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        touchStartPreventDefault={false}
        className="max-w-300 pb-14 touch-pan-y">
        {products.map(product => (
          <SwiperSlide key={product.id} className="max-w-[320px]">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
