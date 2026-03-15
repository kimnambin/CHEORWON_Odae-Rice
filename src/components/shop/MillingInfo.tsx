import {Card, CardContent} from '@/components/ui/card';

export default function MillingInfo() {
  return (
    <section className="bg-stone-50 rounded-3xl p-8 md:p-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold mb-2">당일 도정 원칙</h2>
        <p className="text-muted-foreground">
          맛있는 밥맛의 비결은 도정 시기에 있습니다.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {title: '현미', desc: '영양소가 풍부한 상태'},
          {title: '5분도/7분도', desc: '건강과 맛의 밸런스'},
          {title: '백미(9분도)', desc: '가장 부드럽고 찰진 맛'},
        ].map((item, index) => (
          <Card
            key={index}
            className="border-none shadow-none bg-transparent text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-2xl border-2 border-stone-200">
                🌾
              </div>
              <h3 className="font-bold mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
