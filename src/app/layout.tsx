import ThemeProvider from '@/context/ThemeContext'
import '@/styles/globals.css'

export const metadata = {
  title: 'Luke Bell',
  description: 'Zoomed way in',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#e1e1e1] font-['OCRAStd']">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 
