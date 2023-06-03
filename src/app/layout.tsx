'use client';
import './globals.css'
import { Inter } from 'next/font/google'
import { GlobalContextProvider } from '@/data/context/AppContext';
import { AuthProvider } from '@/data/context/AuthContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
        <GlobalContextProvider>
          {children}
        </GlobalContextProvider>
        </AuthProvider>
      </body>

    </html>
  )
}
