import MainBanner from '@/components/shop/MainBanner';
import CategoryNav from '@/components/shop/CategoryNav';
import ProductCard from '@/components/common/ProductCard';
import MillingInfo from '@/components/shop/MillingInfo';
import FadeInUp from '@/components/common/FadeInUp';

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
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      {/* 1. 비주얼 배너 섹션 */}
      <MainBanner />

      <main className="container mx-auto px-4 flex flex-col gap-16">
        {/* 2. 카테고리 네비게이션 */}
        <FadeInUp>
          {' '}
          <section>
            <h2 className="text-xl font-semibold mb-6">
              어떤 쌀을 찾으시나요?
            </h2>
            <CategoryNav />
          </section>
        </FadeInUp>

        {/* 3. 베스트 상품 섹션 */}
        <FadeInUp delay={0.2}>
          {' '}
          <section>
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold">인기 쌀 상품</h2>
                <p className="text-muted-foreground mt-2">
                  지금 가장 많은 선택을 받고 있는 쌀입니다.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </FadeInUp>

        {/* 4. 도정 정보 안내 (신뢰 섹션) */}
        <FadeInUp delay={0.3}>
          <MillingInfo />
        </FadeInUp>
      </main>
    </div>
  );
}
