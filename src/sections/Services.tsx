import { Check, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { services } from '@/config'
import oilImg from '@/assets/oil-change.jpg'
import alignmentImg from '@/assets/alignment.jpg'
import repairImg from '@/assets/repair.jpg'

const images: Record<string, string> = {
  oil: oilImg,
  alignment: alignmentImg,
  repair: repairImg,
}

export default function Services() {
  const withPhoto = services.filter((s) => s.id !== 'sale')
  const sale = services.find((s) => s.id === 'sale')!

  return (
    <section id="services" className="scroll-mt-20 py-12 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="mb-8 sm:mb-12 max-w-2xl">
          <span className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Что мы делаем
          </span>
          <h2 className="font-display mt-2 sm:mt-3 text-h2 font-bold uppercase">
            Услуги сервиса
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground">
            Специализируемся на обслуживании двигателя и ходовой части.
            Это позволяет делать работу быстро и держать цены ниже крупных сетей.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {withPhoto.map((service) => (
            <Card
              key={service.id}
              className="group overflow-hidden border-border/60 bg-card transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="relative h-40 sm:h-52 overflow-hidden">
                <img
                  src={images[service.id]}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <Badge className="absolute bottom-3 left-4 bg-primary text-primary-foreground font-bold text-xs sm:text-sm">
                  {service.price}
                </Badge>
              </div>
              <CardContent className="p-4 sm:p-6">
                <h3 className="font-display text-h3 font-semibold uppercase">{service.title}</h3>
                <p className="mt-2 sm:mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-3 sm:mt-4 space-y-2">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild variant="ghost" className="mt-4 sm:mt-5 -ml-3 gap-1.5 text-primary hover:text-primary">
                  <a href="#booking">
                    Записаться
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4 sm:mt-6 overflow-hidden border-primary/30 bg-gradient-to-br from-card to-secondary">
          <CardContent className="flex flex-col gap-4 sm:gap-6 p-4 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Badge className="mb-3 bg-primary text-primary-foreground font-bold text-xs sm:text-sm">{sale.price}</Badge>
              <h3 className="font-display text-h3 font-semibold uppercase">{sale.title}</h3>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">{sale.description}</p>
              <ul className="mt-3 sm:mt-4 grid gap-2 sm:grid-cols-3">
                {sale.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Button asChild size="lg" className="btn-mobile-full shrink-0 gap-2 font-bold">
              <a href="#calculator">
                Посчитать замену
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}