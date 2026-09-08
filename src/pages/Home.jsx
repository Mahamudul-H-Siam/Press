import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShieldCheck, 
  TrendingUp, 
  Building2, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileText, 
  SlidersHorizontal, 
  Star,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';
import { CATEGORIES, TENDERS, STATS, TESTIMONIALS, SUPPLIERS } from '../data/mockData';
import TenderCard from '../components/TenderCard';
import VerificationBadge from '../components/VerificationBadge';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredTenders = TENDERS.filter(t => t.featured);

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col - Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 bg-blue-900/80 border border-blue-700/60 px-3.5 py-1.5 rounded-full text-xs font-semibold text-teal-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Digital B2B Procurement & Tender Marketplace</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Where Buyers Post Requirements & <span className="bg-gradient-to-r from-teal-300 to-blue-400 bg-clip-text text-transparent">Verified Suppliers Bid</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Move beyond simple tender notices. Connect directly with verified service providers, compare structured proposals transparently, and manage end-to-end procurement digitally.
              </p>

              {/* Search Bar */}
              <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col sm:flex-row gap-2 border border-gray-100 max-w-xl mx-auto lg:mx-0">
                <div className="flex-1 flex items-center px-3 gap-2">
                  <Search className="w-5 h-5 text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by tender title, category, or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-sm text-gray-800 focus:outline-hidden placeholder-gray-400 py-2"
                  />
                </div>
                <Link
                  to={`/tenders?query=${encodeURIComponent(searchQuery)}`}
                  className="px-6 py-3 bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 shrink-0 shadow-md"
                >
                  Find Tenders
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800 max-w-md mx-auto lg:mx-0 text-left">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white">{STATS.activeTenders}+</div>
                  <div className="text-xs text-slate-400">Active Tenders</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-teal-400">{STATS.verifiedSuppliers}+</div>
                  <div className="text-xs text-slate-400">Verified Suppliers</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-400">{STATS.totalValue}</div>
                  <div className="text-xs text-slate-400">Procured Value</div>
                </div>
              </div>

            </div>

            {/* Right Col - Visual Workflow Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live Procurement Workflow</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">Controlled Transparency</span>
                </div>

                <div className="space-y-3 text-xs">
                  
                  {/* Step 1 */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-600/30 text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                    <div>
                      <div className="font-bold text-white">Buyer Posts Requirement</div>
                      <div className="text-slate-400 text-[11px]">ABC Bank posts "CCTV Installation for 5 Branches"</div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-teal-600/30 text-teal-400 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                    <div>
                      <div className="font-bold text-white">Verified Suppliers Bid</div>
                      <div className="text-slate-400 text-[11px]">Qualified security firms submit technical & price proposals</div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-600/30 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                    <div>
                      <div className="font-bold text-white">Standardized Bid Evaluation</div>
                      <div className="text-slate-400 text-[11px]">Buyer compares price, warranty, delivery time & tech score</div>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="bg-emerald-950/40 p-3 rounded-xl border border-emerald-500/30 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">4</div>
                    <div>
                      <div className="font-bold text-emerald-300">Award & Digital Contract</div>
                      <div className="text-emerald-400/80 text-[11px]">Winning supplier selected based on "Best Qualified Offer"</div>
                    </div>
                  </div>

                </div>

                <div className="pt-2 text-center">
                  <Link to="/buyer/post-tender" className="text-xs font-semibold text-teal-300 hover:text-teal-200 inline-flex items-center gap-1">
                    Post a Requirement Now →
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tender Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Explore Sourcing Categories</h2>
            <p className="text-sm text-gray-600 mt-1">Browse opportunities across key business & industrial sectors</p>
          </div>
          <Link to="/tenders" className="text-sm font-semibold text-blue-700 hover:text-blue-900 mt-2 md:mt-0 flex items-center gap-1">
            View All Categories <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/tenders?category=${cat.id}`}
              className="bg-white p-4 rounded-xl border border-gray-200/80 hover:border-blue-500 hover:shadow-md transition group flex flex-col items-center text-center space-y-2"
            >
              <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">{cat.icon}</span>
              <h3 className="font-semibold text-gray-900 text-xs line-clamp-1 group-hover:text-blue-700">{cat.label}</h3>
              <span className="text-[11px] text-gray-400 font-medium">{cat.sub.length} Sub-categories</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tenders Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Hot Opportunities</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Active Tenders</h2>
          </div>
          <Link to="/tenders" className="text-sm font-semibold text-blue-700 hover:text-blue-900 mt-2 md:mt-0 flex items-center gap-1">
            Browse All Tenders ({TENDERS.length}) <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTenders.map((tender) => (
            <TenderCard key={tender.id} tender={tender} />
          ))}
        </div>
      </section>

      {/* Positioning & Differentiation Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-900 rounded-3xl p-8 lg:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Beyond Tender Notification Services
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Not Just Tender Notices — An End-to-End Procurement Relationship Platform
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                Traditional platforms only notify you where tenders are. <strong>ProcureHub</strong> enables buyers and verified suppliers to interact, submit structured bids, evaluate offers side-by-side, shortlist providers, and track completion digitally.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Verified Business Licenses & Trade Info</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Standardized Proposal Formats</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Controlled Transparency & Privacy</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Best Qualified Offer Win Criteria</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-4">
              <h3 className="font-bold text-lg text-white">Join as Buyer or Supplier</h3>
              <p className="text-xs text-slate-200">Start discovering high-value opportunities or post your procurement requirements in minutes.</p>
              <div className="flex flex-col gap-2">
                <Link
                  to="/register?role=buyer"
                  className="w-full py-2.5 bg-white text-blue-900 font-bold rounded-xl text-xs hover:bg-slate-100 transition shadow-md"
                >
                  Register as Buyer (Post Requirement)
                </Link>
                <Link
                  to="/register?role=supplier"
                  className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl text-xs transition shadow-md"
                >
                  Register as Supplier (Submit Bids)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Suppliers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-gray-900">Top Verified Business Suppliers</h2>
          <p className="text-sm text-gray-600 mt-1">Pre-screened and trade-verified companies ready to fulfill enterprise demands</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SUPPLIERS.map((s) => (
            <div key={s.id} className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs hover:shadow-md transition text-center space-y-2">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 font-bold mx-auto flex items-center justify-center text-base border border-blue-200">
                {s.logo}
              </div>
              <h3 className="font-bold text-gray-900 text-sm">{s.name}</h3>
              <div className="flex justify-center">
                {s.verified ? <VerificationBadge size="xs" text="Verified Supplier" /> : <span className="text-[10px] text-gray-400">Basic Account</span>}
              </div>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-600 pt-1">
                <span className="flex items-center text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                  {s.rating}
                </span>
                <span>• {s.completedProjects} Projects</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Trusted by Corporate Leaders</h2>
            <p className="text-sm text-gray-600 mt-1">Hear how buyers and suppliers save time and discover new revenue</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-gray-700 italic leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div className="w-9 h-9 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                    {t.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-xs">{t.name}</h4>
                    <p className="text-[11px] text-gray-500">{t.role}, {t.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
