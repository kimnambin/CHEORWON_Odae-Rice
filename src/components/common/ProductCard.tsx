'use client';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

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
    <Link href={`/products/${product.id}`} className="block h-full group">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full border-stone-200">
        <CardHeader className="p-0 relative">
          {product.isBest && (
            <Badge className="absolute top-3 left-3 z-10 bg-red-500 border-none shadow-sm">
              BEST
            </Badge>
          )}
          <div className="aspect-square relative bg-muted overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </CardHeader>

        <CardContent className="p-5">
          <div className="text-sm text-stone-500 mb-2 flex items-center gap-2">
            <span className="bg-stone-100 px-2 py-0.5 rounded text-xs font-semibold">
              {product.weight}kg
            </span>
            <span>도정: {product.millingDate}</span>
          </div>
          <CardTitle className="text-xl mb-3 font-bold line-clamp-1">
            {product.name}
          </CardTitle>
          <p className="font-bold text-2xl text-amber-600">
            {product.price.toLocaleString()}원
          </p>
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <div
            className="w-full rounded-full text-lg font-bold py-3 text-center
                       bg-amber-500 text-black 
                       group-hover:bg-amber-600 group-hover:underline 
                       transition-all duration-300 shadow-md">
            구매하기
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
