import ProductCard from '@/components/common/ProductCard';

const mockProducts = [
  {
    id: '1',
    name: '철원 오대쌀 (특등급)',
    price: 35000,
    weight: 10,
    millingDate: '2026-02-23',
    isBest: true,
    imageUrl: '',
  },
];

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">인기 쌀 상품</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
