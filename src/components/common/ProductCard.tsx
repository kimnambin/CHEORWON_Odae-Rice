// 상품 카드 컴포넌트
// 쌀 상품을 보여줄 때 사용

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import Image from 'next/image';

// 상품 데이터 타입 정의
interface RiceProduct {
  id: string;
  name: string;
  price: number;
  weight: number;
  millingDate: string;
  isBest?: boolean;
  imageUrl: string;
}

interface ProductCardProps {
  product: RiceProduct;
}

export default function ProductCard({product}: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0 relative">
        {product.isBest && (
          <Badge className="absolute top-2 left-2 z-10" variant="destructive">
            BEST
          </Badge>
        )}
        <div className="aspect-square relative bg-muted">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-1">
          {product.weight}kg | 도정: {product.millingDate}
        </div>
        <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
        <p className="font-bold text-xl text-primary">
          {product.price.toLocaleString()}원
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">장바구니 담기</Button>
      </CardFooter>
    </Card>
  );
}
