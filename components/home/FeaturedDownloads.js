import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Download, Star, PlayCircle } from 'lucide-react'
import { downloads } from '@/lib/mockData'

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

export default function FeaturedDownloads() {
  const featured = downloads.filter((d) => d.isFeatured).slice(0, 4)

  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-black text-white">Digital Downloads</h2>
            <p className="text-gray-400 mt-2 text-sm">Rekaman special show komika lokal Tangerang — nikmati kapan saja</p>
          </div>
          <Link href="/download" className="flex items-center gap-1.5 text-brand-yellow text-sm font-semibold hover:gap-2.5 transition-all">
            Lihat Semua <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((item) => (
            <div
              key={item.id}
              className="group bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-yellow/30 hover:shadow-yellow-sm transition-all"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card/90 via-brand-card/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <PlayCircle className="w-12 h-12 text-brand-yellow" />
                </div>
                {item.isNew && (
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-semibold badge-orange">NEW</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white text-sm mb-0.5 line-clamp-1">{item.title}</h3>
                <p className="text-gray-400 text-xs mb-3">{item.artist} · {item.duration}</p>
                <div className="flex items-center justify-between">
                  <span className="text-brand-yellow font-bold text-sm">{formatPrice(item.price)}</span>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Download className="w-3.5 h-3.5" />
                    <span>{item.downloads.toLocaleString()}</span>
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
