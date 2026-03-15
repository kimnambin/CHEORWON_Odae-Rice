'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Card, CardContent} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Truck, UserCheck, CheckCircle2, X, CreditCard} from 'lucide-react';
import DaumPostcode from 'react-daum-postcode';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';

export default function CheckoutPage() {
  // 입력 폼 상태 관리
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // 본인 인증 상태 관리
  const [isVerified, setIsVerified] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

  // 주소 상태 관리
  const [zonecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState('card');

  // 유효성 검사
  const isValidName = name.trim().length >= 2;
  const isValidPhone = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/.test(
    phone,
  );

  // 인증 버튼이 활성화 조건
  const canRequestAuth = isValidName && isValidPhone;

  // 인증번호 발송
  const handleRequestAuth = () => {
    alert("테스트용 인증번호 '1234'가 발송되었습니다.");
    setShowCodeInput(true);
  };

  // 인증번호 확인
  const handleVerifyAuth = () => {
    setIsVerified(true);
    setShowCodeInput(false);
    alert('본인인증이 완료되었습니다.');
  };

  // 카카오 우편번호 검색 완료 시 실행되는 함수
  const handleCompletePostcode = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') extraAddress += data.bname;
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setZonecode(data.zonecode);
    setAddress(fullAddress);
    setIsPostcodeOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-28 max-w-5xl">
      <h1 className="text-3xl font-bold mb-10 text-stone-800">주문서 작성</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* 주문 상품 */}
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-600" /> 주문 상품
            </h2>
            <Card className="border-stone-200">
              <CardContent className="p-6">
                <p className="font-bold text-lg">철원 오대쌀 (특등급) 10kg</p>
                <p className="font-bold text-amber-600">35,000원</p>
              </CardContent>
            </Card>
          </section>

          {/* 받는 사람 정보 & 본인인증 */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-600" /> 주문자 정보 및
              본인인증
            </h2>

            <div className="grid grid-cols-1 gap-4 bg-stone-50 p-6 rounded-2xl border border-stone-200">
              <div className="space-y-2">
                <Label>이름</Label>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="실명을 입력해주세요 (2자 이상)"
                  disabled={isVerified}
                />
              </div>

              <div className="space-y-2">
                <Label>휴대폰 번호</Label>
                <div className="flex gap-2 transition-all duration-300">
                  <Input
                    value={phone}
                    onChange={e =>
                      setPhone(e.target.value.replace(/[^0-9-]/g, ''))
                    }
                    placeholder="숫자만 입력 (01012345678)"
                    disabled={isVerified}
                    maxLength={13}
                  />

                  {canRequestAuth && (
                    <Button
                      onClick={handleRequestAuth}
                      disabled={isVerified}
                      variant={isVerified ? 'outline' : 'default'}
                      className={`animate-in fade-in slide-in-from-right-4 whitespace-nowrap ${
                        isVerified
                          ? 'text-green-600 border-green-600'
                          : 'bg-amber-500 hover:bg-amber-600 text-black'
                      }`}>
                      {isVerified ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-1" /> 인증완료
                        </>
                      ) : (
                        '인증번호 받기'
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* 인증번호 입력칸 */}
              {showCodeInput && !isVerified && (
                <div className="flex gap-2 mt-2 animate-in fade-in slide-in-from-top-2">
                  <Input placeholder="인증번호 4자리 입력" maxLength={4} />
                  <Button onClick={handleVerifyAuth} variant="secondary">
                    확인
                  </Button>
                </div>
              )}
            </div>

            {/* 카카오 주소 찾기 영역 */}
            <div className="space-y-3 mt-4">
              <Label>배송지 주소</Label>
              <div className="flex gap-2">
                <Input
                  className="flex-1 bg-white"
                  value={zonecode}
                  placeholder="우편번호"
                  readOnly
                />
                <Button
                  variant="outline"
                  onClick={() => setIsPostcodeOpen(true)}>
                  주소 찾기
                </Button>
              </div>
              <Input
                className="bg-white"
                value={address}
                placeholder="기본 주소"
                readOnly
              />
              <Input
                value={detailAddress}
                onChange={e => setDetailAddress(e.target.value)}
                placeholder="상세 주소를 입력해주세요"
              />
            </div>
          </section>
        </div>

        {/* 결제 금액 부분  */}
        <div className="flex flex-col gap-6">
          <Card className="sticky top-28 border-stone-200 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-6">최종 결제 금액</h2>
              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-500">상품 금액</span>
                  <span>35,000원</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">배송비</span>
                  <span>무료</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-xl font-bold text-amber-600">
                  <span>총 결제 금액</span>
                  <span>35,000원</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-600" /> 결제 수단
                </h3>

                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-1 gap-3">
                  {/*  신용/체크카드 옵션 */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer
                      ${
                        paymentMethod === 'card'
                          ? 'border-amber-500 bg-amber-50/50'
                          : 'border-stone-200 bg-white hover:border-amber-200'
                      }
                    `}>
                    <RadioGroupItem
                      value="card"
                      id="card"
                      className={
                        paymentMethod === 'card'
                          ? 'border-amber-500 text-amber-600'
                          : ''
                      }
                    />
                    <Label
                      htmlFor="card"
                      className="flex-1 cursor-pointer font-bold text-stone-700">
                      신용/체크카드{' '}
                      <span className="text-xs font-normal text-stone-400 ml-1">
                        (포트원 연동)
                      </span>
                    </Label>
                  </div>

                  {/*  카카오페이 옵션 */}
                  <div
                    onClick={() => setPaymentMethod('kakao')}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer
                      ${
                        paymentMethod === 'kakao'
                          ? 'border-[#FEE500] bg-[#FEE500]/10'
                          : 'border-stone-200 bg-white hover:border-[#FEE500]/50'
                      }
                    `}>
                    <RadioGroupItem
                      value="kakao"
                      id="kakao"
                      className={
                        paymentMethod === 'kakao'
                          ? 'border-[#FEE500] text-[#FEE500]'
                          : ''
                      }
                    />
                    <Label
                      htmlFor="kakao"
                      className="flex-1 cursor-pointer font-bold text-stone-700">
                      카카오페이
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button className="w-full mt-8 bg-amber-500 hover:bg-amber-600 text-black font-bold h-14 text-lg rounded-xl transition-all hover:scale-105">
                결제하기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/*  주소 검색 모달 팝업 */}
      {isPostcodeOpen && (
        <div className="fixed inset-0 z-100 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="p-4 bg-stone-100 flex justify-between items-center border-b">
              <h3 className="font-bold">주소 검색</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPostcodeOpen(false)}
                className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>
            {/*  우편번호 컴포넌트 */}
            <div className="h-100">
              <DaumPostcode
                onComplete={handleCompletePostcode}
                style={{width: '100%', height: '100%'}}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
