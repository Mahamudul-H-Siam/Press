import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, MapPin, Tag, RefreshCw } from 'lucide-react';
import { CATEGORIES, LOCATIONS, TENDERS } from '../data/mockData';
import TenderCard from '../components/TenderCard';

export default function Tenders() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('query') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [onlyVerified, setOnlyVerified] = useState(false);

  const filteredTenders = useMemo(() => {
    return TENDERS.filter((tender) => {
      // Category filter
      if (selectedCategory !== 'all' && tender.category !== selectedCategory) {
        return false;
      }
      // Location filter
      if (selectedLocation !== 'all' && tender.location !== selectedLocation) {
        return false;
      }
      // Verified buyer filter
      if (onlyVerified && !tender.buyer.verified) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = tender.title.toLowerCase().includes(q);
        const matchesBuyer = tender.buyer.name.toLowerCase().includes(q);
        const matchesTags = tender.tags.some(t => t.toLowerCase().includes(q));
        const matchesDesc = tender.description.toLowerCase().includes(q);
        return matchesTitle || matchesBuyer || matchesTags || matchesDesc;
      }
      return true;
    });
  }, [selectedCategory, selectedLocation, searchQuery, onlyVerified]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSearchQuery('');
    setOnlyVerified(false);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-800 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Browse Active B2B Tenders</h1>
        <p className="text-sm text-blue-100 max-w-2xl">
          Discover verified business requirements, technical specifications, and submit structured proposals directly to buyers.
        </p>

        {/* Search bar inside header */}
        <div className="mt-6 bg-white p-2 rounded-xl flex items-center gap-2 max-w-2xl border border-gray-100 shadow-md">
          <Search className="w-5 h-5 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Search tenders by keyword, requirement, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-sm text-gray-800 focus:outline-hidden py-1.5"
          />
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Tenders List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="font-bold text-gray-900 text-sm flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-700" />
                Filter Opportunities
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 focus:outline-hidden focus:border-blue-500"
              >
                <option value="all">All Locations</option>
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Verified Buyers Only */}
            <div className="pt-2 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-xs font-semibold text-gray-700">Verified Buyers Only</span>
              </label>
            </div>

          </div>
        </div>

        {/* Right Tenders List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-500">
              Showing <strong className="text-gray-900">{filteredTenders.length}</strong> available tenders
            </span>
          </div>

          {filteredTenders.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-gray-200 text-center space-y-3">
              <Search className="w-10 h-10 text-gray-300 mx-auto" />
              <h3 className="font-bold text-gray-800 text-base">No Tenders Found</h3>
              <p className="text-xs text-gray-500">Try adjusting your category or location filters.</p>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-blue-700 text-white font-semibold text-xs rounded-xl"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTenders.map(tender => (
                <TenderCard key={tender.id} tender={tender} />
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
