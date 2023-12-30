import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/providers/ThemeProvider'
import AuthProvider from '@/providers/AuthProvider'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'To-Do List',
  description: 'Created with ❤️ by Aneesh',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        <link rel="icon" href="/favicon/favicon.ico" />
      </head>

      <body className={`${inter.className}  `}>
        <AuthProvider >
          <ThemeProvider attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange>

            <Header />
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>

  )
}
