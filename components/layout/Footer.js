import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Youtube, Facebook, MapPin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-brand-border">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4 hover:opacity-90 transition-opacity">
              <Image
                src="/logo.png"
                alt="StandupIndo Tangerang"
                width={44}
                height={44}
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Komunitas standup comedy terbesar di Tangerang. Open mic mingguan, digital download, dan booking komika untuk event kamu.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Youtube, href: '#', label: 'Youtube' },
                { icon: Facebook, href: '#', label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center text-gray-400 hover:text-brand-yellow hover:border-brand-yellow/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Menu</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/jadwal', label: 'Jadwal Open Mic' },
                { href: '/komika', label: 'Direktori Komika' },
                { href: '/download', label: 'Digital Download' },
                { href: '/booking', label: 'Booking Komika' },
                { href: '/blog', label: 'Blog & Kamus Standup' },
                { href: '/galeri', label: 'Galeri Pecah' },
                { href: '/peta', label: 'Open Mic Map' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-400 hover:text-brand-yellow text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Open Mic Schedule */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Jadwal Rutin</h3>
            <ul className="space-y-3">
              {[
                { day: 'Rabu', venue: 'Sharing night / Basecamp Standupindo Tangerang', time: '19:00' },
                { day: 'Jumat', venue: 'Open Mic / Bois Coffee Pasar Lama', time: '19:00' },
              ].map((item) => (
                <li key={item.day} className="flex items-start gap-2">
                  <span className="text-brand-yellow text-xs font-bold w-12 shrink-0 mt-0.5">{item.day}</span>
                  <div>
                    <div className="text-gray-300 text-xs font-medium">{item.venue}</div>
                    <div className="text-gray-500 text-xs">{item.time} WIB</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Kontak</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 text-brand-yellow shrink-0" />
                <span>Tangerang, Banten, Indonesia</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 text-brand-yellow shrink-0" />
                <a href="mailto:halo@standupindo-tangerang.id" className="hover:text-brand-yellow transition-colors">
                  halo@standupindo-tangerang.id
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 text-brand-yellow shrink-0" />
                <a href="https://wa.me/628123456789" className="hover:text-brand-yellow transition-colors">
                  +62 812-3456-789
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-brand-card rounded-xl border border-brand-border">
              <p className="text-xs text-gray-400 leading-relaxed">
                Mau booking komika atau jadi sponsor? Hubungi kami dan kami akan respond dalam 24 jam.
              </p>
              <Link
                href="/booking"
                className="mt-3 block text-center py-2 bg-brand-yellow text-black text-xs font-bold rounded-lg hover:bg-yellow-400 transition-colors"
              >
                Booking Sekarang
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © 2026 StandupIndo Tangerang. Hak Cipta Dilindungi.
          </p>
          <p className="text-gray-600 text-xs">
            Made with ❤️ untuk komunitas komedi Tangerang
          </p>
        </div>
      </div>
    </footer>
  )
}
