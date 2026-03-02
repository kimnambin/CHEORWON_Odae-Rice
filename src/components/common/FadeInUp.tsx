'use client';

import {motion} from 'framer-motion';
import {ReactNode} from 'react';

// 아무 컴포넌트나 감쌀 수 있도록 ReactNode 타입
interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
}

export default function FadeInUp({children, delay = 0}: FadeInUpProps) {
  return (
    <motion.div
      // 1. 처음 상태: 투명도 0(안 보임), 아래로 50px 내려가 있음
      initial={{opacity: 0, y: 50}}
      // 2. 화면에 나타날 때 상태: 투명도 1(완전 선명함), 원래 위치(0)로 복귀
      whileInView={{opacity: 1, y: 0}}
      // 3. 설정: 화면에 한 번 나타나면 다시 숨기지 않음(once: true),
      // 화면 하단에서 100px 정도 더 올라왔을 때 실행(margin)
      viewport={{once: true, margin: '-100px'}}
      // 4. 애니메이션 속도: 0.6초 동안 부드럽게, 딜레이 설정 가능
      transition={{duration: 0.6, delay: delay, ease: 'easeOut'}}>
      {children}
    </motion.div>
  );
}
