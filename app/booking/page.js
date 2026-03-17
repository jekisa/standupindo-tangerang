'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import {
  Mic, Clock, Check, Send, Star, Play, X,
  ChevronDown, Building, Users, Zap, Shield,
} from 'lucide-react'
import { komika } from '@/lib/mockData'

const eventTypeColors = {
  Wedding: 'bg-pink-500/15 text-pink-300 border border-pink-500/25',
  Corporate: 'bg-blue-500/15 text-blue-300 border border-blue-500/25',
  Cafe: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
  'Ulang Tahun': 'bg-purple-500/15 text-purple-300 border border-purple-500/25',
}

const DURATION_OPTIONS = [
  { label: 'Semua Durasi', value: '' },
  { label: '15 Menit', value: '15' },
  { label: '20 Menit', value: '20' },
  { label: '30+ Menit', value: '30' },
]

const EVENT_TYPES = ['Wedding', 'Corporate', 'Cafe', 'Ulang Tahun']

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedKomika, setSelectedKomika] = useState([])
  const [durationFilter, setDurationFilter] = useState('')
  const [eventTypeFilters, setEventTypeFilters] = useState([])
  const [videoModal, setVideoModal] = useState(null)
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    eventType: '', eventDate: '', eventTime: '',
    venue: '', duration: '',
    hasMic: '', setting: '',
    hasSpecialMaterial: false, materialDetail: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const activeKomika = komika.filter((k) => k.status === 'Active')

  const filteredKomika = useMemo(() => {
    return activeKomika.filter((k) => {
      const durPass = !durationFilter || k.minDuration <= parseInt(durationFilter)
      const typePass = eventTypeFilters.length === 0 || eventTypeFilters.some((t) => k.eventTypes.includes(t))
      return durPass && typePass
    })
  }, [durationFilter, eventTypeFilters])

  const toggleEventTypeFilter = (type) => {
    setEventTypeFilters((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const toggleKomika = (id) => {
    setSelectedKomika((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="page-enter min-h-screen bg-brand-dark pt-24 flex items-center justify-center">
        <div className="text-center p-12 max-w-md">
          <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Permintaan Terkirim!</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Tim StandupIndo Tangerang akan menghubungi kamu dalam 24 jam untuk konfirmasi.
          </p>
          <div className="bg-brand-card border border-green-500/20 rounded-xl p-4 mb-6 text-left">
            <div className="flex items-center gap-2 text-green-400 text-xs font-semibold mb-1">
              <Zap className="w-3.5 h-3.5" />
              Notifikasi Email Terkirim
            </div>
            <p className="text-gray-400 text-xs">
              Email otomatis telah dikirim ke admin komunitas. Request kamu akan direview dan dikonfirmasi segera.
            </p>
          </div>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setSelectedKomika([]) }}
            className="px-6 py-3 bg-brand-yellow text-black font-bold rounded-xl hover:bg-yellow-400 transition-all"
          >
            Booking Lagi
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter min-h-screen bg-brand-dark pt-24">
      {/* Header */}
      <div className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,215,0,0.12)_0%,transparent_70%)] py-14">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">Booking Komika</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Undang komika terbaik Tangerang untuk event kamu. EO, Wedding, Corporate — kami siap tampil.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        {/* Stepper */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {[
            { num: 1, label: 'Pilih Komika' },
            { num: 2, label: 'Detail Event' },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step > s.num ? 'bg-green-500 text-white' :
                  step === s.num ? 'bg-brand-yellow text-black' :
                  'bg-brand-card border border-brand-border text-gray-400'
                }`}>
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-xs mt-1.5 font-medium ${step === s.num ? 'text-brand-yellow' : 'text-gray-500'}`}>{s.label}</span>
              </div>
              {i < 1 && <div className={`w-24 sm:w-36 h-px mx-2 mb-4 transition-all ${step > s.num ? 'bg-green-500' : 'bg-brand-border'}`} />}
            </div>
          ))}
        </div>

        {/* ───── STEP 1: Komika Marketplace ───── */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold text-white text-center mb-1">Pilih Komika</h2>
            <p className="text-gray-400 text-sm text-center mb-6">
              Browse komika berdasarkan durasi & tipe acara. Klik "Check Availability" untuk memilih.
            </p>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-brand-card border border-brand-border rounded-2xl">
              {/* Duration Dropdown */}
              <div className="relative">
                <select
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                  className="appearance-none bg-brand-dark border border-brand-border text-gray-300 text-sm rounded-xl px-4 py-2 pr-8 focus:outline-none focus:border-brand-yellow/40 cursor-pointer"
                >
                  {DURATION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Event Type Tags */}
              <div className="flex flex-wrap gap-2">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => toggleEventTypeFilter(type)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      eventTypeFilters.includes(type)
                        ? (eventTypeColors[type] || 'bg-brand-yellow/20 text-brand-yellow border-brand-yellow/30')
                        : 'bg-transparent text-gray-400 border-brand-border hover:border-gray-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
                {(durationFilter || eventTypeFilters.length > 0) && (
                  <button
                    onClick={() => { setDurationFilter(''); setEventTypeFilters([]) }}
                    className="px-3 py-1.5 rounded-xl text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>

              <span className="ml-auto text-xs text-gray-500">{filteredKomika.length} komika tersedia</span>
            </div>

            {/* Komika Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {filteredKomika.map((k) => {
                const isSelected = selectedKomika.includes(k.id)
                return (
                  <div
                    key={k.id}
                    className={`rounded-2xl border-2 overflow-hidden transition-all ${
                      isSelected ? 'border-brand-yellow/60 shadow-yellow-sm' : 'border-brand-border bg-brand-card hover:border-brand-yellow/20'
                    }`}
                  >
                    {/* Photo */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={k.photo}
                        alt={k.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent" />
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-7 h-7 bg-brand-yellow rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-black" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-4 bg-brand-card">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-white font-bold text-sm leading-tight">{k.name}</h3>
                        <span className="text-xs text-gray-500 shrink-0">{k.specialty}</span>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex">
                          {[1,2,3,4,5].map((i) => (
                            <Star key={i} className={`w-3 h-3 ${i <= Math.round(k.rating) ? 'text-brand-yellow fill-brand-yellow' : 'text-gray-600'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-white font-semibold">{k.rating}</span>
                        <span className="text-xs text-gray-500">· {k.shows} show</span>
                      </div>

                      {/* Event Types */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {k.eventTypes.map((type) => (
                          <span key={type} className={`px-1.5 py-0.5 rounded text-xs font-medium ${eventTypeColors[type] || 'bg-gray-500/20 text-gray-300'}`}>
                            {type}
                          </span>
                        ))}
                      </div>

                      {/* Duration */}
                      <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                        <Clock className="w-3 h-3 text-brand-yellow" />
                        Min. {k.minDuration} menit
                      </div>

                      {/* Clients */}
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1.5">Pernah tampil untuk:</p>
                        <div className="flex flex-wrap gap-1">
                          {k.clients.slice(0, 3).map((c) => (
                            <span key={c} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400 truncate max-w-full">
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-3 border-t border-brand-border">
                        <button
                          onClick={() => setVideoModal(k)}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white/5 hover:bg-white/10 border border-brand-border rounded-lg text-xs text-gray-300 hover:text-white transition-all"
                        >
                          <Play className="w-3 h-3" />
                          Video
                        </button>
                        <button
                          onClick={() => toggleKomika(k.id)}
                          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40 hover:bg-red-500/20 hover:text-red-300 hover:border-red-500/30'
                              : 'bg-brand-yellow text-black hover:bg-yellow-400'
                          }`}
                        >
                          {isSelected ? '✓ Dipilih' : 'Check Availability'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredKomika.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <p className="text-sm">Tidak ada komika yang sesuai filter.</p>
                <button onClick={() => { setDurationFilter(''); setEventTypeFilters([]) }} className="mt-2 text-brand-yellow text-xs hover:underline">
                  Reset filter
                </button>
              </div>
            )}

            {/* Selected summary */}
            {selectedKomika.length > 0 && (
              <div className="mt-6 p-4 bg-brand-yellow/10 border border-brand-yellow/30 rounded-2xl flex flex-wrap items-center gap-3">
                <span className="text-brand-yellow text-sm font-semibold">
                  {selectedKomika.length} komika dipilih:
                </span>
                {komika.filter((k) => selectedKomika.includes(k.id)).map((k) => (
                  <span key={k.id} className="flex items-center gap-1.5 px-3 py-1 bg-brand-yellow/20 rounded-full text-xs text-brand-yellow">
                    {k.name}
                    <button onClick={() => toggleKomika(k.id)} className="hover:text-white"><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3 bg-brand-yellow text-black font-bold rounded-xl hover:bg-yellow-400 transition-all"
              >
                Lanjutkan →
              </button>
            </div>
          </div>
        )}

        {/* ───── STEP 2: Form ───── */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-bold text-white text-center mb-2">Detail Event Kamu</h2>
            <p className="text-gray-400 text-sm text-center mb-8">Isi detail teknis event agar kami bisa mempersiapkan penampilan terbaik.</p>

            {/* Summary */}
            {selectedKomika.length > 0 && (
              <div className="bg-brand-card border border-brand-yellow/20 rounded-2xl p-5 mb-6">
                <h4 className="text-white font-semibold text-sm mb-3">Komika yang Dipilih</h4>
                <div className="flex flex-wrap gap-2">
                  {komika.filter((k) => selectedKomika.includes(k.id)).map((k) => (
                    <div key={k.id} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0">
                        <Image src={k.photo} alt={k.name} fill className="object-cover" sizes="24px" />
                      </div>
                      <span className="text-white text-xs font-medium">{k.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal Info */}
              <div className="p-4 bg-brand-card border border-brand-border rounded-xl space-y-4">
                <h3 className="text-white text-sm font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-brand-yellow" /> Info Kontak
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Nama Lengkap *</label>
                    <input required className="input-dark text-sm" placeholder="Nama lengkap" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">No. WhatsApp *</label>
                    <input required className="input-dark text-sm" placeholder="+62 812-xxxx-xxxx" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Email *</label>
                  <input required type="email" className="input-dark text-sm" placeholder="nama@email.com" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                </div>
              </div>

              {/* Event Details */}
              <div className="p-4 bg-brand-card border border-brand-border rounded-xl space-y-4">
                <h3 className="text-white text-sm font-semibold flex items-center gap-2">
                  <Building className="w-4 h-4 text-brand-yellow" /> Detail Acara
                </h3>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Jenis Event *</label>
                  <select required className="input-dark text-sm" value={form.eventType} onChange={(e) => setForm({...form, eventType: e.target.value})}>
                    <option value="">Pilih jenis event</option>
                    <option>Wedding / Pernikahan</option>
                    <option>Corporate Event</option>
                    <option>Ulang Tahun</option>
                    <option>Gathering Kantor</option>
                    <option>Cafe / Restoran</option>
                    <option>Brand Activation</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Tanggal Event *</label>
                    <input required type="date" className="input-dark text-sm" value={form.eventDate} onChange={(e) => setForm({...form, eventDate: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1.5">Jam Mulai</label>
                    <input type="time" className="input-dark text-sm" value={form.eventTime} onChange={(e) => setForm({...form, eventTime: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Venue / Lokasi di Tangerang *</label>
                  <input required className="input-dark text-sm" placeholder="Nama venue, kecamatan, Tangerang" value={form.venue} onChange={(e) => setForm({...form, venue: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">Durasi Penampilan *</label>
                  <select required className="input-dark text-sm" value={form.duration} onChange={(e) => setForm({...form, duration: e.target.value})}>
                    <option value="">Pilih durasi</option>
                    <option>15 menit</option>
                    <option>20 menit</option>
                    <option>30 menit</option>
                    <option>45 menit</option>
                    <option>60 menit</option>
                    <option>90 menit</option>
                    <option>120+ menit</option>
                  </select>
                </div>
              </div>

              {/* Technical Details */}
              <div className="p-4 bg-brand-card border border-brand-border rounded-xl space-y-4">
                <h3 className="text-white text-sm font-semibold flex items-center gap-2">
                  <Mic className="w-4 h-4 text-brand-yellow" /> Detail Teknis
                </h3>

                {/* Mic */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Mic tersedia di venue?</label>
                  <div className="flex gap-4">
                    {['Ya', 'Tidak'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <div
                          onClick={() => setForm({...form, hasMic: opt})}
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                            form.hasMic === opt ? 'border-brand-yellow bg-brand-yellow' : 'border-gray-500'
                          }`}
                        >
                          {form.hasMic === opt && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                        </div>
                        <span className="text-sm text-gray-300">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Indoor/Outdoor */}
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Setting acara?</label>
                  <div className="flex gap-4">
                    {['Indoor', 'Outdoor'].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer">
                        <div
                          onClick={() => setForm({...form, setting: opt.toLowerCase()})}
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center cursor-pointer ${
                            form.setting === opt.toLowerCase() ? 'border-brand-yellow bg-brand-yellow' : 'border-gray-500'
                          }`}
                        >
                          {form.setting === opt.toLowerCase() && <div className="w-1.5 h-1.5 bg-black rounded-full" />}
                        </div>
                        <span className="text-sm text-gray-300">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Special Material */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <div
                      onClick={() => setForm({...form, hasSpecialMaterial: !form.hasSpecialMaterial, materialDetail: ''})}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${
                        form.hasSpecialMaterial ? 'border-brand-yellow bg-brand-yellow' : 'border-gray-500'
                      }`}
                    >
                      {form.hasSpecialMaterial && <Check className="w-2.5 h-2.5 text-black" />}
                    </div>
                    <span className="text-sm text-gray-300">Ada permintaan materi khusus / Roasting?</span>
                  </label>
                  {form.hasSpecialMaterial && (
                    <textarea
                      rows={3}
                      className="input-dark resize-none text-sm mt-2"
                      placeholder="Contoh: Roasting bos besar, tema ulang tahun perak perusahaan, no dirty jokes, dll..."
                      value={form.materialDetail}
                      onChange={(e) => setForm({...form, materialDetail: e.target.value})}
                    />
                  )}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">Catatan Tambahan</label>
                <textarea
                  rows={3}
                  className="input-dark resize-none text-sm"
                  placeholder="Jumlah tamu, ada anak kecil?, tema dress code, dll..."
                  value={form.notes}
                  onChange={(e) => setForm({...form, notes: e.target.value})}
                />
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-green-400" /> Data kamu aman</span>
                <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-brand-yellow" /> Respon dalam 24 jam</span>
                <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-blue-400" /> 100% gratis konsultasi</span>
              </div>

              <div className="flex gap-4 pt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 bg-brand-card border border-brand-border text-gray-300 font-semibold rounded-xl hover:text-white transition-all">
                  ← Kembali
                </button>
                <button type="submit" className="flex-1 py-3 bg-brand-yellow text-black font-bold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Kirim Permintaan
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoModal(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-brand-card rounded-2xl overflow-hidden border border-brand-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border">
              <div>
                <h3 className="text-white font-bold text-sm">{videoModal.name}</h3>
                <p className="text-gray-400 text-xs">Performance Reel — Demo</p>
              </div>
              <button onClick={() => setVideoModal(null)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                src={`${videoModal.videoUrl}?autoplay=1&rel=0`}
                className="w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title={`${videoModal.name} performance reel`}
              />
            </div>
            <div className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                  <Image src={videoModal.photo} alt={videoModal.name} fill className="object-cover" sizes="32px" />
                </div>
                <div>
                  <p className="text-white text-xs font-semibold">{videoModal.name}</p>
                  <p className="text-gray-500 text-xs">{videoModal.specialty} · {videoModal.shows} shows</p>
                </div>
              </div>
              <button
                onClick={() => { toggleKomika(videoModal.id); setVideoModal(null) }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedKomika.includes(videoModal.id)
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                    : 'bg-brand-yellow text-black hover:bg-yellow-400'
                }`}
              >
                {selectedKomika.includes(videoModal.id) ? '✓ Sudah Dipilih' : 'Pilih Komika Ini'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
