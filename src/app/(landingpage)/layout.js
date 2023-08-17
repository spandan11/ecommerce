import Navbar from '@/components/(landingpage)/Navbar'
import Footer from '@/components/(landingpage)/Footer'
import { CartProvider } from '@/providers/CartProvider'

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
                </CartProvider>
            </body>
        </html>
    )
}
