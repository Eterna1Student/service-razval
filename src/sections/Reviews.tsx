import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { reviews } from '@/config'

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-x">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Отзывы
            </span>
            <h2 className="font-display mt-3 text-4xl font-bold uppercase sm:text-5xl">
              Нам доверяют свои автомобили
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-5 py-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </div>
            <div className="text-sm">
              <span className="font-display text-xl font-bold">4.9</span>
              <span className="text-muted-foreground"> — средняя оценка</span>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <Card key={r.name} className="border-border/60 transition-colors hover:border-primary/40">
              <CardContent className="p-6">
                <Quote className="h-6 w-6 text-primary/50" />
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.car}</div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
