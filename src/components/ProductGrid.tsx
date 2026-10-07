import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../types';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { playAnimusSound } from '../utils/audio';

export const ProductGrid: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'All Artifacts' },
    { key: 'blades', label: 'Hidden Blades & Steel' },
    { key: 'relics', label: 'Isu Pieces of Eden' },
    { key: 'apparel', label: 'Cloaks & Cowls' },
    { key: 'armor', label: 'Bracers & Gauntlets' }
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.era.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceBDT - b.priceBDT;
        if (sortBy === 'price-desc') return b.priceBDT - a.priceBDT;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-800">
        <div>
          <div className="text-xs font-mono tracking-widest text-red-500 uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            The Vault Collection
          </div>
          <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-stone-100 uppercase">
            Brotherhood Armory & Reliquary
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-stone-400">
            Precision Damascus mechanisms, ceremonial cowls, and First Civilization fragments.
          </p>
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blade, era, relic..."
              className="w-48 sm:w-64 pl-8 pr-3 py-1.5 text-xs rounded bg-stone-900 border border-stone-800 text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-600 transition-colors"
            />
            <Search className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-stone-900 border border-stone-800 text-stone-200 rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="rating">Highest Synchronized</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Category Segmented Tabs (Functional Buttons) */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                playAnimusSound('click');
                setSelectedCategory(cat.key);
              }}
              className={`px-3.5 py-2 text-xs font-medium rounded whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-red-800 text-stone-100 shadow-sm border border-red-600/80 font-semibold'
                  : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center py-16 border border-dashed border-stone-800 rounded-lg max-w-md mx-auto">
          <Sparkles className="w-8 h-8 text-stone-600 mx-auto mb-3" />
          <h3 className="font-display text-sm font-semibold text-stone-300 uppercase">
            No Relics Found in Vault
          </h3>
          <p className="mt-1 text-xs text-stone-500">
            No armament matches "{searchQuery}". Try searching for "blade", "relic", or "cloak".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="mt-4 px-3 py-1.5 text-xs text-amber-400 hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
};
