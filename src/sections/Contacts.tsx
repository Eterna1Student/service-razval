import { Clock, MapPin, Phone, MessageCircle, Send, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { business } from '@/config'

export default function Contacts() {
  return (
    <section id="contacts" className="scroll-mt-20 border-t border-border bg-secondary/40 py-20 sm:py-24">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Контакты
          </span>
          <h2 className="font-display mt-3 text-4xl font-bold uppercase sm:text-5xl">
            Как нас найти
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
          <div className="space-y-4">
            <Card className="border-border/60">
              <CardContent className="flex gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold">Адрес</div>
                  <div className="mt-1 text-sm text-muted-foreground">{business.address}</div>
                  <a
                    href={business.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Построить маршрут
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="flex gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="w-full">
                  <div className="font-semibold">Режим работы</div>
                  <ul className="mt-1.5 space-y-1">
                    {business.hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">{h.days}</span>
                        <span className="font-medium">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="flex gap-4 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-semibold">Связаться</div>
                  <a href={business.phoneHref} className="mt-1 block text-lg font-bold hover:text-primary">
                    {business.phone}
                  </a>
                  <div className="mt-3 flex gap-2">
                    <Button asChild size="sm" variant="outline" className="gap-1.5">
                      <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noreferrer">
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="gap-1.5">
                      <a href={`https://t.me/${business.telegram}`} target="_blank" rel="noreferrer">
                        <Send className="h-4 w-4" />
                        Telegram
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="min-h-[380px] overflow-hidden rounded-2xl border border-border">
            <iframe
              title="Карта проезда"
              src={business.mapEmbed}
              className="h-full w-full min-h-[380px] grayscale-[35%] contrast-[1.05]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
