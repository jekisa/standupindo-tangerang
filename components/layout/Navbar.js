'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/komika', label: 'Komika' },
  { href: '/blog', label: 'Blog' },
  { href: '/galeri', label: 'Galeri' },
  { href: '/peta', label: 'Peta' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 px-4 pt-3 transition-all duration-700 ease-out ${
        mounted ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
      }`}
    >
      <header
        className={`rounded-2xl overflow-hidden transition-all duration-300 ${
          scrolled
            ? 'bg-[#2D3C59] shadow-2xl shadow-black/30 ring-1 ring-white/10'
            : 'bg-[#2D3C59]/90 shadow-lg shadow-black/20 ring-1 ring-white/5'
        }`}
      >
        {/* Ticker banner */}
        <div className="bg-brand-yellow text-black text-xs font-semibold overflow-hidden h-7 flex items-center">
          <div className="ticker-content whitespace-nowrap">
            🎤 Open Mic tiap Jumat malam di BOIS Coffee Pasar Lama &nbsp;&nbsp;★&nbsp;&nbsp; Sharing Night tiap Rabu Malam di Basecamp Standupindo Tangerang &nbsp;&nbsp;★&nbsp;&nbsp; Booking komika untuk event kamu sekarang! &nbsp;&nbsp;★&nbsp;&nbsp; 🎤 Open Mic tiap Jumat malam di BOIS Coffee Pasar Lama &nbsp;&nbsp;★&nbsp;&nbsp; Sharing Night tiap Rabu Malam di Basecamp Standupindo Tangerang &nbsp;&nbsp;★&nbsp;&nbsp;
          </div>
        </div>

        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:justify-center lg:gap-8">
            {/* Logo */}
            <Link href="/" className="group hover:opacity-90 transition-opacity">
              <Image
                src="/logo.png"
                alt="StandupIndo Tangerang"
                width={56}
                height={56}
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

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block transition-all duration-300 ${isOpen ? 'rotate-90 scale-110' : 'rotate-0 scale-100'}`}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="border-t border-white/10 mt-1">
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
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
