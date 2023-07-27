import Navbar from '@/components/(landingpage)/Navbar'
import Footer from '@/components/(landingpage)/Footer'

export const metadata = {
    title: 'Ecommerce Authentication Landing Page',
    description: 'This is a simple role based authentication system',
}

export default function LandingPageLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    )
}
