'use client'

import { Users, Mic, Eye, Calendar } from 'lucide-react'

const icons = { Users, Mic, Eye, Calendar }

const statsData = [
  { label: 'Komika Aktif', value: '35+', icon: 'Users', color: 'text-brand-yellow' },
  { label: 'Open Mic Per Bulan', value: '20+', icon: 'Mic', color: 'text-brand-orange' },
  { label: 'Penonton Per Tahun', value: '5000+', icon: 'Eye', color: 'text-green-400' },
  { label: 'Tahun Berdiri', value: '2015', icon: 'Calendar', color: 'text-blue-400' },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-brand-card border-y border-brand-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat) => {
            const Icon = icons[stat.icon]
            return (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-brand-dark border border-brand-border hover:border-brand-yellow/20 transition-all group"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-current/10 mb-3 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`text-3xl lg:text-4xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
