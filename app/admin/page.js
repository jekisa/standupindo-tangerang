'use client'

import { useState, useMemo, useEffect } from 'react'
import { bookingRequests as initialRequests, komika } from '@/lib/mockData'
import {
  Check, X, Clock, Calendar, MapPin, Mic, Users,
  ChevronDown, ChevronUp, AlertCircle, CheckCircle, XCircle,
  Zap, Building, Phone, Mail, Lock, LogOut, Eye, EyeOff,
} from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'standupindo2026'
const SESSION_KEY = 'situ_admin_auth'

const STATUS_TABS = [
  { label: 'Semua', value: 'all' },
  { label: 'Pending', value: 'pending' },
  { label: 'Approved', value: 'approved' },
  { label: 'Rejected', value: 'rejected' },
]

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, cls: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
  approved: { label: 'Approved', icon: CheckCircle, cls: 'bg-green-500/20 text-green-300 border border-green-500/30' },
  rejected: { label: 'Rejected', icon: XCircle, cls: 'bg-red-500/20 text-red-300 border border-red-500/30' },
}

const eventTypeColors = {
  'Corporate Event': 'bg-blue-500/15 text-blue-300',
  'Wedding': 'bg-pink-500/15 text-pink-300',
  'Cafe Event': 'bg-amber-500/15 text-amber-300',
  'Ulang Tahun': 'bg-purple-500/15 text-purple-300',
  'Gathering': 'bg-teal-500/15 text-teal-300',
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [authChecked, setAuthChecked] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [showPass, setShowPass] = useState(false)

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === '1')
    setAuthChecked(true)
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (loginForm.username === ADMIN_USER && loginForm.password === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
      setLoginError('')
    } else {
      setLoginError('Username atau password salah.')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
    setLoginForm({ username: '', password: '' })
  }

  const [requests, setRequests] = useState(initialRequests)
  const [activeTab, setActiveTab] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const [rejectModal, setRejectModal] = useState(null)
  const [rejectReason, setRejectReason] = useState('')

  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    approved: requests.filter((r) => r.status === 'approved').length,
    rejected: requests.filter((r) => r.status === 'rejected').length,
  }), [requests])

  const filtered = useMemo(() =>
    activeTab === 'all' ? requests : requests.filter((r) => r.status === activeTab),
    [requests, activeTab]
  )

  const approve = (id) => {
    setRequests((prev) => prev.map((r) =>
      r.id === id ? { ...r, status: 'approved', rejectedReason: undefined } : r
    ))
  }

  const confirmReject = () => {
    if (!rejectModal) return
    setRequests((prev) => prev.map((r) =>
      r.id === rejectModal ? { ...r, status: 'rejected', rejectedReason: rejectReason || 'Tidak dapat diproses.' } : r
    ))
    setRejectModal(null)
    setRejectReason('')
  }

  if (!authChecked) return null

  if (!authed) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-brand-yellow/10 border border-brand-yellow/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-brand-yellow" />
            </div>
            <h1 className="text-2xl font-black text-white">Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-1">StandupIndo Tangerang</p>
          </div>
          <form onSubmit={handleLogin} className="bg-brand-card border border-brand-border rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Username</label>
              <input
                required
                autoComplete="username"
                className="input-dark text-sm"
                placeholder="Username admin"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Password</label>
              <div className="relative">
                <input
                  required
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  className="input-dark text-sm pr-10"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {loginError && (
              <p className="text-red-400 text-xs flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {loginError}
              </p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-brand-yellow text-black font-bold rounded-xl hover:bg-yellow-400 transition-all mt-2"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-dark pt-24">
      {/* Header */}
      <div className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,215,0,0.08)_0%,transparent_60%)] py-10 border-b border-brand-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-brand-yellow text-xs font-semibold mb-1 uppercase tracking-widest">Admin Panel</p>
              <h1 className="text-3xl font-black text-white">Booking Requests</h1>
              <p className="text-gray-400 text-sm mt-1">Review dan proses permintaan booking komika.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span className="text-amber-300 text-sm font-semibold">{stats.pending} menunggu review</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-brand-card border border-brand-border text-gray-400 hover:text-white hover:border-gray-500 text-sm rounded-xl transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Booking', value: stats.total, color: 'text-white', bg: 'bg-brand-card' },
            { label: 'Menunggu Review', value: stats.pending, color: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-500/20' },
            { label: 'Disetujui', value: stats.approved, color: 'text-green-300', bg: 'bg-green-500/10 border-green-500/20' },
            { label: 'Ditolak', value: stats.rejected, color: 'text-red-300', bg: 'bg-red-500/10 border-red-500/20' },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} border border-brand-border rounded-2xl p-5`}>
              <p className="text-gray-400 text-xs mb-1">{s.label}</p>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-brand-card border border-brand-border rounded-xl p-1 w-fit">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab.value
                  ? 'bg-brand-yellow text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
              {tab.value !== 'all' && (
                <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs ${
                  activeTab === tab.value ? 'bg-black/20 text-black' : 'bg-brand-border text-gray-400'
                }`}>
                  {tab.value === 'pending' ? stats.pending : tab.value === 'approved' ? stats.approved : stats.rejected}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Request List */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500 text-sm">Tidak ada booking request.</div>
          )}
          {filtered.map((req) => {
            const isExpanded = expandedId === req.id
            const status = statusConfig[req.status] || statusConfig.pending
            const StatusIcon = status.icon
            return (
              <div key={req.id} className={`bg-brand-card border rounded-2xl overflow-hidden transition-all ${
                req.status === 'pending' ? 'border-amber-500/20' :
                req.status === 'approved' ? 'border-green-500/15' : 'border-brand-border'
              }`}>
                {/* Row Header */}
                <div
                  className="flex items-start gap-4 p-5 cursor-pointer hover:bg-white/2 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : req.id)}
                >
                  {/* Status indicator */}
                  <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                    req.status === 'pending' ? 'bg-amber-400' :
                    req.status === 'approved' ? 'bg-green-400' : 'bg-red-400'
                  }`} />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-gray-500 text-xs font-mono">{req.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${eventTypeColors[req.eventType] || 'bg-gray-500/15 text-gray-300'}`}>
                            {req.eventType}
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-sm mt-0.5">{req.clientName}</h3>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${status.cls}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-brand-yellow" />
                        {format(parseISO(req.eventDate), 'd MMM yyyy', { locale: id })} · {req.eventTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-yellow" />
                        {req.venue}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        {req.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-gray-500" />
                        {req.komika.join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">Paket: <span className="text-gray-300">{req.packageName}</span></span>
                      <span className="text-xs text-gray-600">·</span>
                      <span className="text-xs text-gray-500">Masuk: {format(parseISO(req.submittedAt), 'd MMM yyyy HH:mm', { locale: id })}</span>
                    </div>
                  </div>
                </div>

                {/* Expanded Detail */}
                {isExpanded && (
                  <div className="border-t border-brand-border px-5 pb-5 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: Contact & Event */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Info Klien</h4>
                          <div className="space-y-1.5 text-sm">
                            <p className="flex items-center gap-2 text-gray-300">
                              <Phone className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                              {req.clientPhone}
                            </p>
                            <p className="flex items-center gap-2 text-gray-300">
                              <Mail className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                              {req.clientEmail}
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Detail Teknis</h4>
                          <div className="space-y-1.5 text-xs text-gray-400">
                            <p className="flex items-center gap-2">
                              <Mic className="w-3.5 h-3.5 text-brand-yellow" />
                              Mic: <span className="text-gray-300">{req.hasMic ? 'Tersedia' : 'Tidak tersedia'}</span>
                            </p>
                            <p className="flex items-center gap-2">
                              <Building className="w-3.5 h-3.5 text-brand-yellow" />
                              Setting: <span className="text-gray-300 capitalize">{req.setting}</span>
                            </p>
                          </div>
                        </div>
                        {req.specialMaterial && (
                          <div>
                            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Materi Khusus</h4>
                            <p className="text-xs text-gray-300 leading-relaxed bg-amber-500/5 border border-amber-500/15 rounded-lg p-3">
                              {req.specialMaterial}
                            </p>
                          </div>
                        )}
                        {req.notes && (
                          <div>
                            <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Catatan</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{req.notes}</p>
                          </div>
                        )}
                      </div>

                      {/* Right: Actions */}
                      <div>
                        <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-3">Komika yang Diminta</h4>
                        <div className="space-y-2 mb-6">
                          {req.komika.map((name) => {
                            const k = komika.find((k) => k.name === name)
                            return (
                              <div key={name} className="flex items-center gap-3 p-2.5 bg-white/3 rounded-xl">
                                {k ? (
                                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0">
                                    <img src={k.photo} alt={k.name} className="w-full h-full object-cover" />
                                  </div>
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-brand-border shrink-0" />
                                )}
                                <div>
                                  <p className="text-white text-xs font-semibold">{name}</p>
                                  {k && <p className="text-gray-500 text-xs">{k.level} · {k.specialty}</p>}
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Reject reason if rejected */}
                        {req.status === 'rejected' && req.rejectedReason && (
                          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                            <p className="text-red-300 text-xs font-semibold mb-1">Alasan Penolakan:</p>
                            <p className="text-gray-400 text-xs">{req.rejectedReason}</p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        {req.status === 'pending' && (
                          <div className="flex gap-3">
                            <button
                              onClick={() => approve(req.id)}
                              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 hover:bg-green-400 text-white text-sm font-bold rounded-xl transition-all"
                            >
                              <Check className="w-4 h-4" />
                              Setujui
                            </button>
                            <button
                              onClick={() => { setRejectModal(req.id); setRejectReason('') }}
                              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/30 text-sm font-bold rounded-xl transition-all"
                            >
                              <X className="w-4 h-4" />
                              Tolak
                            </button>
                          </div>
                        )}
                        {req.status === 'approved' && (
                          <div className="flex gap-3">
                            <div className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500/15 border border-green-500/30 text-green-300 text-sm font-semibold rounded-xl">
                              <CheckCircle className="w-4 h-4" />
                              Sudah Disetujui
                            </div>
                            <button
                              onClick={() => { setRejectModal(req.id); setRejectReason('') }}
                              className="px-4 py-2.5 bg-white/5 hover:bg-red-500/15 text-gray-400 hover:text-red-300 border border-brand-border hover:border-red-500/30 text-sm rounded-xl transition-all"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                        {req.status === 'rejected' && (
                          <button
                            onClick={() => approve(req.id)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-500/15 hover:bg-green-500/25 text-green-300 border border-green-500/30 text-sm font-semibold rounded-xl transition-all"
                          >
                            <Check className="w-4 h-4" />
                            Setujui Ulang
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-md p-6">
            <h3 className="text-white font-bold text-lg mb-1">Tolak Booking</h3>
            <p className="text-gray-400 text-sm mb-5">Berikan alasan penolakan agar klien dapat mencari alternatif lain.</p>
            <div className="mb-5">
              <label className="block text-xs text-gray-400 mb-1.5">Alasan Penolakan</label>
              <textarea
                rows={3}
                className="input-dark resize-none text-sm"
                placeholder="Contoh: Komika tidak tersedia pada tanggal tersebut, budget tidak sesuai, dll..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setRejectModal(null); setRejectReason('') }}
                className="flex-1 py-2.5 bg-brand-dark border border-brand-border text-gray-300 font-semibold rounded-xl hover:text-white transition-all"
              >
                Batal
              </button>
              <button
                onClick={confirmReject}
                className="flex-1 py-2.5 bg-red-500 hover:bg-red-400 text-white font-bold rounded-xl transition-all"
              >
                Konfirmasi Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
