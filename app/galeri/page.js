'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { X, ZoomIn, Image as ImageIcon, Play, Calendar } from 'lucide-react'
import { gallery as galleryMock } from '@/lib/mockData'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

async function fetchGallery() {
  await new Promise((r) => setTimeout(r, 300))
  return galleryMock
}

export default function GaleriPage() {
  const [filter, setFilter] = useState('Semua')
  const [selected, setSelected] = useState(null)

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['gallery'],
    queryFn: fetchGallery,
  })

  const filtered = filter === 'Semua' ? items : filter === 'Foto' ? items.filter((i) => i.type === 'photo') : items.filter((i) => i.type === 'video')

  return (
    <div className="page-enter min-h-screen bg-brand-dark pt-24">
      {/* Header */}
      <div className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,215,0,0.12)_0%,transparent_70%)] py-14">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">Galeri Pecah!</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Momen-momen terbaik komunitas StandupIndo Tangerang. Foto & video dari berbagai show dan open mic.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        {/* Filter tabs */}
        <div className="flex gap-3 mb-8">
          {['Semua', 'Foto', 'Video'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                filter === tab ? 'bg-brand-yellow text-black' : 'bg-brand-card border border-brand-border text-gray-400 hover:text-white'
              }`}
            >
              {tab === 'Foto' && <ImageIcon className="w-4 h-4" />}
              {tab === 'Video' && <Play className="w-4 h-4" />}
              {tab}
            </button>
          ))}
          <span className="ml-auto text-gray-500 text-sm self-center">{filtered.length} item</span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          /* Masonry-like grid */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <div
                key={item.id}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl bg-brand-card border border-brand-border hover:border-brand-yellow/30 transition-all cursor-pointer"
                style={{ marginBottom: '1rem' }}
                onClick={() => setSelected(item)}
              >
                <div className={`relative overflow-hidden ${
                  i % 5 === 0 ? 'h-72' : i % 3 === 0 ? 'h-48' : 'h-60'
                }`}>
                  <Image
                    src={item.thumb}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  {/* Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm font-semibold">{item.title}</p>
                    <p className="text-gray-300 text-xs">{item.event}</p>
                  </div>
                  {/* Zoom icon */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-brand-yellow/90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-black ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
                {/* Caption */}
                <div className="p-3">
                  <p className="text-white text-xs font-medium line-clamp-1">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {format(parseISO(item.date), 'd MMM yyyy', { locale: id })}
                    <span>·</span>
                    <span>{item.event}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all"
            onClick={() => setSelected(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative max-w-4xl w-full max-h-[80vh] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[60vh]">
              <Image src={selected.src} alt={selected.title} fill className="object-contain" sizes="100vw" />
            </div>
            <div className="p-5 bg-brand-card">
              <h3 className="text-white font-bold mb-1">{selected.title}</h3>
              <p className="text-gray-400 text-sm">{selected.caption}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{format(parseISO(selected.date), 'd MMMM yyyy', { locale: id })}</span>
                <span>·</span>
                <span>{selected.event}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
