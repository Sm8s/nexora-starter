import './globals.css'
import type { Metadata } from 'next'
import EasterEggLogo from '@/components/EasterEggLogo'

export const metadata: Metadata = {
  title: 'NEXORA Starter',
  description: 'Developer Portfolio & Learning Hub (Starter)',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header className="container py-6 flex items-center gap-3">
          <EasterEggLogo />
          <h1 className="text-xl font-semibold tracking-tight">NEXORA</h1>
          <div className="ml-auto text-sm opacity-75">Starter</div>
        </header>
        <main className="container">{children}</main>
        <footer className="container py-10 text-xs opacity-60">© {new Date().getFullYear()} NEXORA</footer>
      </body>
    </html>
  )
}
