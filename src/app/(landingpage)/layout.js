import Navbar from '@/components/(landingpage)/Navbar'
import Footer from '@/components/(landingpage)/Footer'
import { CartProvider } from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'

export const metadata = {
    title: 'Ecommerce Authentication Landing Page',
    description: 'This is a simple role based authentication system',
}

export default function LandingPageLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <CartProvider>
                    <Navbar />
                    {children}
                    <Footer />
                    <Toaster
                        position="bottom-right"
                        reverseOrder={false} />
                </CartProvider>
            </body>
        </html>
    )
}
