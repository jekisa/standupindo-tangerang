'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Calendar, MapPin, Clock, Users, Ticket, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react'
import { shows } from '@/lib/mockData'
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from 'date-fns'
import { id } from 'date-fns/locale'

const typeColors = {
  'Open Mic': 'badge-green',
  'Special Show': 'badge-yellow',
  'Workshop': 'badge-blue',
}

export default function JadwalPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 2, 1))
  const [selectedDate, setSelectedDate] = useState(null)
  const [viewMode, setViewMode] = useState('calendar') // 'calendar' or 'list'

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    return eachDayOfInterval({ start, end })
  }, [currentMonth])

  const filteredShows = useMemo(() => {
    return shows.filter((show) => {
      const matchDate = !selectedDate || isSameDay(parseISO(show.date), selectedDate)
      return matchDate
    })
  }, [selectedDate])

  const showsOnDay = (day) =>
    shows.filter((s) => isSameDay(parseISO(s.date), day))

  return (
    <div className="page-enter min-h-screen bg-brand-dark pt-24">
      {/* Header */}
      <div className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,215,0,0.12)_0%,transparent_70%)] py-14">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">Jadwal Open Mic</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Semua jadwal open mic dan show di Tangerang dalam satu kalender. Pilih tanggal atau filter sesuai area kamu.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        {/* View toggle */}
        <div className="flex justify-end gap-2 mb-8">
          <button
            onClick={() => setViewMode('calendar')}
            className={`p-2 rounded-lg border transition-all ${viewMode === 'calendar' ? 'bg-brand-yellow/10 border-brand-yellow/30 text-brand-yellow' : 'bg-brand-card border-brand-border text-gray-400 hover:text-white'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg border transition-all ${viewMode === 'list' ? 'bg-brand-yellow/10 border-brand-yellow/30 text-brand-yellow' : 'bg-brand-card border-brand-border text-gray-400 hover:text-white'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        {viewMode === 'calendar' ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2 bg-brand-card rounded-2xl border border-brand-border p-6">
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-2 hover:bg-brand-card2 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h2 className="text-white font-bold text-lg">
                  {format(currentMonth, 'MMMM yyyy', { locale: id })}
                </h2>
                <button
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-2 hover:bg-brand-card2 rounded-lg transition-colors text-gray-400 hover:text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
                  <div key={d} className="text-center text-gray-500 text-xs font-semibold py-2">{d}</div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for start offset */}
                {Array.from({ length: days[0].getDay() }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {days.map((day) => {
                  const dayShows = showsOnDay(day)
                  const isSelected = selectedDate && isSameDay(day, selectedDate)
                  const todayDay = isToday(day)
                  return (
                    <button
                      key={day.toString()}
                      onClick={() => setSelectedDate(isSelected ? null : day)}
                      className={`calendar-day rounded-lg transition-all ${
                        isSelected
                          ? 'bg-brand-yellow/20 border border-brand-yellow/60 text-brand-yellow'
                          : todayDay
                          ? 'calendar-day today text-brand-orange'
                          : dayShows.length > 0
                          ? 'calendar-day has-event text-white'
                          : 'text-gray-400 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-xs font-semibold">{format(day, 'd')}</span>
                      {dayShows.length > 0 && (
                        <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                          {dayShows.slice(0, 3).map((s, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full ${
                                s.type === 'Special Show' ? 'bg-brand-yellow' :
                                s.type === 'Workshop' ? 'bg-blue-400' : 'bg-green-400'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-brand-border">
                {[
                  { color: 'bg-green-400', label: 'Open Mic' },
                  { color: 'bg-brand-yellow', label: 'Special Show' },
                  { color: 'bg-blue-400', label: 'Workshop' },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <div className={`w-2 h-2 rounded-full ${l.color}`} />
                    {l.label}
                  </div>
                ))}
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate(null)}
                    className="ml-auto text-xs text-brand-yellow hover:underline"
                  >
                    Reset filter tanggal
                  </button>
                )}
              </div>
            </div>

            {/* Shows list */}
            <div className="space-y-4">
              <h3 className="text-white font-bold text-sm">
                {selectedDate
                  ? `Show pada ${format(selectedDate, 'd MMMM yyyy', { locale: id })}`
                  : `Semua Show (${filteredShows.length})`}
              </h3>
              {filteredShows.length === 0 ? (
                <div className="bg-brand-card rounded-2xl border border-brand-border p-8 text-center">
                  <p className="text-gray-400 text-sm">Tidak ada show pada tanggal ini.</p>
                </div>
              ) : (
                filteredShows.map((show) => (
                  <ShowCard key={show.id} show={show} />
                ))
              )}
            </div>
          </div>
        ) : (
          // List view
          <div className="space-y-4">
            {filteredShows.map((show) => (
              <ShowCardHorizontal key={show.id} show={show} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function ShowCard({ show }) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-xl p-4 hover:border-brand-yellow/20 transition-all">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-white text-sm line-clamp-2 leading-snug">{show.title}</h4>
        <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-semibold ${typeColors[show.type] || 'badge-yellow'}`}>
          {show.type}
        </span>
      </div>
      <div className="space-y-1.5 text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-brand-yellow" />
          {format(parseISO(show.date), 'EEE, d MMM', { locale: id })} · {show.time}
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-brand-yellow" />
          {show.venue}
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-brand-border">
        <span className={`text-xs font-semibold ${show.priceNum === 0 ? 'text-green-400' : 'text-brand-yellow'}`}>
          {show.price}
        </span>
        <span className="text-xs text-gray-500">{show.area}</span>
      </div>
    </div>
  )
}

function ShowCardHorizontal({ show }) {
  return (
    <div className="bg-brand-card border border-brand-border rounded-2xl p-5 hover:border-brand-yellow/20 transition-all flex flex-col sm:flex-row gap-4">
      <div className="relative w-full sm:w-24 h-24 rounded-xl overflow-hidden shrink-0">
        <Image src={show.image} alt={show.title} fill className="object-cover" sizes="96px" />
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${typeColors[show.type] || 'badge-yellow'}`}>{show.type}</span>
          {show.isRecurring && <span className="badge-blue px-2 py-0.5 rounded-full text-xs font-semibold">{show.recurringLabel}</span>}
        </div>
        <h4 className="font-bold text-white mb-2">{show.title}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brand-yellow" />{format(parseISO(show.date), 'EEE, d MMM', { locale: id })}</div>
          <div className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-brand-yellow" />{show.time} WIB</div>
          <div className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-brand-yellow" />{show.area}</div>
          <div className="flex items-center gap-1"><Ticket className="w-3.5 h-3.5 text-green-400" />
            <span className={show.priceNum === 0 ? 'text-green-400 font-semibold' : 'text-brand-yellow font-semibold'}>{show.price}</span>
          </div>
          <div className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{show.bookedSlots}/{show.slots} slot</div>
        </div>
      </div>
    </div>
  )
}
