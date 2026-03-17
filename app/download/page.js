'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useQuery } from '@tanstack/react-query'
import { Download, Search, Star, ShoppingCart, Grid, List, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ChevronsUpDown, Play, X, Check } from 'lucide-react'
import { downloads as downloadsMock } from '@/lib/mockData'

async function fetchDownloads() {
  await new Promise((r) => setTimeout(r, 400))
  return downloadsMock
}

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price)
}

export default function DownloadPage() {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 })

  const { data = [], isLoading } = useQuery({
    queryKey: ['downloads'],
    queryFn: fetchDownloads,
  })

  const toggleCart = (item) => {
    setCart((prev) =>
      prev.find((c) => c.id === item.id)
        ? prev.filter((c) => c.id !== item.id)
        : [...prev, item]
    )
  }

  const inCart = (id) => cart.some((c) => c.id === id)
  const totalCart = cart.reduce((sum, c) => sum + c.price, 0)

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: 'Judul',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
              <Image src={row.original.coverImage} alt={row.original.title} fill className="object-cover" sizes="48px" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">{row.original.title}</div>
              {row.original.isNew && <span className="badge-orange px-1.5 py-0.5 rounded text-xs font-semibold">NEW</span>}
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'artist',
        header: 'Komika',
        cell: ({ getValue }) => <span className="text-brand-yellow text-sm font-medium">{getValue()}</span>,
      },
      {
        accessorKey: 'duration',
        header: 'Durasi',
        cell: ({ getValue }) => <span className="text-gray-400 text-sm">{getValue()}</span>,
      },
      {
        accessorKey: 'tracks',
        header: 'Tracks',
        cell: ({ getValue }) => <span className="text-gray-400 text-sm">{getValue()} tracks</span>,
      },
      {
        accessorKey: 'downloads',
        header: 'Downloads',
        cell: ({ getValue }) => (
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Download className="w-3.5 h-3.5" />
            {getValue().toLocaleString()}
          </div>
        ),
      },
      {
        accessorKey: 'rating',
        header: 'Rating',
        cell: ({ getValue }) => (
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
            <span className="text-white text-sm font-semibold">{getValue()}</span>
          </div>
        ),
      },
      {
        accessorKey: 'price',
        header: 'Harga',
        cell: ({ getValue }) => <span className="text-brand-yellow font-bold">{formatPrice(getValue())}</span>,
      },
      {
        id: 'action',
        header: 'Aksi',
        cell: ({ row }) => (
          <button
            onClick={() => toggleCart(row.original)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              inCart(row.original.id)
                ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                : 'bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow hover:bg-brand-yellow/20'
            }`}
          >
            {inCart(row.original.id) ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
            {inCart(row.original.id) ? 'Ditambah' : 'Beli'}
          </button>
        ),
      },
    ],
    [cart]
  )

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, sorting, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const pageCount = table.getPageCount()
  const { pageIndex, pageSize } = table.getState().pagination
  const totalRows = table.getFilteredRowModel().rows.length

  return (
    <div className="page-enter min-h-screen bg-brand-dark pt-24">
      {/* Header */}
      <div className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,215,0,0.12)_0%,transparent_70%)] py-14">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">Digital Downloads</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Rekaman special show komika lokal Tangerang. Beli sekali, dengar selamanya.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        {/* Controls bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari judul atau komika..."
              className="input-dark pl-9 text-sm"
              value={globalFilter}
              onChange={(e) => { setGlobalFilter(e.target.value); setPagination((p) => ({ ...p, pageIndex: 0 })) }}
            />
          </div>
          <div className="flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative flex items-center gap-2 px-4 py-2 bg-brand-yellow text-black text-sm font-bold rounded-xl hover:bg-yellow-400 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              Keranjang
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-brand-red text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
            {/* View toggle */}
            <div className="flex gap-1">
              <button
                onClick={() => { setViewMode('grid'); setPagination((p) => ({ ...p, pageSize: 8 })) }}
                className={`p-2 rounded-lg border transition-all ${viewMode === 'grid' ? 'bg-brand-yellow/10 border-brand-yellow/30 text-brand-yellow' : 'bg-brand-card border-brand-border text-gray-400'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => { setViewMode('table'); setPagination((p) => ({ ...p, pageSize: 10 })) }}
                className={`p-2 rounded-lg border transition-all ${viewMode === 'table' ? 'bg-brand-yellow/10 border-brand-yellow/30 text-brand-yellow' : 'bg-brand-card border-brand-border text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
          </div>
        ) : viewMode === 'grid' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {table.getRowModel().rows.map(({ original: item }) => (
                <div
                  key={item.id}
                  className={`group bg-brand-card rounded-2xl overflow-hidden border transition-all hover:shadow-yellow-sm ${
                    inCart(item.id) ? 'border-green-500/40' : 'border-brand-border hover:border-brand-yellow/30'
                  }`}
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image src={item.coverImage} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card/90 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <Play className="w-10 h-10 text-brand-yellow" />
                    </div>
                    {item.isNew && <span className="absolute top-3 left-3 badge-orange px-2 py-0.5 rounded-full text-xs font-semibold">NEW</span>}
                    {item.isFeatured && <span className="absolute top-3 right-3 badge-yellow px-2 py-0.5 rounded-full text-xs font-semibold">Featured</span>}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white text-sm mb-0.5 line-clamp-1">{item.title}</h3>
                    <p className="text-brand-yellow text-xs font-medium mb-1">{item.artist}</p>
                    <p className="text-gray-500 text-xs mb-3">{item.duration} · {item.tracks} tracks</p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Star className="w-3 h-3 text-brand-yellow fill-brand-yellow" />
                        <span className="font-semibold text-white">{item.rating}</span>
                        <span>· {item.downloads.toLocaleString()} unduhan</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-brand-border">
                      <span className="text-brand-yellow font-bold text-sm">{formatPrice(item.price)}</span>
                      <button
                        onClick={() => toggleCart(item)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                          inCart(item.id)
                            ? 'bg-green-500/20 border border-green-500/40 text-green-400'
                            : 'bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow hover:bg-brand-yellow/20'
                        }`}
                      >
                        {inCart(item.id) ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                        {inCart(item.id) ? 'Added' : 'Beli'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <PaginationBar table={table} pageIndex={pageIndex} pageSize={pageSize} totalRows={totalRows} pageCount={pageCount} />
          </>
        ) : (
          <>
            <div className="bg-brand-card rounded-2xl border border-brand-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="tanstack-table">
                  <thead>
                    {table.getHeaderGroups().map((hg) => (
                      <tr key={hg.id}>
                        {hg.headers.map((header) => (
                          <th key={header.id} onClick={header.column.getToggleSortingHandler()} className="cursor-pointer">
                            <div className="flex items-center gap-1">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {header.column.getCanSort() && (
                                header.column.getIsSorted() === 'asc' ? <ChevronUp className="w-3 h-3" /> :
                                header.column.getIsSorted() === 'desc' ? <ChevronDown className="w-3 h-3" /> :
                                <ChevronsUpDown className="w-3 h-3 opacity-30" />
                              )}
                            </div>
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <PaginationBar table={table} pageIndex={pageIndex} pageSize={pageSize} totalRows={totalRows} pageCount={pageCount} />
          </>
        )}
      </div>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-brand-card border border-brand-border rounded-2xl w-full max-w-md max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-brand-border">
              <h3 className="text-white font-bold text-lg">Keranjang ({cart.length})</h3>
              <button onClick={() => setShowCart(false)} className="p-1 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {cart.length === 0 ? (
                <p className="text-gray-400 text-center py-8 text-sm">Keranjang kosong</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-brand-dark rounded-xl">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image src={item.coverImage} alt={item.title} fill className="object-cover" sizes="48px" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white text-sm">{item.title}</p>
                      <p className="text-brand-yellow text-xs">{formatPrice(item.price)}</p>
                    </div>
                    <button onClick={() => toggleCart(item)} className="p-1 text-gray-400 hover:text-red-400">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-5 border-t border-brand-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">Total</span>
                  <span className="text-brand-yellow font-black text-xl">{formatPrice(totalCart)}</span>
                </div>
                <button className="w-full py-3 bg-brand-yellow text-black font-bold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Checkout & Download
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function PaginationBar({ table, pageIndex, pageSize, totalRows, pageCount }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-sm">
      <span className="text-gray-400 text-xs">
        Menampilkan {pageIndex * pageSize + 1}–{Math.min((pageIndex + 1) * pageSize, totalRows)} dari {totalRows} album
      </span>
      <div className="flex items-center gap-2">
        <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} className="p-2 rounded-lg bg-brand-card border border-brand-border text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed">«</button>
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="p-2 rounded-lg bg-brand-card border border-brand-border text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed">
          <ChevronLeft className="w-4 h-4" />
        </button>
        {Array.from({ length: pageCount }, (_, i) => i).map((i) => (
          <button key={i} onClick={() => table.setPageIndex(i)} className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${i === pageIndex ? 'bg-brand-yellow text-black font-bold' : 'bg-brand-card border border-brand-border text-gray-400 hover:text-white'}`}>
            {i + 1}
          </button>
        ))}
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="p-2 rounded-lg bg-brand-card border border-brand-border text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed">
          <ChevronRight className="w-4 h-4" />
        </button>
        <button onClick={() => table.setPageIndex(pageCount - 1)} disabled={!table.getCanNextPage()} className="p-2 rounded-lg bg-brand-card border border-brand-border text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed">»</button>
      </div>
    </div>
  )
}
