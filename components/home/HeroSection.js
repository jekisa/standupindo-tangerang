'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Mic, MapPin, Calendar, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Background photo */}
      <Image
        src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1920&q=80"
        alt="Komika Tangerang"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Gradient overlay — only darkens bottom so image shows at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

      {/* Subtle yellow tint at bottom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,215,0,0.08)_0%,transparent_60%)]" />

      {/* Content — anchored to bottom */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pb-20 pt-32">
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-4 animate-slide-up">
            TERTAWA
            <br />
            <span className="gradient-text text-glow">BERSAMA</span>
            <br />
            <span className="text-white/40 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-widest uppercase">Tangerang</span>
          </h1>

          <p className="mt-4 text-gray-300 text-sm sm:text-base max-w-md leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Open mic mingguan, komika berbakat, dan community yang solid.
            Dari newbie sampai veteran — semua ada di sini.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-3 mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href="/blog"
              className="group flex items-center gap-2 px-6 py-3 bg-brand-yellow text-black font-bold rounded-xl hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95 text-sm"
            >
              <Calendar className="w-4 h-4" />
              Belajar Standup Comedy
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/komika"
              className="flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-sm backdrop-blur-sm"
            >
              <Mic className="w-4 h-4 text-brand-yellow" />
              Kenalan dengan Komika
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-5 mt-10 text-xs animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {[
              { icon: Mic, text: '35+ Komika Aktif' },
              { icon: Calendar, text: 'Open Mic setiap Jumat' },
              { icon: MapPin, text: 'Combud setiap Rabu' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5 text-white/60">
                <Icon className="w-3.5 h-3.5 text-brand-yellow" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
