import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CRAIG-O-METRICS | Business Metrics Dashboard',
  description: 'Track your KPIs, MRR, churn, and growth with beautiful charts and weekly reports.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-white antialiased">
        {children}
      </body>
    </html>
  )
}
