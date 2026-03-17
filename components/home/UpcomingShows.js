import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Clock, Users, ArrowRight, Ticket } from 'lucide-react'
import { shows } from '@/lib/mockData'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

const typeColors = {
  'Open Mic': 'badge-green',
  'Special Show': 'badge-yellow',
  'Workshop': 'badge-blue',
}

export default function UpcomingShows() {
  const upcoming = shows.slice(0, 4)

  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-brand-yellow text-xs font-bold tracking-widest uppercase mb-2">🎤 Agenda</p>
            <h2 className="text-3xl lg:text-4xl font-black text-white">Upcoming Shows</h2>
            <p className="text-gray-400 mt-2 text-sm">Jangan sampai ketinggalan momen terbaik komunitas</p>
          </div>
          <Link
            href="/jadwal"
            className="flex items-center gap-1.5 text-brand-yellow text-sm font-semibold hover:gap-2.5 transition-all"
          >
            Lihat Semua Jadwal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {upcoming.map((show, i) => (
            <div
              key={show.id}
              className={`group relative bg-brand-card rounded-2xl overflow-hidden border transition-all hover:border-brand-yellow/30 hover:shadow-yellow-sm ${
                i === 0 ? 'border-brand-yellow/20' : 'border-brand-border'
              }`}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={show.image}
                  alt={show.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/30 to-transparent" />
                {/* Type badge */}
                <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${typeColors[show.type] || 'badge-yellow'}`}>
                  {show.type}
                </div>
                {show.isRecurring && (
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold badge-blue">
                    {show.recurringLabel}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-bold text-white text-base mb-3 line-clamp-2 group-hover:text-brand-yellow transition-colors">
                  {show.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 text-brand-yellow shrink-0" />
                    <span>{format(parseISO(show.date), 'EEEE, d MMMM yyyy', { locale: id })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4 text-brand-yellow shrink-0" />
                    <span>{show.time} – {show.endTime} WIB</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4 text-brand-yellow shrink-0" />
                    <span className="line-clamp-1">{show.venue}, {show.area}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                  <div className="flex items-center gap-1.5 text-sm">
                    <Ticket className="w-4 h-4 text-gray-400" />
                    <span className={show.priceNum === 0 ? 'text-green-400 font-semibold' : 'text-brand-yellow font-semibold'}>
                      {show.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Users className="w-3.5 h-3.5" />
                    <span>{show.bookedSlots}/{show.slots} slot</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
