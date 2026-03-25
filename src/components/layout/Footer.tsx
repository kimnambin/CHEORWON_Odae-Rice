'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Phone, MapPin, User, ShieldCheck, Lock} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';

export default function Footer() {
  const router = useRouter();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const ADMIN_PWD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

  const handleAdminAccess = () => {
    if (password === ADMIN_PWD) {
      setIsAdminModalOpen(false);
      router.push('/admin');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <footer className="bg-stone-50 border-t border-stone-200 pt-8 pb-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h2 className="text-xl font-black text-stone-800 tracking-tighter">
              철원오대쌀{' '}
              <span className="text-amber-600 text-sm">Official</span>
            </h2>
            <p className="text-sm text-stone-500 leading-relaxed">
              강원도 철원의 맑은 물과 기름진 토양에서 자란
              <br />
              최고급 오대쌀만을 고집합니다. 갓 도정한 신선함을
              <br />
              여러분의 식탁까지 안전하게 배송해 드립니다.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-800 uppercase tracking-widest">
              Customer Care
            </h3>
            <ul className="space-y-3 text-sm text-stone-600">
              <li className="flex items-center gap-2">
                <User className="w-4 h-4 text-stone-400" /> 판매자: 박철원
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-400" /> 010-1234-5678 (평일
                09:00 - 18:00)
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-stone-400" /> 강원도 철원군
                동송읍 ...
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-stone-800 uppercase tracking-widest">
              Trust & Quality
            </h3>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-lg border border-stone-200 flex items-center justify-center text-[10px] text-center font-bold text-stone-400">
                HACCP
                <br />
                인증
              </div>
              <div className="w-12 h-12 bg-white rounded-lg border border-stone-200 flex items-center justify-center text-[10px] text-center font-bold text-stone-400">
                무농약
                <br />
                재배
              </div>
              <div className="w-12 h-12 bg-white rounded-lg border border-stone-200 flex items-center justify-center text-[10px] text-center font-bold text-stone-400">
                당일
                <br />
                도정
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-stone-400 italic">
            © 2026 Cheolwon Odae Rice. All rights reserved.
          </p>

          <div
            onDoubleClick={() => setIsAdminModalOpen(true)}
            className="group flex items-center gap-1 text-[10px] text-stone-300 cursor-default select-none hover:text-stone-400 transition-colors"
            title="접근 권한이 필요합니다">
            <ShieldCheck className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            Admin Access
          </div>
        </div>
      </div>

      {/* --- 💡 관리자 암호 확인 모달 --- */}
      <Dialog open={isAdminModalOpen} onOpenChange={setIsAdminModalOpen}>
        <DialogContent className="max-w-[320px] rounded-2xl border-none shadow-2xl bg-white">
          <DialogHeader className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
              <Lock className="w-6 h-6" />
            </div>
            <DialogTitle className="text-lg font-bold">관리자 인증</DialogTitle>
            <p className="text-xs text-stone-400">
              접근을 위해 비밀번호를 입력하세요.
            </p>
          </DialogHeader>

          <div className="py-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError(false);
              }}
              onKeyDown={e => e.key === 'Enter' && handleAdminAccess()}
              className={`text-center tracking-[0.5em] ${
                error ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
            />
            {error && (
              <p className="text-[10px] text-red-500 text-center mt-2">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              className="w-full bg-stone-900 text-white font-bold h-11 rounded-xl"
              onClick={handleAdminAccess}>
              입장하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
