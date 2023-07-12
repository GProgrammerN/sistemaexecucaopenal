import './globals.css'
import { Inter } from 'next/font/google'
import { GlobalContextProvider } from '@/data/context/AppContext';
import { AuthProvider } from '@/data/context/AuthContext';

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: 'Sistema de Execução Penal',
  description: 'Gerenciamento de Execução Penal',
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
