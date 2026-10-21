'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, ShoppingBag, Menu, X, Leaf, User as UserIcon, LogOut, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from './CartDrawer';
import SearchModal from './SearchModal';

const navLinks = [
  { name: 'Home',    href: '/' },
  { name: 'Shop',    href: '/products' },
  { name: 'About',   href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout, openAuthModal } = useAuth();

  const [isScrolled,       setIsScrolled]       = useState(false);
  const [mobileOpen,       setMobileOpen]       = useState(false);
  const [cartOpen,         setCartOpen]         = useState(false);
  const [searchOpen,       setSearchOpen]       = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-sand'
            : 'bg-white border-b border-sand/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="Swan Botanicals — home"
          >
            <div className="w-8 h-8 bg-forest rounded-full flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <span className="font-display text-xl font-semibold text-charcoal tracking-tight">
              Swan Botanicals
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative font-body text-sm font-medium transition-colors duration-200 py-1 ${
                    isActive ? 'text-forest' : 'text-charcoal hover:text-forest'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-forest rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ── Right icons ── */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="w-9 h-9 flex items-center justify-center rounded-full text-stone hover:text-forest hover:bg-cream transition-all duration-150 cursor-pointer"
            >
              <Search className="w-4.5 h-4.5" aria-hidden="true" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ''}`}
              className="relative w-9 h-9 flex items-center justify-center rounded-full text-stone hover:text-forest hover:bg-cream transition-all duration-150"
            >
              <Heart className="w-4.5 h-4.5" aria-hidden="true" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-forest text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
              className="relative w-9 h-9 flex items-center justify-center rounded-full text-stone hover:text-forest hover:bg-cream transition-all duration-150 cursor-pointer"
            >
              <ShoppingBag className="w-4.5 h-4.5" aria-hidden="true" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-forest text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* User Account / Auth */}
            <div className="relative" ref={userMenuRef}>
              {user ? (
                <div>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    aria-label="Account menu"
                    className="w-9 h-9 rounded-full bg-forest text-white flex items-center justify-center font-display text-xs font-semibold hover:bg-forest/90 transition shadow-sm cursor-pointer ml-1"
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-sand py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-sand/50">
                        <p className="text-xs font-semibold text-charcoal truncate">{user.name}</p>
                        <p className="text-[11px] text-stone truncate">{user.email}</p>
                        {user.role === 'admin' && (
                          <span className="inline-block mt-1 text-[9px] bg-forest/10 text-forest px-1.5 py-0.5 rounded font-semibold uppercase">
                            Admin
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-body text-red-600 hover:bg-red-50 flex items-center gap-2 transition cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  aria-label="Sign in"
                  className="w-9 h-9 flex items-center justify-center rounded-full text-stone hover:text-forest hover:bg-cream transition-all duration-150 cursor-pointer ml-1"
                >
                  <UserIcon className="w-4.5 h-4.5" aria-hidden="true" />
                </button>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-stone hover:text-forest hover:bg-cream transition-all duration-150 ml-1 cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      <>
        {/* Backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-40 md:hidden animate-fade-in"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
        )}

        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className={`
            fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-sand md:hidden
            transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'}
          `}
        >
          <ul className="px-6 py-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block py-3 font-body text-base font-medium border-b border-sand/50 transition-colors duration-150 ${
                      isActive ? 'text-forest' : 'text-charcoal'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
            <li className="pt-3">
              <Link
                href="/wishlist"
                className="flex items-center gap-3 py-3 font-body text-base font-medium text-charcoal transition-colors duration-150"
              >
                <Heart className="w-4 h-4 text-stone" />
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-auto text-xs font-semibold bg-cream text-forest px-2 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <button
                onClick={() => { setMobileOpen(false); setCartOpen(true); }}
                className="flex items-center gap-3 w-full py-3 font-body text-base font-medium text-charcoal cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-stone" />
                Cart
                {cartCount > 0 && (
                  <span className="ml-auto text-xs font-semibold bg-cream text-forest px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </li>

            {/* Mobile Auth entry */}
            <li className="pt-2 border-t border-sand/60">
              {user ? (
                <div className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center font-display text-xs font-semibold">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-charcoal">{user.name}</p>
                      <p className="text-xs text-stone">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      logout();
                    }}
                    className="text-xs font-medium text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    openAuthModal('login');
                  }}
                  className="w-full mt-2 py-2.5 bg-forest text-white rounded-xl text-center text-sm font-medium hover:bg-forest/90 transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserIcon className="w-4 h-4" />
                  Sign In / Register
                </button>
              )}
            </li>
          </ul>
        </nav>
      </>

      {/* ── Drawers & Modals ── */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
