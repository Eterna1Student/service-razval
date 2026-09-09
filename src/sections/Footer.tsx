import { Droplets, Phone } from 'lucide-react'
import { business } from '@/config'

export default function Footer() {
  return (
    <footer className="border-t border-border py-6 sm:py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 sm:gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Droplets className="h-4 w-4" />
          </span>
          <div>
            <div className="font-display font-semibold uppercase text-sm sm:text-base">{business.name}</div>
            <div className="text-xs text-muted-foreground">{business.tagline}</div>
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
          <a href="#services" className="hover:text-primary">Услуги</a>
          <a href="#calculator" className="hover:text-primary">Калькулятор</a>
          <a href="#prices" className="hover:text-primary">Цены</a>
          <a href="#reviews" className="hover:text-primary">Отзывы</a>
          <a href="#contacts" className="hover:text-primary">Контакты</a>
        </nav>

        <a href={business.phoneHref} className="flex items-center gap-2 text-sm sm:text-base font-semibold hover:text-primary">
          <Phone className="h-4 w-4" />
          {business.phone}
        </a>
      </div>
      <div className="container-x mt-4 sm:mt-8 border-t border-border pt-4 sm:pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {business.name}. Все права защищены.
      </div>
    </footer>
  )
}