'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShoppingBag, Truck, RotateCcw, ChevronRight, Minus, Plus } from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/Toast';
import Rating from '../../components/Rating';
import WishlistButton from '../../components/WishlistButton';
import ProductCard from '../../components/ProductCard';

const TABS = ['Description', 'Benefits', 'Ingredients', 'Usage'];

export default function ProductDetailPage({ params }) {
  // Resolve params for Next.js 15 compatibility
  const resolvedParams = React.use ? React.use(params) : params;
  const productId = resolvedParams?.id;

  const fallbackProduct = getProductBySlug(productId);
  const [product, setProduct] = useState(fallbackProduct);
  const [related, setRelated] = useState(() => getRelatedProducts(productId, 3));
  const [loading, setLoading] = useState(!fallbackProduct);

  const { addToCart } = useCart();
  const { show } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('Description');
  const [added, setAdded] = useState(false);

  // Fetch product from MongoDB API
  useEffect(() => {
    let ignore = false;
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${productId}`);
        if (res.ok) {
          const data = await res.json();
          if (!ignore && data.product) {
            setProduct(data.product);
            if (data.related && data.related.length > 0) {
              setRelated(data.related);
            }
          }
        }
      } catch (err) {
        console.error('Failed to load product from MongoDB:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
    return () => { ignore = true; };
  }, [productId]);

  if (!product && !loading) {
    notFound();
  }

  if (!product) {
    return (
      <div className="bg-ivory min-h-screen py-20 flex items-center justify-center">
        <p className="font-body text-stone">Loading botanical product…</p>
      </div>
    );
  }

  function handleAddToCart() {
    addToCart(product, quantity);
    show(`${product.name} added to cart`, 'success');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-ivory min-h-screen">
      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 text-xs font-body text-stone">
          <li><Link href="/" className="hover:text-forest transition-colors">Home</Link></li>
          <li><ChevronRight className="w-3 h-3" aria-hidden="true" /></li>
          <li><Link href="/products" className="hover:text-forest transition-colors">Shop</Link></li>
          <li><ChevronRight className="w-3 h-3" aria-hidden="true" /></li>
          <li className="text-charcoal font-medium truncate max-w-[180px]">{product.name}</li>
        </ol>
      </nav>

      {/* Product section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Image ── */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream border border-sand">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-forest text-white text-xs font-body font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="absolute top-4 right-4 bg-earth text-white text-xs font-body font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg">
                -{discount}%
              </span>
            )}
          </div>

          {/* ── Info ── */}
          <div className="py-2">
            {/* Category + rating */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-xs font-semibold uppercase tracking-widest text-sage">
                {product.category}
              </span>
              <Rating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
            </div>

            <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-3 leading-tight">
              {product.name}
            </h1>

            <p className="font-body text-sm text-stone mb-6">{product.volume} · {product.shelfLife} shelf life</p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-8">
              <span className="font-body text-3xl font-semibold text-charcoal">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="font-body text-lg text-stone line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-earth/10 text-earth font-body text-sm font-semibold px-2.5 py-1 rounded-lg">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Short description */}
            <p className="font-body text-stone leading-relaxed mb-8">
              {product.shortDescription}
            </p>

            {/* Skin type tags */}
            {product.skinType && (
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="font-body text-xs text-stone mr-1 self-center">Skin type:</span>
                {product.skinType.map((t) => (
                  <span key={t} className="text-xs font-body bg-cream border border-sand text-stone px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4 mb-6">
              {/* Quantity selector */}
              <div className="flex items-center border border-sand rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="w-11 h-12 flex items-center justify-center text-charcoal hover:bg-cream disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-body font-medium text-charcoal" aria-live="polite">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                  aria-label="Increase quantity"
                  className="w-11 h-12 flex items-center justify-center text-charcoal hover:bg-cream transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2.5 font-body font-semibold text-sm py-3.5 rounded-xl transition-all duration-200 active:scale-[0.97]
                  ${added
                    ? 'bg-sage text-white'
                    : 'bg-forest text-white hover:bg-forest-dark'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <ShoppingBag className="w-4 h-4" aria-hidden="true" />
                {!product.inStock ? 'Out of Stock' : added ? 'Added!' : 'Add to Cart'}
              </button>

              {/* Wishlist */}
              <WishlistButton product={product} size="lg" />
            </div>

            {/* Total */}
            <p className="text-sm font-body text-stone mb-8">
              Total: <span className="font-semibold text-charcoal">${(product.price * quantity).toFixed(2)}</span>
            </p>

            {/* Shipping & returns */}
            <div className="border-t border-sand pt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm font-body text-stone">
                <Truck className="w-4 h-4 text-forest shrink-0" aria-hidden="true" />
                <span>Free shipping on orders over $75</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-body text-stone">
                <RotateCcw className="w-4 h-4 text-forest shrink-0" aria-hidden="true" />
                <span>30-day hassle-free returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-16">
          {/* Tab nav */}
          <div className="flex gap-0 border-b border-sand overflow-x-auto" role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3.5 font-body text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 -mb-px
                  ${activeTab === tab
                    ? 'text-forest border-forest'
                    : 'text-stone border-transparent hover:text-charcoal hover:border-sand'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="py-8 max-w-2xl" role="tabpanel" aria-label={activeTab}>
            {activeTab === 'Description' && (
              <p className="font-body text-stone leading-relaxed">{product.description}</p>
            )}

            {activeTab === 'Benefits' && (
              <ul className="space-y-3">
                {product.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-forest/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-forest rounded-full" />
                    </div>
                    <span className="font-body text-stone text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'Ingredients' && (
              <div>
                <p className="font-body text-stone text-sm leading-relaxed">{product.ingredients}</p>
                <p className="mt-4 text-xs font-body text-mist italic">
                  Ingredients listed in INCI (International Nomenclature of Cosmetic Ingredients) order.
                </p>
              </div>
            )}

            {activeTab === 'Usage' && (
              <p className="font-body text-stone leading-relaxed">{product.usage}</p>
            )}
          </div>
        </div>

        {/* ── Related products ── */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-2xl text-charcoal mb-8">You may also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
