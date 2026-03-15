import {Button} from '@/components/ui/button';

export default function MainBanner() {
  const scrollToProducts = () => {
    document.getElementById('products-section')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-stone-100 overflow-hidden">
      {/* 뒷 배경 이미지 */}
      <video
        src="/video/bg.mp4"
        autoPlay // 자동 재생
        loop // 무한 반복
        muted
        playsInline
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 text-center text-white px-4">
        <span className="inline-block bg-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
          2026년 햅쌀 입고 완료
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-md">
          철원 오대쌀
        </h1>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          직접 농사 지어 품질을 보장합니다.
        </p>
        <Button
          onClick={scrollToProducts}
          size="lg"
          className="rounded-full px-10 text-xl font-bold
                     bg-amber-500 text-black 
                     hover:bg-amber-600 hover:underline hover:scale-105 
                     transition-all duration-300">
          지금 구매하기
        </Button>
      </div>
    </section>
  );
}
