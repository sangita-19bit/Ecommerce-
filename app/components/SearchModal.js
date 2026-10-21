'use client';

// ─── SearchModal ──────────────────────────────────────────────────────────────
// Full-screen search overlay with live product filtering.

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { products as fallbackProducts } from '../data/products';

export default function SearchModal({ isOpen, onClose }) {
  const [productList, setProductList] = useState(fallbackProducts);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Fetch live products when opened
  useEffect(() => {
    if (isOpen) {
      fetch('/api/products')
        .then((res) => res.json())
        .then((data) => {
          if (data?.products?.length) {
            setProductList(data.products);
          }
        })
        .catch(() => {});
    }
  }, [isOpen]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Filter products
  const q = query.trim().toLowerCase();
  const results = q.length >= 2
    ? productList.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        (p.badge && p.badge.toLowerCase().includes(q))
      )
    : [];

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm animate-fade-in flex items-start justify-center pt-[10vh] px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate-scale-in">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-sand">
          <Search className="w-5 h-5 text-stone shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories..."
            className="flex-1 font-body text-charcoal text-base bg-transparent outline-none placeholder:text-mist"
            aria-label="Search query"
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="text-stone hover:text-charcoal transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close search"
            className="text-stone hover:text-charcoal transition-colors pl-2 border-l border-sand"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {q.length >= 2 && results.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-body text-stone text-sm">
                No products found for &ldquo;{query}&rdquo;
              </p>
              <Link
                href="/products"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 mt-4 text-forest text-sm font-medium hover:underline"
              >
                Browse all products <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {results.length > 0 && (
            <ul role="listbox" aria-label="Search results">
              {results.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-cream transition-colors duration-150 group"
                    role="option"
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-sand shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={56}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-medium text-sm text-charcoal group-hover:text-forest transition-colors line-clamp-1">
                        {product.name}
                      </p>
                      <p className="text-xs text-stone mt-0.5">{product.category} · {product.volume}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-body font-semibold text-sm text-charcoal">
                        ${product.price.toFixed(2)}
                      </p>
                      {product.originalPrice && (
                        <p className="text-xs text-stone line-through">
                          ${product.originalPrice.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-mist group-hover:text-forest transition-colors shrink-0" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {q.length < 2 && (
            <div className="px-5 py-6">
              <p className="text-xs font-body text-stone uppercase tracking-widest mb-3">Popular</p>
              <div className="flex flex-wrap gap-2">
                {products.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/${p.slug}`}
                    onClick={onClose}
                    className="text-sm font-body text-charcoal bg-cream hover:bg-sand px-3 py-1.5 rounded-full transition-colors duration-150"
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
