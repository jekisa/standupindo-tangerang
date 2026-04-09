import Link from 'next/link'
import { Map, BookOpen } from 'lucide-react'

const cards = [
  {
    icon: Map,
    title: 'Open Mic Map',
    desc: 'Temukan venue open mic terdekat dari lokasi kamu di area Tangerang.',
    href: '/peta',
    cta: 'Buka Peta',
    color: 'from-green-500/10 to-transparent',
    borderColor: 'border-green-500/20',
    iconColor: 'text-green-400',
  },
  {
    icon: BookOpen,
    title: 'Kamus Standup',
    desc: 'Baru kenal standup? Pelajari istilah-istilahnya dan jadi penonton yang lebih apresiatif.',
    href: '/blog',
    cta: 'Baca Blog',
    color: 'from-purple-500/10 to-transparent',
    borderColor: 'border-purple-500/20',
    iconColor: 'text-purple-400',
  },
]

export default function CTASection() {
  return (
    <section className="py-20 bg-[#0D0D0D]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-black text-white">Apa yang kalian cari?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Link
                key={card.href}
                href={card.href}
                className={`group p-6 rounded-2xl bg-gradient-to-b ${card.color} border ${card.borderColor} hover:scale-[1.02] transition-all`}
              >
                <div className={`w-12 h-12 rounded-xl bg-current/10 flex items-center justify-center mb-4 ${card.iconColor}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-brand-yellow transition-colors">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{card.desc}</p>
                <span className={`text-sm font-semibold ${card.iconColor}`}>
                  {card.cta} →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
