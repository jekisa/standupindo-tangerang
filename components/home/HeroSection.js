'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Mic, MapPin, Calendar, Play, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Background layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,215,0,0.18)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(255,107,53,0.08)_0%,transparent_50%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,215,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating mic circles */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-brand-yellow/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-brand-orange/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-28 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-xs font-semibold mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse" />
          <span>Komunitas Standup Comedy #1 di Tangerang</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-none tracking-tight mb-4 animate-slide-up">
          TERTAWA
          <br />
          <span className="gradient-text text-glow">BERSAMA</span>
          <br />
          <span className="text-white/20 text-4xl sm:text-5xl lg:text-7xl">TANGERANG</span>
        </h1>

        <p className="mt-6 text-gray-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Open mic mingguan, komika berbakat, dan community yang solid.
          Dari newbie sampai veteran — semua ada di sini.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link
            href="/jadwal"
            className="group flex items-center gap-2 px-7 py-3.5 bg-brand-yellow text-black font-bold rounded-xl hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95 shadow-yellow text-sm"
          >
            <Calendar className="w-4 h-4" />
            Lihat Jadwal Open Mic
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/komika"
            className="flex items-center gap-2 px-7 py-3.5 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-sm"
          >
            <Mic className="w-4 h-4 text-brand-yellow" />
            Kenalan dengan Komika
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-14 text-sm animate-fade-in" style={{ animationDelay: '0.5s' }}>
          {[
            { icon: Mic, text: '35+ Komika Aktif' },
            { icon: Calendar, text: '5x Open Mic / Minggu' },
            { icon: MapPin, text: '8 Venue di Tangerang' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-1.5 text-gray-400">
              <Icon className="w-4 h-4 text-brand-yellow" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-gray-500 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-brand-yellow to-transparent" />
      </div>
    </section>
  )
}
