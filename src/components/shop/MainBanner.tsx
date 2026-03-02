import {Button} from '@/components/ui/button';

export default function MainBanner() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-stone-100 overflow-hidden">
      {/* 배경 이미지 (실제 구현 시 Next/Image 활용) */}
      <div className="absolute inset-0 bg-black/20 z-10" />
      <div className="relative z-20 text-center text-white px-4">
        <span className="inline-block bg-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
          2026년 햅쌀 입고 완료
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-md">
          갓 수확한 자연의 선물,
          <br />
          철원 오대쌀
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          오늘 오후 2시 전 주문 시 당일 도정하여 보내드립니다.
        </p>
        <Button size="lg" className="rounded-full px-8 text-lg">
          지금 구매하기
        </Button>
      </div>
    </section>
  );
}
