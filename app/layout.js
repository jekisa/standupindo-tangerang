import './globals.css'
import QueryProvider from '@/providers/QueryProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'StandupIndo Tangerang — Komunitas Standup Comedy Tangerang',
  description: 'Komunitas standup comedy terbesar di Tangerang. Open mic mingguan, digital download special show, booking komika, dan info lengkap jadwal dan lokasi.',
  keywords: 'standup comedy tangerang, open mic tangerang, komika tangerang, standup indonesia',
  openGraph: {
    title: 'StandupIndo Tangerang',
    description: 'Komunitas Standup Comedy Tangerang',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="bg-brand-dark text-white antialiased">
        <QueryProvider>
          <div className="noise-overlay" aria-hidden="true" />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  )
}
