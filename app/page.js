import HeroSection from '@/components/home/HeroSection'
import UpcomingShows from '@/components/home/UpcomingShows'
import FeaturedKomika from '@/components/home/FeaturedKomika'
import CTASection from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <div className="page-enter">
      <HeroSection />
      <UpcomingShows />
      <FeaturedKomika />
      <CTASection />
    </div>
  )
}
