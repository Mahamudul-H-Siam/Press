import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Target, 
  TrendingUp, 
  Users, 
  ArrowRight,
  Layers,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-teal-200">
          The Marketplace Concept
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
          A Digital B2B Tender & Service Procurement Marketplace
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          ProcureHub connects organizations needing products, services, construction, IT, and maintenance with verified service providers capable of completing those requirements.
        </p>
      </div>

      {/* The Problem & Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Buyer Problem */}
        <div className="bg-rose-50/60 rounded-2xl p-6 sm:p-8 border border-rose-100 space-y-4">
          <h3 className="text-lg font-bold text-rose-950 flex items-center gap-2">
            🏢 The Buyer Sourcing Dilemma
          </h3>
          <p className="text-xs text-rose-900 leading-relaxed">
            When a company needs 500 office chairs, CCTV installation, or software development, they traditionally waste days searching Google, sending separate emails/WhatsApp messages, receiving fragmented quotation formats, manually parsing Excel sheets, and negotiating blindly.
          </p>
          <div className="text-xs font-semibold text-rose-800 bg-rose-100/80 p-3 rounded-xl">
            "I need a reliable company to complete this work. Where do I find them?"
          </div>
        </div>

        {/* Supplier Problem */}
        <div className="bg-blue-50/60 rounded-2xl p-6 sm:p-8 border border-blue-100 space-y-4">
          <h3 className="text-lg font-bold text-blue-950 flex items-center gap-2">
            ⚡ The Supplier Sourcing Dilemma
          </h3>
          <p className="text-xs text-blue-900 leading-relaxed">
            Thousands of highly capable service providers and contractors have the capacity, workforce, and expertise to complete enterprise work, but rely heavily on personal networks and miss high-value private tenders.
          </p>
          <div className="text-xs font-semibold text-blue-800 bg-blue-100/80 p-3 rounded-xl">
            "I have the capability to do this work. Where do I find customers?"
          </div>
        </div>

      </div>

      {/* Differentiation Table */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-xl font-bold text-gray-900">How ProcureHub is Different</h2>
          <p className="text-xs text-gray-600 mt-1">
            Unlike simple tender notification aggregators or official government e-GP portals, ProcureHub focuses on private-sector B2B end-to-end procurement.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-100 font-bold uppercase text-[11px]">
              <tr>
                <th className="p-3">Feature / Capability</th>
                <th className="p-3">Notification Portals (e.g. BDTender)</th>
                <th className="p-3 bg-blue-50 text-blue-900">ProcureHub Marketplace</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="p-3 font-semibold">Tender Discovery</td>
                <td className="p-3">✅ Yes</td>
                <td className="p-3 bg-blue-50/40 font-semibold text-blue-900">✅ Core Feature</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Direct Buyer Requirement Posting</td>
                <td className="p-3">Limited / Secondary</td>
                <td className="p-3 bg-blue-50/40 font-semibold text-blue-900">✅ Core Feature</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Direct Online Bidding</td>
                <td className="p-3">❌ No</td>
                <td className="p-3 bg-blue-50/40 font-semibold text-blue-900">✅ Core Feature</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Standardized Bid Evaluation</td>
                <td className="p-3">❌ No</td>
                <td className="p-3 bg-blue-50/40 font-semibold text-blue-900">✅ Core Feature</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">Supplier Trade Verification</td>
                <td className="p-3">Limited</td>
                <td className="p-3 bg-blue-50/40 font-semibold text-blue-900">✅ Trade License & VAT Verified</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">AI Eligibility & Matching</td>
                <td className="p-3">❌ No</td>
                <td className="p-3 bg-blue-50/40 font-semibold text-blue-900">✅ Integrated AI Assistant</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* The Marketplace Flywheel */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold">The Marketplace Flywheel</h2>
          <p className="text-xs text-slate-400">Network effects driving long-term buyer & supplier value</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
            <span className="text-xl">🏢</span>
            <div className="font-bold text-white">More Buyers</div>
            <div className="text-[11px] text-slate-400">Publish high-value requirements</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
            <span className="text-xl">⚡</span>
            <div className="font-bold text-teal-300">More Suppliers</div>
            <div className="text-[11px] text-slate-400">Compete & submit bids</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
            <span className="text-xl">📊</span>
            <div className="font-bold text-amber-300">Better Choices</div>
            <div className="text-[11px] text-slate-400">Standardized comparisons</div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 space-y-2">
            <span className="text-xl">🤝</span>
            <div className="font-bold text-emerald-300">Marketplace Trust</div>
            <div className="text-[11px] text-slate-400">Verified reputation & ratings</div>
          </div>
        </div>
      </div>

    </div>
  );
}
