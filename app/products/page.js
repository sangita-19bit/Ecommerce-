'use client';

import { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, ChevronDown, X, Search, Loader2 } from 'lucide-react';
import { products as fallbackProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import EmptyState from '../components/EmptyState';

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating',     label: 'Highest Rated' },
  { value: 'name',       label: 'Name A–Z' },
];

const BADGES = ['All', 'Best Seller', 'New'];

export default function ShopPage() {
  const [productList, setProductList] = useState(fallbackProducts);
  const [loading, setLoading] = useState(false);
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('All');
  const [badge,    setBadge]    = useState('All');
  const [sort,     setSort]     = useState('featured');
  const [maxPrice, setMaxPrice] = useState(100);
  const [minRating, setMinRating] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Fetch products from MongoDB API
  useEffect(() => {
    let ignore = false;
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (!ignore && data.products && data.products.length > 0) {
            setProductList(data.products);
          }
        }
      } catch (err) {
        console.error('Failed to fetch products from MongoDB:', err);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadProducts();
    return () => { ignore = true; };
  }, []);

  const categories = useMemo(() => {
    return ['All', ...new Set(productList.map((p) => p.category))];
  }, [productList]);

  const filtered = useMemo(() => {
    let list = [...productList];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Category
    if (category !== 'All') list = list.filter((p) => p.category === category);

    // Badge
    if (badge !== 'All') {
      if (badge === 'Best Seller') list = list.filter((p) => p.badge === 'Best Seller');
      if (badge === 'New')         list = list.filter((p) => p.badge === 'New');
    }

    // Price
    list = list.filter((p) => p.price <= maxPrice);

    // Rating
    if (minRating > 0) list = list.filter((p) => p.rating >= minRating);

    // Sort
    switch (sort) {
      case 'price-asc':  list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list.sort((a, b) => b.rating - a.rating); break;
      case 'name':       list.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }

    return list;
  }, [productList, search, category, badge, maxPrice, minRating, sort]);

  function clearFilters() {
    setSearch('');
    setCategory('All');
    setBadge('All');
    setSort('featured');
    setMaxPrice(100);
    setMinRating(0);
  }

  const hasActiveFilters =
    search || category !== 'All' || badge !== 'All' || maxPrice < 100 || minRating > 0;

  return (
    <div className="bg-ivory min-h-screen">
      {/* Page header */}
      <section className="bg-cream border-b border-sand py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-widest text-sage mb-3">
            Swan Botanicals
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
            Our Collection
          </h1>
          <p className="font-body text-stone max-w-xl mx-auto">
            Handcrafted botanical formulas for every step of your ritual.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* ── Toolbar ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-mist" aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products…"
              className="w-full pl-10 pr-4 py-2.5 text-sm font-body bg-white border border-sand rounded-lg text-charcoal placeholder:text-mist focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest/40"
              aria-label="Search products"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-charcoal"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center justify-center gap-2 sm:hidden border border-sand bg-white text-charcoal text-sm font-body font-medium px-4 py-2.5 rounded-lg hover:bg-cream transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActiveFilters && <span className="w-2 h-2 bg-forest rounded-full" />}
          </button>

          {/* Sort */}
          <div className="relative shrink-0">
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone pointer-events-none" aria-hidden="true" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none w-full sm:w-48 pl-4 pr-10 py-2.5 text-sm font-body bg-white border border-sand rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-forest/20 cursor-pointer"
              aria-label="Sort products"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* ── Sidebar filters ── */}
          <aside
            className={`${filtersOpen ? 'block' : 'hidden'} sm:block w-full sm:w-56 shrink-0 space-y-7`}
            aria-label="Product filters"
          >
            {/* Clear */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs font-body font-semibold text-forest hover:underline flex items-center gap-1"
              >
                <X className="w-3 h-3" /> Clear all filters
              </button>
            )}

            {/* Category */}
            <fieldset>
              <legend className="font-body text-xs font-semibold uppercase tracking-widest text-stone mb-3">
                Category
              </legend>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={category === cat}
                      onChange={() => setCategory(cat)}
                      className="accent-forest w-3.5 h-3.5"
                    />
                    <span className={`font-body text-sm transition-colors ${category === cat ? 'text-forest font-medium' : 'text-stone group-hover:text-charcoal'}`}>
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Badge */}
            <fieldset>
              <legend className="font-body text-xs font-semibold uppercase tracking-widest text-stone mb-3">
                Collection
              </legend>
              <div className="space-y-2">
                {BADGES.map((b) => (
                  <label key={b} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="badge"
                      checked={badge === b}
                      onChange={() => setBadge(b)}
                      className="accent-forest w-3.5 h-3.5"
                    />
                    <span className={`font-body text-sm transition-colors ${badge === b ? 'text-forest font-medium' : 'text-stone group-hover:text-charcoal'}`}>
                      {b}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Price range */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-stone mb-3">
                Max Price: <span className="text-charcoal normal-case tracking-normal font-semibold">${maxPrice}</span>
              </p>
              <input
                type="range"
                min={20}
                max={100}
                step={5}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-forest"
                aria-label={`Maximum price: $${maxPrice}`}
              />
              <div className="flex justify-between mt-1 text-xs font-body text-stone">
                <span>$20</span><span>$100</span>
              </div>
            </div>

            {/* Min rating */}
            <fieldset>
              <legend className="font-body text-xs font-semibold uppercase tracking-widest text-stone mb-3">
                Min Rating
              </legend>
              <div className="space-y-2">
                {[0, 4, 4.5, 4.8].map((r) => (
                  <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="minRating"
                      checked={minRating === r}
                      onChange={() => setMinRating(r)}
                      className="accent-forest w-3.5 h-3.5"
                    />
                    <span className={`font-body text-sm transition-colors ${minRating === r ? 'text-forest font-medium' : 'text-stone group-hover:text-charcoal'}`}>
                      {r === 0 ? 'Any rating' : `${r}+ stars`}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </aside>

          {/* ── Product grid ── */}
          <div className="flex-1 min-w-0">
            <p className="font-body text-sm text-stone mb-6">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
              {search && <> for &ldquo;{search}&rdquo;</>}
            </p>

            {filtered.length === 0 ? (
              <EmptyState
                icon={<Search className="w-8 h-8" />}
                title="No products found"
                description="Try adjusting your filters or search query."
                action={{ label: 'Clear filters', onClick: clearFilters }}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
                {filtered.map((product) => (
                  <div key={product.id} className="animate-fade-in-up">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
