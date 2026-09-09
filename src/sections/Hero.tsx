import { ArrowRight, Calculator, Clock, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { business, stats } from '@/config'
import heroImg from '@/assets/hero.jpg'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Автосервис — автомобиль на подъёмнике"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />

      <div className="container-x relative z-10 pb-14 pt-24 sm:pb-20 sm:pt-28 lg:pb-24">
        <div className="max-w-2xl">
          <Badge 
            variant="outline"
            className="badge-mobile mb-4 sm:mb-5 border-primary/40 bg-primary/10 px-3 py-1.5 sm:px-4 text-xs sm:text-sm font-semibold text-primary"
          >
            <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Работаем с записью и без — замена масла от 20 минут</span>
          </Badge>

          <h1 className="font-display text-balance text-hero font-bold uppercase">
            Замена масла и{' '}
            <span className="text-primary">развал-схождение</span>{' '}
            без переплат
          </h1>

          <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            {business.tagline}. Честные цены, масло вскрываем при вас,
            на 3D-стенде показываем распечатку до и после регулировки.
          </p>

          <div className="mt-6 sm:mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild size="lg" className="btn-mobile-full gap-2 text-base font-bold">
              <a href="#booking">
                Записаться онлайн
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-mobile-full gap-2 text-base font-semibold">
              <a href="#calculator">
                <Calculator className="h-5 w-5" />
                Рассчитать стоимость
              </a>
            </Button>
          </div>

          <div className="mt-5 sm:mt-6 flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            Гарантия на работы — 6 месяцев
          </div>
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-card/80 p-3 sm:p-5 backdrop-blur-sm">
              <div className="font-display text-xl sm:text-3xl font-bold text-primary">{s.value}</div>
              <div className="mt-1 text-xs sm:text-sm leading-snug text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}