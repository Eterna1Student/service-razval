import { useState } from 'react'
import { CalendarClock, MessageCircle, Phone, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { business, services } from '@/config'

export default function Booking() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [comment, setComment] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const message = () => {
    const lines = [
      `Запись в ${business.name}`,
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      service && `Услуга: ${services.find((s) => s.id === service)?.title ?? service}`,
      date && `Дата: ${date}`,
      time && `Время: ${time}`,
      comment && `Комментарий: ${comment}`,
    ].filter(Boolean)
    return lines.join('\n')
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: string[] = []
    if (name.trim().length < 2) errs.push('name')
    if (phone.replace(/\D/g, '').length < 10) errs.push('phone')
    setErrors(errs)
    if (errs.length === 0) setDialogOpen(true)
  }

  const waLink = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message())}`
  const tgLink = `https://t.me/${business.telegram}?text=${encodeURIComponent(message())}`

  return (
    <section id="booking" className="scroll-mt-20 border-y border-border bg-secondary/40 py-12 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-2">
          <div>
            <span className="font-display flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              <CalendarClock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Онлайн-запись
            </span>
            <h2 className="font-display mt-2 sm:mt-3 text-h2 font-bold uppercase">
              Запишитесь за минуту
            </h2>
            <p className="mt-3 sm:mt-4 max-w-md text-base sm:text-lg leading-relaxed text-muted-foreground">
              Оставьте заявку — перезвоним в течение 10 минут в рабочее время
              и подтвердим время. Или просто приезжайте: без записи
              принимаем по очереди, ожидание обычно не больше 15 минут.
            </p>
            <div className="mt-6 sm:mt-8 space-y-3">
              <a href={business.phoneHref} className="flex items-center gap-3 text-base sm:text-lg font-semibold hover:text-primary">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </span>
                {business.phone}
              </a>
              <div className="flex items-center gap-3 text-sm sm:text-base text-muted-foreground">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <MessageCircle className="h-5 w-5" />
                </span>
                WhatsApp и Telegram — отвечаем быстро
              </div>
            </div>
          </div>

          <Card className="border-border/60 shadow-2xl shadow-black/30">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <form onSubmit={submit} className="space-y-3 sm:space-y-4">
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="b-name" className="text-sm sm:text-base">Ваше имя *</Label>
                    <Input
                      id="b-name"
                      placeholder="Иван"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={errors.includes('name') ? 'border-destructive' : ''}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="b-phone" className="text-sm sm:text-base">Телефон *</Label>
                    <Input
                      id="b-phone"
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={errors.includes('phone') ? 'border-destructive' : ''}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm sm:text-base">Услуга</Label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="other">Другое / консультация</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="b-date" className="text-sm sm:text-base">Дата</Label>
                    <Input id="b-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="b-time" className="text-sm sm:text-base">Время</Label>
                    <Input id="b-time" type="time" min="09:00" max="20:00" value={time} onChange={(e) => setTime(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="b-comment" className="text-sm sm:text-base">Комментарий</Label>
                  <Textarea
                    id="b-comment"
                    placeholder="Марка и модель авто, пожелания…"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>

                {errors.length > 0 && (
                  <p className="text-xs sm:text-sm text-destructive">Заполните имя и телефон — без них мы не сможем подтвердить запись.</p>
                )}

                <Button type="submit" size="lg" className="w-full gap-2 font-bold">
                  <Send className="h-5 w-5" />
                  Отправить заявку
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl sm:text-2xl uppercase">Заявка готова!</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Отправьте её нам в мессенджер одним нажатием — текст уже составлен.
              Либо просто позвоните.
            </DialogDescription>
          </DialogHeader>
          <pre className="whitespace-pre-wrap rounded-lg border border-border bg-muted/50 p-3 sm:p-4 text-xs sm:text-sm">
            {message()}
          </pre>
          <div className="flex flex-col gap-2">
            <Button asChild size="lg" className="gap-2 font-bold">
              <a href={waLink} target="_blank" rel="noreferrer">
                <MessageCircle className="h-5 w-5" />
                Отправить в WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 font-semibold">
              <a href={tgLink} target="_blank" rel="noreferrer">
                <Send className="h-5 w-5" />
                Отправить в Telegram
              </a>
            </Button>
            <Button asChild variant="ghost" size="lg" className="gap-2">
              <a href={business.phoneHref}>
                <Phone className="h-5 w-5" />
                {business.phone}
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}