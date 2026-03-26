'use client';

import {useState, useEffect} from 'react';
import {Lock} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function AdminLayout({children}: {children: React.ReactNode}) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // 1. 세션 스토리지 확인
    const unlocked = sessionStorage.getItem('admin_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
    setIsChecking(false);
  }, []);

  const handleUnlock = () => {
    // 💡 환경변수가 없다면 임시로 '1101' 사용 (테스트용)
    const ADMIN_PWD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || '1101';

    if (password === ADMIN_PWD) {
      sessionStorage.setItem('admin_unlocked', 'true');
      setIsUnlocked(true);
    } else {
      setError(true);
      setPassword('');
    }
  };

  // 💡 [중요] 체크 중일 때는 아무것도 보여주지 않음 (깜빡임 방지)
  if (isChecking) {
    return <div className="min-h-screen bg-stone-50" />;
  }

  // 💡 [핵심] 잠금 상태라면 절대로 children(관리자 페이지 내용)을 보여주지 않고 잠금 화면만 리턴!
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4 fixed inset-0 z-">
        <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full space-y-6 flex flex-col items-center border border-stone-200">
          <div className="w-16 h-16 bg-stone-50 text-stone-600 rounded-full flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-stone-800">관리자 접근</h1>
            <p className="text-sm text-stone-500">
              비밀번호를 입력해야 입장할 수 있습니다.
            </p>
          </div>
          <div className="w-full space-y-3">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                setError(false);
              }}
              onKeyDown={e => e.key === 'Enter' && handleUnlock()}
              className={`text-center tracking-[0.5em] h-12 ${
                error ? 'border-red-500 focus-visible:ring-red-500' : ''
              }`}
            />
            {error && (
              <p className="text-[10px] text-red-500 text-center font-bold">
                비밀번호가 틀렸습니다.
              </p>
            )}
            <Button
              onClick={handleUnlock}
              className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold h-12 rounded-xl">
              잠금 해제
            </Button>
            <Link href="/">
              <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold h-12 rounded-xl">
                돌아 가기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 💡 모든 관문을 통과했을 때만 관리자 페이지 내용(children)을 보여줌
  return <div className="min-h-screen bg-stone-50">{children}</div>;
}
