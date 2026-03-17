import HeroSection from '@/components/home/HeroSection'
import UpcomingShows from '@/components/home/UpcomingShows'
import StatsSection from '@/components/home/StatsSection'
import FeaturedKomika from '@/components/home/FeaturedKomika'
import CTASection from '@/components/home/CTASection'
import FeaturedDownloads from '@/components/home/FeaturedDownloads'

export default function HomePage() {
  return (
    <div className="page-enter">
      <HeroSection />
      <StatsSection />
      <UpcomingShows />
      <FeaturedKomika />
      <FeaturedDownloads />
      <CTASection />
    </div>
  )
}
