// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Logo from '@/components/Logo'
import AuthMenu from '@/components/AuthMenu'
import EasterEggLogo from '@/components/EasterEggLogo'

export const metadata: Metadata = {
  title: 'NEXORA Starter',
  description: 'Developer Portfolio & Learning Hub (Starter)',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header className="container py-6 flex items-center gap-6">
          <EasterEggLogo />
          <Logo />
          <Nav />
          <div className="ml-auto">
            <AuthMenu />
          </div>
        </header>

        <main className="container">{children}</main>

        <footer className="container py-10 text-xs opacity-60">
          © {new Date().getFullYear()} NEXORA
        </footer>
      </body>
    </html>
  )
}
