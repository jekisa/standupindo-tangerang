'use client'

import { useState } from 'react'
import { MapPin, Clock, DollarSign, Navigation, ExternalLink, Mic } from 'lucide-react'
import { venues } from '@/lib/mockData'
import dynamic from 'next/dynamic'

const OpenMicMap = dynamic(() => import('@/components/peta/OpenMicMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-brand-card rounded-2xl border border-brand-border flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">Memuat peta...</p>
      </div>
    </div>
  ),
})

const typeColors = {
  'Open Mic': { dot: 'bg-green-400', badge: 'badge-green', icon: 'text-green-400' },
  'Special Show': { dot: 'bg-brand-yellow', badge: 'badge-yellow', icon: 'text-brand-yellow' },
  'Workshop': { dot: 'bg-blue-400', badge: 'badge-blue', icon: 'text-blue-400' },
}

export default function PetaPage() {
  const [selectedVenue, setSelectedVenue] = useState(null)

  return (
    <div className="page-enter min-h-screen bg-brand-dark pt-24">
      {/* Header */}
      <div className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,215,0,0.12)_0%,transparent_70%)] py-14">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">Open Mic Map</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Temukan venue open mic terdekat dari kamu di seluruh area Tangerang — BSD, Karawaci, Cipondoh, dan sekitarnya.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 h-[500px] rounded-2xl overflow-hidden">
            <OpenMicMap
              venues={venues}
              selectedVenue={selectedVenue}
              onSelectVenue={setSelectedVenue}
            />
          </div>

          {/* Venue List */}
          <div className="space-y-3 overflow-y-auto max-h-[500px] pr-1">
            <h3 className="text-white font-bold text-sm sticky top-0 bg-brand-dark py-1">
              {venues.length} Venue di Tangerang
            </h3>
            {venues.map((venue) => {
              const colors = typeColors[venue.type] || typeColors['Open Mic']
              const isSelected = selectedVenue?.id === venue.id
              return (
                <div
                  key={venue.id}
                  onClick={() => setSelectedVenue(isSelected ? null : venue)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-brand-yellow/50 bg-brand-yellow/5'
                      : 'border-brand-border bg-brand-card hover:border-brand-yellow/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-brand-yellow/20' : 'bg-brand-card2'}`}>
                      <div className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-white text-sm">{venue.name}</h4>
                        <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${colors.badge}`}>{venue.type}</span>
                      </div>
                      <p className="text-gray-500 text-xs mt-0.5">{venue.address}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-brand-yellow" />
                          {venue.schedule[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3 text-green-400" />
                          {venue.priceRange}
                        </span>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-brand-border">
                      <p className="text-gray-400 text-xs leading-relaxed mb-3">{venue.description}</p>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.name + ' ' + venue.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 text-xs text-brand-yellow hover:underline"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Buka di Google Maps
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-brand-border">
          <p className="text-gray-500 text-xs self-center">Legenda:</p>
          {Object.entries(typeColors).map(([type, colors]) => (
            <div key={type} className="flex items-center gap-2 text-xs text-gray-400">
              <div className={`w-3 h-3 rounded-full ${colors.dot}`} />
              {type}
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="mt-8 p-5 bg-brand-card border border-brand-border rounded-2xl">
          <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
            <Mic className="w-4 h-4 text-brand-yellow" />
            Tips Open Mic
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-gray-400">
            <div>
              <p className="text-white font-medium mb-1">Mau Tampil?</p>
              <p>Datang minimal 30 menit sebelum acara untuk daftar slot. Bawa materi yang sudah dipersiapkan.</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Mau Nonton?</p>
              <p>Semua Open Mic gratis masuk. Dukung komika dengan datang tepat waktu dan ketawa yang banyak!</p>
            </div>
            <div>
              <p className="text-white font-medium mb-1">Ada Pertanyaan?</p>
              <p>Hubungi kami via WhatsApp atau Instagram untuk info terbaru sebelum datang.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
