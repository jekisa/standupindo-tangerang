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
import { Star, Search, ChevronUp, ChevronDown, ChevronsUpDown, Grid, List, Instagram, ChevronLeft, ChevronRight } from 'lucide-react'
import { komika as komikaMock } from '@/lib/mockData'

async function fetchKomika() {
  await new Promise((r) => setTimeout(r, 300))
  return komikaMock
}

const levelColors = {
  Senior: 'badge-yellow',
  Mid: 'badge-blue',
  Newbie: 'badge-green',
}
const statusColors = {
  Active: 'badge-green',
  'Semi-Active': 'badge-orange',
  Inactive: 'badge-red',
}

export default function KomikaPage() {
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState([])
  const [viewMode, setViewMode] = useState('grid')
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 9 })

  const { data = [], isLoading } = useQuery({
    queryKey: ['komika'],
    queryFn: fetchKomika,
  })

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Komika',
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
              <Image src={row.original.photo} alt={row.original.name} fill className="object-cover" sizes="40px" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">{row.original.name}</div>
              <div className="text-xs text-brand-yellow">"{row.original.nickname}"</div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: 'level',
        header: 'Level',
        cell: ({ getValue }) => (
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${levelColors[getValue()] || 'badge-yellow'}`}>
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: 'specialty',
        header: 'Spesialisasi',
        cell: ({ getValue }) => <span className="text-gray-300 text-sm">{getValue()}</span>,
      },
      {
        accessorKey: 'area',
        header: 'Area',
        cell: ({ getValue }) => <span className="text-gray-400 text-sm">{getValue()}</span>,
      },
      {
        accessorKey: 'shows',
        header: 'Total Show',
        cell: ({ getValue }) => (
          <span className="text-white font-bold text-sm">{getValue()}</span>
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
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => (
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[getValue()] || 'badge-yellow'}`}>
            {getValue()}
          </span>
        ),
      },
    ],
    []
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

  return (
    <div className="page-enter min-h-screen bg-brand-dark pt-24">
      {/* Header */}
      <div className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,215,0,0.12)_0%,transparent_70%)] py-14">
        <div className="container mx-auto px-4 lg:px-8 text-center">

          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">Direktori Komika</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Dari senior veteran hingga newbie berbakat — semua komika StandupIndo Tangerang ada di sini.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Cari komika..."
                className="input-dark pl-9 text-sm"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => { setViewMode('grid'); setPagination((p) => ({ ...p, pageSize: 9 })) }}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {table.getRowModel().rows.map(({ original: k }) => (
                <div
                  key={k.id}
                  className="group bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-yellow/30 hover:shadow-yellow-sm transition-all"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image src={k.photo} alt={k.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/10 to-transparent" />
                    <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold ${levelColors[k.level]}`}>{k.level}</span>
                    <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[k.status]}`}>{k.status}</span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-white">{k.name}</h3>
                        <p className="text-brand-yellow text-xs font-medium">"{k.nickname}"</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3.5 h-3.5 text-brand-yellow fill-brand-yellow" />
                        <span className="text-white font-bold">{k.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">{k.bio}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {k.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-brand-border">
                      <span>{k.shows} show · {k.area}</span>
                      <a href={`https://instagram.com/${k.instagram.slice(1)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gray-400 hover:text-pink-400 transition-colors">
                        <Instagram className="w-3.5 h-3.5" />{k.instagram}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination table={table} />
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
                          <th
                            key={header.id}
                            onClick={header.column.getToggleSortingHandler()}
                            className="cursor-pointer select-none"
                          >
                            <div className="flex items-center gap-1">
                              {flexRender(header.column.columnDef.header, header.getContext())}
                              {header.column.getCanSort() && (
                                header.column.getIsSorted() === 'asc' ? (
                                  <ChevronUp className="w-3 h-3" />
                                ) : header.column.getIsSorted() === 'desc' ? (
                                  <ChevronDown className="w-3 h-3" />
                                ) : (
                                  <ChevronsUpDown className="w-3 h-3 opacity-30" />
                                )
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
                          <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <Pagination table={table} />
          </>
        )}
      </div>
    </div>
  )
}

function Pagination({ table }) {
  const { pageIndex, pageSize } = table.getState().pagination
  const pageCount = table.getPageCount()
  const totalRows = table.getFilteredRowModel().rows.length

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-sm">
      <span className="text-gray-400 text-xs">
        Menampilkan {pageIndex * pageSize + 1}–{Math.min((pageIndex + 1) * pageSize, totalRows)} dari {totalRows} komika
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="p-2 rounded-lg bg-brand-card border border-brand-border text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          «
        </button>
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="p-2 rounded-lg bg-brand-card border border-brand-border text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {Array.from({ length: pageCount }, (_, i) => i).map((i) => (
          <button
            key={i}
            onClick={() => table.setPageIndex(i)}
            className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
              i === pageIndex
                ? 'bg-brand-yellow text-black font-bold'
                : 'bg-brand-card border border-brand-border text-gray-400 hover:text-white'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="p-2 rounded-lg bg-brand-card border border-brand-border text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
          className="p-2 rounded-lg bg-brand-card border border-brand-border text-gray-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          »
        </button>
      </div>
    </div>
  )
}
