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
import {text} from 'stream/consumers';

export default function Footer() {
  const router = useRouter();
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  // const ADMIN_PWD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
  const ADMIN_PWD = 1101; // TODO : 현재는 하드코딩

  const handleAdminAccess = () => {
    const ADMIN_PWD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (password === ADMIN_PWD) {
      sessionStorage.setItem('admin_unlocked', 'true');
      setIsAdminModalOpen(false);
      router.push('/admin');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <footer className="bg-stone-50 border-t border-stone-200 py-4">
      <div className="container mx-auto px-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-4">
          <div className="space-y-2">
            <h2 className="text-lg font-black text-stone-800 tracking-tighter">
              철원오대쌀{' '}
              <span className="text-amber-600 text-xs">Official</span>
            </h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              강원도 철원의 맑은 물과 기름진 토양에서 자란
              <br />
              최고급 오대쌀만을 고집합니다.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-widest">
              Customer Care
            </h3>
            <ul className="space-y-1 text-xs text-stone-600">
              <li className="flex items-center gap-2">
                <User className="w-3 h-3 text-stone-400" /> 판매자: 박철원
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3 h-3 text-stone-400" /> 010-1234-5678
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-stone-400" /> 강원도 철원군
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-bold text-stone-800 uppercase tracking-widest">
              Trust
            </h3>
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-white rounded-md border text-[9px] flex items-center justify-center text-center">
                HACCP
              </div>
              <div className="w-10 h-10 bg-white rounded-md border text-[9px] flex items-center justify-center text-center">
                무농약
              </div>
              <div className="w-10 h-10 bg-white rounded-md border text-[9px] flex items-center justify-center text-center">
                당일도정
              </div>
            </div>

            <p className="text-[10px] text-stone-400">
              © 2026 Cheolwon Odae Rice
            </p>

            <div
              onDoubleClick={() => setIsAdminModalOpen(true)}
              className="group flex items-center gap-1 text-[10px] text-stone-300 cursor-default select-none hover:text-stone-400 transition-colors"
              title="접근 권한이 필요합니다">
              {' '}
              <ShieldCheck className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />{' '}
              Admin Access{' '}
            </div>
          </div>
        </div>
      </div>

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
              // 💡 이 부분이 수정되었습니다. 백틱(`)과 ${}를 확인하세요!
              className={`text-center tracking-[0.5em] ${
                error ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
            />
            {error && (
              <p className="text-[10px] text-red-500 text-center mt-2 font-bold">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              className="w-full bg-stone-900 text-white font-bold h-11 rounded-xl hover:bg-stone-800"
              onClick={handleAdminAccess}>
              입장하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </footer>
  );
}
