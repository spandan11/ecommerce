import Navbar from '@/components/(landingpage)/Navbar'
import Footer from '@/components/(landingpage)/Footer'
import { CartProvider } from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'

export const metadata = {
    title: 'eCommerce: Your Ultimate Fashion Destination',
    description: 'Explore fashion, elevate your style. Shop the latest trends, top brands, and exclusive deals at ShopStyle.',
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
