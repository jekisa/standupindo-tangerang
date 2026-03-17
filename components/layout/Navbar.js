'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/jadwal', label: 'Jadwal' },
  { href: '/komika', label: 'Komika' },
  { href: '/download', label: 'Download' },
  { href: '/booking', label: 'Booking' },
  { href: '/blog', label: 'Blog' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/peta', label: 'Peta' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-dark/95 backdrop-blur-md border-b border-brand-border shadow-lg'
          : 'bg-transparent'
      }`}
    >
      {/* Ticker banner */}
      <div className="bg-brand-yellow text-black text-xs font-semibold overflow-hidden h-7 flex items-center">
        <div className="ticker-content whitespace-nowrap">
          🎤 Open Mic tiap Jumat malam di BOIS Coffee Pasar Lama &nbsp;&nbsp;★&nbsp;&nbsp; Sharing Night tiap Rabu Malam di Basecamp Standupindo Tangerang &nbsp;&nbsp;★&nbsp;&nbsp; Booking komika untuk event kamu sekarang! &nbsp;&nbsp;★&nbsp;&nbsp; 🎤 Open Mic tiap Jumat malam di BOIS Coffee Pasar Lama &nbsp;&nbsp;★&nbsp;&nbsp; Sharing Night tiap Rabu Malam di Basecamp Standupindo Tangerang &nbsp;&nbsp;★&nbsp;&nbsp;
        </div>
      </div>

      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group hover:opacity-90 transition-opacity">
            <Image
              src="/logo.png"
              alt="StandupIndo Tangerang"
              width={44}
              height={44}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'text-brand-yellow bg-brand-yellow/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/booking"
              className="px-4 py-2 bg-brand-yellow text-black text-sm font-bold rounded-lg hover:bg-yellow-400 transition-all hover:scale-105 active:scale-95"
            >
              Booking Komika
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 border-t border-brand-border mt-1">
            <div className="flex flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'text-brand-yellow bg-brand-yellow/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/booking"
                className="mt-2 mx-0 px-4 py-3 bg-brand-yellow text-black text-sm font-bold rounded-lg text-center"
              >
                Booking Komika
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
