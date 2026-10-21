'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Leaf, Droplets, Shield } from 'lucide-react';
import { products as fallbackProducts } from './data/products';
import ProductCard from './components/ProductCard';

// ── Promise pillars ─────────────────────────────────────────────────────────
const promises = [
  {
    icon: <Leaf className="w-6 h-6" aria-hidden="true" />,
    title: 'Pure Ingredients',
    body: 'Every formula starts with whole botanicals — no fillers, no synthetics, no compromise.',
  },
  {
    icon: <Shield className="w-6 h-6" aria-hidden="true" />,
    title: 'Cruelty-Free',
    body: 'Never tested on animals. Certified by Leaping Bunny and committed to ethical practices.',
  },
  {
    icon: <Droplets className="w-6 h-6" aria-hidden="true" />,
    title: 'Eco-Conscious',
    body: 'Sustainably sourced ingredients, recyclable packaging, and a net-zero shipping commitment.',
  },
];

// ── Category cards ──────────────────────────────────────────────────────────
const categories = [
  {
    name: 'Facial Oils',
    description: 'Nourish and restore natural radiance',
    image: '/images/products/chamomile-oil.jpg',
    href: '/products?category=skincare',
  },
  {
    name: 'Creams & Serums',
    description: 'Targeted treatments for every skin need',
    image: '/images/products/lavender-cream.png',
    href: '/products?category=skincare',
  },
  {
    name: 'Mists & Cleansers',
    description: 'The foundation of a botanical ritual',
    image: '/images/products/green-tea-cleanser.jpg',
    href: '/products?category=skincare',
  },
];

