import Header from '@/sections/Header'
import Hero from '@/sections/Hero'
import Services from '@/sections/Services'
import Calculator from '@/sections/Calculator'
import PriceList from '@/sections/PriceList'
import Booking from '@/sections/Booking'
import Reviews from '@/sections/Reviews'
import Contacts from '@/sections/Contacts'
import Footer from '@/sections/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Calculator />
        <PriceList />
        <Booking />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </div>
  )
}
