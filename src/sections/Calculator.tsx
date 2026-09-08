import { useMemo, useState } from 'react'
import { Calculator as CalcIcon, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Separator } from '@/components/ui/separator'
import { calculator as calc } from '@/config'

const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

export default function Calculator() {
  const [oilType, setOilType] = useState(calc.oilTypes[1].id)
  const [volume, setVolume] = useState(calc.volumes[1].id)
  const [extras, setExtras] = useState<string[]>(
    calc.extras.filter((e) => e.defaultChecked).map((e) => e.id),
  )
  const [alignment, setAlignment] = useState('none')
  const [ownOil, setOwnOil] = useState(false)

  const result = useMemo(() => {
    const lines: { label: string; price: number }[] = []
    const vol = calc.volumes.find((v) => v.id === volume)!
    if (!ownOil) {
      const oil = calc.oilTypes.find((o) => o.id === oilType)!
      lines.push({
        label: `Масло ${oil.label.toLowerCase()}, ${vol.liters} л`,
        price: Math.round(oil.perLiter * vol.liters),
      })
    } else {
      lines.push({ label: 'Своё масло — оплачивается только работа', price: 0 })
    }
    lines.push({ label: 'Работа по замене масла', price: calc.workPrice })
    calc.extras.forEach((e) => {
      if (extras.includes(e.id)) lines.push({ label: e.label, price: e.price })
    })
    const al = calc.alignmentOptions.find((a) => a.id === alignment)!
    if (al.price > 0) lines.push({ label: `Развал-схождение (${al.label.split('—')[0].trim()})`, price: al.price })
    const total = lines.reduce((sum, l) => sum + l.price, 0)
    return { lines, total }
  }, [oilType, volume, extras, alignment, ownOil])

  const toggleExtra = (id: string) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  return (
    <section id="calculator" className="scroll-mt-20 border-y border-border bg-secondary/40 py-20 sm:py-24">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <span className="font-display flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            <CalcIcon className="h-4 w-4" />
            Калькулятор
          </span>
          <h2 className="font-display mt-3 text-4xl font-bold uppercase sm:text-5xl">
            Сколько будет стоить?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Соберите свою услугу — итоговая цена совпадёт с той, что мы назовём в сервисе.
            Без скрытых доплат.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-8">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="font-display text-xl uppercase">1. Масло</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
                  <Checkbox id="ownOil" checked={ownOil} onCheckedChange={(v) => setOwnOil(v === true)} />
                  <Label htmlFor="ownOil" className="cursor-pointer leading-snug">
                    Привезу своё масло
                    <span className="block text-sm text-muted-foreground">оплачивается только работа и фильтры</span>
                  </Label>
                </div>
                {!ownOil && (
                  <RadioGroup value={oilType} onValueChange={setOilType} className="grid gap-3 sm:grid-cols-3">
                    {calc.oilTypes.map((o) => (
                      <Label
                        key={o.id}
                        htmlFor={`oil-${o.id}`}
                        className={`flex cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-colors ${
                          oilType === o.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <RadioGroupItem value={o.id} id={`oil-${o.id}`} />
                          <span className="font-semibold">{o.label}</span>
                        </span>
                        <span className="pl-6 text-sm text-muted-foreground">{fmt(o.perLiter)}/л</span>
                      </Label>
                    ))}
                  </RadioGroup>
                )}
                <div>
                  <p className="mb-3 text-sm font-semibold text-muted-foreground">Объём двигателя</p>
                  <RadioGroup value={volume} onValueChange={setVolume} className="grid gap-3 sm:grid-cols-3">
                    {calc.volumes.map((v) => (
                      <Label
                        key={v.id}
                        htmlFor={`vol-${v.id}`}
                        className={`flex cursor-pointer items-center gap-2 rounded-lg border p-4 text-sm transition-colors ${
                          volume === v.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'
                        }`}
                      >
                        <RadioGroupItem value={v.id} id={`vol-${v.id}`} />
                        {v.label}
                      </Label>
                    ))}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="font-display text-xl uppercase">2. Фильтры и дополнительно</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                {calc.extras.map((e) => (
                  <Label
                    key={e.id}
                    htmlFor={`ex-${e.id}`}
                    className={`flex cursor-pointer flex-col gap-1 rounded-lg border p-4 transition-colors ${
                      extras.includes(e.id) ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'
                    }`}
                  >
                    <span className="flex items-center gap-2 font-semibold">
                      <Checkbox
                        id={`ex-${e.id}`}
                        checked={extras.includes(e.id)}
                        onCheckedChange={() => toggleExtra(e.id)}
                      />
                      {e.label}
                    </span>
                    <span className="pl-6 text-sm text-muted-foreground">{fmt(e.price)}</span>
                  </Label>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="font-display text-xl uppercase">3. Развал-схождение 3D</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={alignment} onValueChange={setAlignment} className="grid gap-3 sm:grid-cols-4">
                  {calc.alignmentOptions.map((a) => (
                    <Label
                      key={a.id}
                      htmlFor={`al-${a.id}`}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border p-4 text-sm transition-colors ${
                        alignment === a.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <RadioGroupItem value={a.id} id={`al-${a.id}`} />
                      {a.label}
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Итог */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Card className="border-primary/40 bg-card shadow-xl shadow-primary/5">
              <CardHeader>
                <CardTitle className="font-display text-2xl uppercase">Ваш расчёт</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {result.lines.map((line) => (
                    <li key={line.label} className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-muted-foreground">{line.label}</span>
                      <span className="shrink-0 font-semibold">
                        {line.price > 0 ? fmt(line.price) : '—'}
                      </span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-4" />
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-lg font-semibold uppercase">Итого</span>
                  <span className="font-display text-4xl font-bold text-primary">{fmt(result.total)}</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Точная стоимость зависит от модели авто — подтвердим по телефону
                  до начала работ. Расхождений с калькулятором не будет.
                </p>
                <Button asChild className="mt-5 w-full gap-2 font-bold" size="lg">
                  <a href="#booking">
                    Записаться на эту услугу
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
