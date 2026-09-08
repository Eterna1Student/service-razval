import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { priceGroups } from '@/config'

export default function PriceList() {
  return (
    <section id="prices" className="scroll-mt-20 py-20 sm:py-24">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Прайс-лист
          </span>
          <h2 className="font-display mt-3 text-4xl font-bold uppercase sm:text-5xl">Цены</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Цена называется до начала работ и не меняется в процессе.
            Запчасти и расходники — только с вашего согласия.
          </p>
        </div>

        <Tabs defaultValue={priceGroups[0].id}>
          <TabsList className="mb-6 flex h-auto flex-wrap justify-start gap-1 bg-secondary p-1">
            {priceGroups.map((g) => (
              <TabsTrigger
                key={g.id}
                value={g.id}
                className="px-5 py-2.5 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {g.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {priceGroups.map((g) => (
            <TabsContent key={g.id} value={g.id}>
              <Card className="border-border/60">
                <CardContent className="p-0">
                  <ul className="divide-y divide-border">
                    {g.rows.map((row, i) => (
                      <li
                        key={row.name}
                        className={`flex items-center justify-between gap-4 px-6 py-4 ${
                          i % 2 === 0 ? 'bg-muted/20' : ''
                        }`}
                      >
                        <span className="text-sm sm:text-base">{row.name}</span>
                        <span className="shrink-0 font-display text-lg font-semibold text-primary">
                          {row.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        <p className="mt-6 text-sm text-muted-foreground">
          * Точная стоимость для вашего автомобиля уточняется по VIN или госномеру — позвоните
          или напишите нам, ответим в течение 10 минут в рабочее время.
        </p>
      </div>
    </section>
  )
}
