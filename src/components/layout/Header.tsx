'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {ShoppingCart, User, Search, Menu, X} from 'lucide-react';
import {Button} from '@/components/ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  w-full`}>
      <div
        className={`container mx-auto py-3 flex items-center justify-between transition-all w-full ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg border border-stone-200'
            : 'bg-black/20 backdrop-blur-sm border border-white/10'
        }`}>
        <Link href="/" className="flex items-center gap-2">
          <span
            className={`text-2xl font-black tracking-tighter ml-4 ${
              isScrolled ? 'text-amber-600' : 'text-black/90'
            }`}>
            철원오대쌀
          </span>
        </Link>

        {/*  데스크탑 메뉴 */}
        <nav
          className={`hidden md:flex items-center gap-8 font-medium ${
            isScrolled ? 'text-stone-700' : 'text-black/90'
          }`}>
          <Link
            href="/#products-section"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-bold">
            상품보기
          </Link>

          <Link
            href="/brand"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-bold">
            문의하기
          </Link>
        </nav>

        {/* 우측 아이콘 메뉴 */}
        <div
          className={`flex items-center gap-2 ${
            isScrolled ? 'text-stone-700' : 'text-black'
          }`}>
          <Button variant="ghost" size="icon" className="hover:bg-amber-50/20">
            <Search className="w-5 h-5" />
          </Button>
          <Link href="/cart">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-amber-50/20">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1 right-1 bg-amber-500 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex hover:bg-amber-50/20">
            <User className="w-5 h-5" />
          </Button>

          {/* 모바일 메뉴 버튼 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/*  모바일 전체화면 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-stone-100 py-6 px-4 flex flex-col gap-4 shadow-xl">
          <Link
            href="/#products-section"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-bold">
            상품보기
          </Link>
          <Link
            href="/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-bold flex justify-between">
            장바구니 <span className="text-amber-600">0</span>
          </Link>
          <Link
            href="/brand"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-lg font-bold">
            문의하기
          </Link>
        </div>
      )}
    </header>
  );
}
