import './globals.css'
// import { Poppins } from 'next/font/google'
import Providers from '@/providers/Providers'

// const poppins = Poppins({
//   weight: ['400', '500', '600'],
//   subsets: ['latin'],
//   display: 'swap',
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
