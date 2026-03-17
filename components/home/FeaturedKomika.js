import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, Instagram } from 'lucide-react'
import { komika } from '@/lib/mockData'

const levelColors = {
  Senior: 'badge-yellow',
  Mid: 'badge-blue',
  Newbie: 'badge-green',
}

export default function FeaturedKomika() {
  const featured = komika.filter((k) => k.level === 'Senior').slice(0, 4)

  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>

            <h2 className="text-3xl lg:text-4xl font-black text-white">Komika Unggulan</h2>
            <p className="text-gray-400 mt-2 text-sm">Para komika terbaik komunitas StandupIndo Tangerang</p>
          </div>
          <Link href="/komika" className="flex items-center gap-1.5 text-brand-yellow text-sm font-semibold hover:gap-2.5 transition-all">
            Lihat Semua Komika <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((k) => (
            <div
              key={k.id}
              className="group bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-yellow/30 hover:shadow-yellow-sm transition-all"
            >
              {/* Photo */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={k.photo}
                  alt={k.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent" />
                <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold ${levelColors[k.level]}`}>
                  {k.level}
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-white mb-0.5">{k.name}</h3>
                <p className="text-brand-yellow text-xs font-medium mb-2">"{k.nickname}"</p>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-3">{k.bio}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Star className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
                    <span className="font-semibold text-white">{k.rating}</span>
                    <span>· {k.shows} show</span>
                  </div>
                  <span className="text-xs text-gray-500">{k.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
