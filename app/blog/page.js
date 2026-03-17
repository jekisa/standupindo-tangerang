'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { Search, Clock, Eye, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/lib/mockData'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

async function fetchPosts() {
  await new Promise((r) => setTimeout(r, 200))
  return blogPosts
}

export default function BlogPage() {
  const [search, setSearch] = useState('')

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchPosts,
  })

  const filtered = useMemo(() => {
    if (!search) return posts
    return posts.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase())
    )
  }, [posts, search])

  const featured = filtered[0]
  const rest = filtered.slice(1)

  return (
    <div className="page-enter min-h-screen bg-brand-dark pt-24">
      {/* Header */}
      <div className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,215,0,0.12)_0%,transparent_70%)] py-14">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-3">Blog & Kamus Standup</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-sm">
            Pelajari istilah-istilah standup comedy dan jadi penonton yang lebih apresiatif. Dari setup-punchline sampai dark comedy.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        {/* Search */}
        <div className="flex justify-end mb-10">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Cari artikel..."
              className="input-dark pl-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p>Tidak ada artikel yang cocok.</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block mb-10">
                <div className="relative bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-yellow/30 hover:shadow-yellow-sm transition-all">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="relative lg:col-span-3 h-56 lg:h-auto min-h-[280px] overflow-hidden">
                      <Image src={featured.coverImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 100vw, 60vw" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-card/80 lg:block hidden" />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent lg:hidden" />
                    </div>
                    <div className="lg:col-span-2 p-6 flex flex-col justify-center">
                      <span className="badge-yellow px-2.5 py-1 rounded-full text-xs font-semibold mb-3 inline-block w-fit">
                        Featured · {featured.category}
                      </span>
                      <h2 className="text-xl lg:text-2xl font-black text-white mb-3 leading-tight group-hover:text-brand-yellow transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featured.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {featured.views.toLocaleString()} views
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="relative w-7 h-7 rounded-full overflow-hidden">
                          <Image src={featured.authorPhoto} alt={featured.author} fill className="object-cover" sizes="28px" />
                        </div>
                        <span className="text-xs text-gray-400">{featured.author}</span>
                        <span className="text-xs text-gray-600">·</span>
                        <span className="text-xs text-gray-500">{format(parseISO(featured.date), 'd MMM yyyy', { locale: id })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-brand-card border border-brand-border rounded-2xl overflow-hidden hover:border-brand-yellow/30 hover:shadow-yellow-sm transition-all"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-brand-card/20 to-transparent" />
                    <span className="absolute top-3 left-3 badge-yellow px-2.5 py-0.5 rounded-full text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-brand-yellow transition-colors text-sm">
                      {post.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-white/5 rounded text-xs text-gray-400">#{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-brand-border">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                        <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{post.views.toLocaleString()}</span>
                      </div>
                      <span>{format(parseISO(post.date), 'd MMM yyyy', { locale: id })}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