export default function Home() {
  const [productList, setProductList] = useState(fallbackProducts);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data?.products?.length) {
          setProductList(data.products);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="bg-ivory">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden" aria-label="Hero">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt="Botanical skincare flat lay with natural ingredients"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Gradient overlay — only at bottom and left edge */}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory/40 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-xl animate-fade-in-up">
            <span className="inline-block font-body text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-6">
              Botanical Skincare
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] mb-6">
              Pure Ingredients.<br />
              <em className="not-italic text-sage-light">Thoughtful Care.</em>
            </h1>
            <p className="font-body text-lg text-white/80 leading-relaxed mb-10 max-w-md">
              Handcrafted botanical formulas born from nature&rsquo;s finest plants.
              Skin care that works the way nature intended.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2.5 bg-white text-forest font-body font-semibold text-sm px-7 py-4 rounded-xl hover:bg-cream active:scale-[0.97] transition-all duration-200 shadow-lg"
              >
                Shop the Collection
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 border border-white/40 text-white font-body font-medium text-sm px-7 py-4 rounded-xl hover:bg-white/10 active:scale-[0.97] transition-all duration-200"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Promise bar ──────────────────────────────────────────────────── */}
      <section className="bg-cream border-y border-sand" aria-label="Our promise">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 stagger-children">
            {promises.map((item) => (
              <div key={item.title} className="flex items-start gap-5 animate-fade-in-up">
                <div className="w-12 h-12 bg-white border border-sand rounded-xl flex items-center justify-center shrink-0 text-forest shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-body font-semibold text-charcoal mb-1">{item.title}</h3>
                  <p className="font-body text-sm text-stone leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Shop by Category ─────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Shop by category">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-2">Explore</p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">Shop by Category</h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:flex items-center gap-1.5 font-body text-sm font-medium text-forest hover:underline"
          >
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-cream"
              aria-label={`Shop ${cat.name}`}
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-display text-xl text-white font-medium mb-1">{cat.name}</h3>
                <p className="font-body text-sm text-white/75">{cat.description}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-body font-semibold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">
                  Shop now <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/products" className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-forest hover:underline">
            View all products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section className="py-20 bg-cream border-t border-sand" aria-label="Featured products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-2">Bestsellers</p>
              <h2 className="font-display text-3xl md:text-4xl text-charcoal">Our Collection</h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:flex items-center gap-1.5 font-body text-sm font-medium text-forest hover:underline"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
            {productList.map((product) => (
              <div key={product.id || product._id} className="animate-fade-in-up">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link href="/products" className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-forest hover:underline">
              View all products <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand story ───────────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Brand story">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-cream order-2 lg:order-1">
            <Image
              src="/images/hero1.jpg"
              alt="Natural botanical ingredients arranged on a wooden surface"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {/* Floating accent card */}
            <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-[180px]">
              <p className="font-display text-sm text-forest font-medium leading-snug">
                Founded on pure botanical wisdom
              </p>
              <p className="font-body text-xs text-stone mt-1">est. 2018</p>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2 animate-fade-in-up">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-4">Our Philosophy</p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6 leading-tight">
              Nature holds the key to radiant, healthy skin
            </h2>
            <p className="font-body text-stone leading-relaxed mb-5">
              Swan Botanicals was born from a deep conviction that the best skincare begins with the
              land. Every product is crafted with whole botanicals — flowers, roots, and oils selected
              for their proven efficacy, not their marketing appeal.
            </p>
            <p className="font-body text-stone leading-relaxed mb-8">
              We partner with sustainable farms and apply careful formulation science to ensure that
              every ingredient earns its place. No greenwashing. No unnecessary additives.
              Just botanicals that genuinely work.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-10">
              {[
                { figure: '4+', label: 'Curated formulas' },
                { figure: '100%', label: 'Botanical ingredients' },
                { figure: '0',  label: 'Synthetic fragrances' },
                { figure: '2018', label: 'Year founded' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-semibold text-forest">{stat.figure}</p>
                  <p className="font-body text-xs text-stone mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-forest text-forest font-body font-medium text-sm px-6 py-3.5 rounded-xl hover:bg-forest hover:text-white active:scale-[0.97] transition-all duration-200"
            >
              Learn our story
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-cream border-t border-sand" aria-label="Customer testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-3">Reviews</p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">What Our Customers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {[
              {
                quote: 'The Chamomile Facial Oil has completely transformed my skin. It absorbs beautifully and my redness has visibly reduced after just two weeks.',
                author: 'Priya M.',
                location: 'New York',
                product: 'Chamomile Facial Oil',
                rating: 5,
              },
              {
                quote: 'I was skeptical about botanical skincare but the Lavender Night Cream converted me. My skin is so much more hydrated and calm in the morning.',
                author: 'James T.',
                location: 'London',
                product: 'Lavender Night Cream',
                rating: 5,
              },
              {
                quote: 'The Green Tea Cleanser is the gentlest cleanser I\'ve ever used. My skin barrier feels stronger and it doesn\'t leave that tight, stripped feeling.',
                author: 'Ananya R.',
                location: 'Mumbai',
                product: 'Green Tea Cleanser',
                rating: 5,
              },
            ].map((t) => (
              <div
                key={t.author}
                className="animate-fade-in-up bg-white border border-sand rounded-2xl p-7"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-earth fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="font-body text-sm text-stone leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-body font-semibold text-sm text-charcoal">{t.author}</p>
                  <p className="font-body text-xs text-stone">{t.location} · {t.product}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Newsletter">
        <div className="bg-forest rounded-3xl px-8 py-16 md:px-16 text-center max-w-3xl mx-auto">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage-light mb-4">Newsletter</p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Join the botanical journey
          </h2>
          <p className="font-body text-white/70 mb-10 max-w-md mx-auto leading-relaxed">
            Receive seasonal rituals, early access to new formulas, and exclusive subscriber offers.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            <label htmlFor="hero-email" className="sr-only">Email address</label>
            <input
              id="hero-email"
              type="email"
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3.5 rounded-xl text-sm font-body bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-white text-forest font-body font-semibold text-sm rounded-xl hover:bg-cream active:scale-[0.97] transition-all duration-200 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-xs font-body text-white/40">No spam. Unsubscribe anytime.</p>
        </div>
      </section>

    </div>
  );
}
