
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Glenn Dalbey - AI & Data Science Portfolio',
  description: 'Professional portfolio showcasing Glenn Dalbey\'s expertise in AI, machine learning, and data science. Explore innovative projects, technical skills, and AI-powered solutions.',
  keywords: [
    'Glenn Dalbey',
    'Data Science',
    'Artificial Intelligence',
    'Machine Learning',
    'AI Portfolio',
    'PyTorch',
    'TensorFlow',
    'Healthcare AI',
    'Multi-modal AI',
    'Computer Vision',
    'NLP'
  ],
  authors: [{ name: 'Glenn Dalbey' }],
  creator: 'Glenn Dalbey',
  publisher: 'Glenn Dalbey',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://glenn-dalbey.com'),
  openGraph: {
    title: 'Glenn Dalbey - AI & Data Science Portfolio',
    description: 'Explore innovative AI projects and technical expertise from Glenn Dalbey, featuring live healthcare AI systems, multi-modal analysis, and advanced machine learning solutions.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Glenn Dalbey Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glenn Dalbey - AI & Data Science Portfolio',
    description: 'Professional AI & Data Science portfolio featuring innovative projects and technical expertise.',
    creator: '@GlennDalbey',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen bg-background">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
