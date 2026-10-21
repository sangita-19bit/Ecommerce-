import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import AuthModal from './components/AuthModal';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'Swan Botanicals — Premium Botanical Skincare',
    template: '%s | Swan Botanicals',
  },
  description:
    'Premium botanical skincare crafted with nature\'s finest ingredients. Discover chamomile, lavender, rose and green tea formulations for radiant, healthy skin.',
  keywords: ['botanical skincare', 'organic beauty', 'natural skincare', 'clean beauty', 'plant-based'],
  openGraph: {
    title: 'Swan Botanicals — Premium Botanical Skincare',
    description: 'Premium botanical skincare crafted with nature\'s finest ingredients.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <Navigation />
                <main id="main-content" className="pt-[72px] min-h-screen">
                  {children}
                </main>
                <Footer />
                <AuthModal />
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
