import { Clock, MapPin, Phone, MessageCircle, Send, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { business } from '@/config'

export default function Contacts() {
  return (
    <section id="contacts" className="scroll-mt-20 border-t border-border bg-secondary/40 py-12 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="mb-8 sm:mb-12 max-w-2xl">
          <span className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Контакты
          </span>
          <h2 className="font-display mt-2 sm:mt-3 text-h2 font-bold uppercase">
            Как нас найти
          </h2>
        </div>

        <div className="grid gap-5 sm:gap-8 lg:grid-cols-[400px_1fr]">
          <div className="space-y-3 sm:space-y-4">
            <Card className="border-border/60">
              <CardContent className="flex gap-3 sm:gap-4 p-4 sm:p-5">
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <div className="font-semibold text-sm sm:text-base">Адрес</div>
                  <div className="mt-1 text-xs sm:text-sm text-muted-foreground">{business.address}</div>
                  <a
                    href={business.mapLink}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-primary hover:underline"
                  >
                    Построить маршрут
                    <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="flex gap-3 sm:gap-4 p-4 sm:p-5">
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div className="w-full">
                  <div className="font-semibold text-sm sm:text-base">Режим работы</div>
                  <ul className="mt-1.5 space-y-1">
                    {business.hours.map((h) => (
                      <li key={h.days} className="flex justify-between gap-2 sm:gap-4 text-xs sm:text-sm">
                        <span className="text-muted-foreground">{h.days}</span>
                        <span className="font-medium">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="flex gap-3 sm:gap-4 p-4 sm:p-5">
                <span className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div>
                  <div className="font-semibold text-sm sm:text-base">Связаться</div>
                  <a href={business.phoneHref} className="mt-1 block text-base sm:text-lg font-bold hover:text-primary">
                    {business.phone}
                  </a>
                  <div className="mt-2 sm:mt-3 flex flex-wrap gap-2">
                    <Button asChild size="sm" variant="outline" className="gap-1.5 text-xs sm:text-sm">
                      <a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noreferrer">
                        <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        WhatsApp
                      </a>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="gap-1.5 text-xs sm:text-sm">
                      <a href={`https://t.me/${business.telegram}`} target="_blank" rel="noreferrer">
                        <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Telegram
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="min-h-[280px] sm:min-h-[380px] overflow-hidden rounded-xl sm:rounded-2xl border border-border">
            <iframe
              title="Карта проезда"
              src={business.mapEmbed}
              className="h-full w-full min-h-[280px] sm:min-h-[380px] grayscale-[35%] contrast-[1.05]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}