import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Eye, Calendar, Tag } from 'lucide-react'
import { blogPosts } from '@/lib/mockData'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return { title: `${post.title} | Blog StandupIndo Tangerang`, description: post.excerpt }
}

export default function BlogDetailPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.id !== post.id && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))).slice(0, 3)

  const contentLines = post.content.split('\n')

  return (
    <div className="page-enter min-h-screen bg-brand-dark pt-24">
      <div className="container mx-auto px-4 lg:px-8 py-10 max-w-4xl">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-yellow text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Blog
        </Link>

        {/* Hero */}
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 800px" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="badge-yellow px-2.5 py-1 rounded-full text-xs font-semibold">{post.category}</span>
          </div>
        </div>

        {/* Title & Meta */}
        <h1 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-brand-border">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image src={post.authorPhoto} alt={post.author} fill className="object-cover" sizes="32px" />
            </div>
            <div>
              <p className="text-white text-xs font-semibold">{post.author}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{format(parseISO(post.date), 'd MMMM yyyy', { locale: id })}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{post.views.toLocaleString()} views</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-8">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/5 border border-brand-border rounded-full text-xs text-gray-400">#{tag}</span>
          ))}
        </div>

        {/* Content */}
        <div className="prose-custom">
          {contentLines.map((line, i) => {
            if (line.startsWith('## ')) {
              return <h2 key={i} className="text-2xl font-black text-white mt-8 mb-4">{line.slice(3)}</h2>
            }
            if (line.startsWith('### ')) {
              return <h3 key={i} className="text-lg font-bold text-brand-yellow mt-6 mb-3">{line.slice(4)}</h3>
            }
            if (line.startsWith('- ')) {
              return (
                <li key={i} className="text-gray-300 text-sm leading-relaxed ml-4 mb-1 list-disc">
                  {line.slice(2).split('**').map((part, j) =>
                    j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
                  )}
                </li>
              )
            }
            if (line.startsWith('> ')) {
              return (
                <blockquote key={i} className="border-l-4 border-brand-yellow pl-4 my-4 italic text-gray-300 text-sm">
                  {line.slice(2)}
                </blockquote>
              )
            }
            if (line.match(/^\d+\./)) {
              return <p key={i} className="text-gray-300 text-sm leading-relaxed ml-4 mb-1">{line}</p>
            }
            if (line === '') return <div key={i} className="h-3" />
            return (
              <p key={i} className="text-gray-300 text-sm leading-relaxed mb-2">
                {line.split('**').map((part, j) =>
                  j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
                )}
              </p>
            )
          })}
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16 pt-10 border-t border-brand-border">
            <h3 className="text-white font-bold text-xl mb-6">Artikel Terkait</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group bg-brand-card border border-brand-border rounded-xl overflow-hidden hover:border-brand-yellow/30 transition-all"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image src={p.coverImage} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card to-transparent" />
                  </div>
                  <div className="p-3">
                    <p className="text-white text-xs font-semibold line-clamp-2 group-hover:text-brand-yellow transition-colors">{p.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{p.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
