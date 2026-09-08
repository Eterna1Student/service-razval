import { useEffect, useState } from 'react'
import { Droplets, Menu, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { business } from '@/config'

const nav = [
  { href: '#services', label: 'Услуги' },
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#prices', label: 'Цены' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Droplets className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold uppercase tracking-wide">
            {business.name}
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex font-semibold">
            <a href="#booking">Записаться</a>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex gap-2">
            <a href={business.phoneHref}>
              <Phone className="h-4 w-4" />
              {business.phone}
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Меню">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-1">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-4 py-3 text-base font-medium hover:bg-secondary"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-4 flex flex-col gap-2 px-4">
                  <Button asChild className="font-semibold">
                    <a href="#booking" onClick={() => setOpen(false)}>
                      Записаться онлайн
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={business.phoneHref}>
                      <Phone className="mr-2 h-4 w-4" />
                      {business.phone}
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
