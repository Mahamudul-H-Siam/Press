import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Send, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  Award, 
  Building2, 
  FileText, 
  ShieldCheck,
  Star,
  Plus
} from 'lucide-react';
import { TENDERS, MOCK_BIDS, SUPPLIERS } from '../../data/mockData';
import VerificationBadge from '../../components/VerificationBadge';
import TenderCard from '../../components/TenderCard';
import toast from 'react-hot-toast';

export default function SupplierDashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'mybids' | 'recommended' | 'profile'
  const supplier = SUPPLIERS[0]; // TechVision Solutions

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Supplier Top Header */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-blue-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 text-teal-300 font-extrabold flex items-center justify-center text-lg border border-white/20">
            {supplier.logo}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold">{supplier.name}</h1>
              <VerificationBadge size="xs" text="Verified Supplier" />
            </div>
            <p className="text-xs text-teal-100 mt-0.5">
              Category: <strong className="text-white capitalize">{supplier.category}</strong> • Rating: <strong>{supplier.rating}/5.0</strong> ({supplier.completedProjects} Projects Completed)
            </p>
          </div>
        </div>

        <Link
          to="/tenders"
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 shrink-0 transition"
        >
          Explore All Open Opportunities →
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 text-xs font-semibold space-x-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition border-b-2 ${activeTab === 'overview' ? 'border-teal-600 text-teal-700 font-bold' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('mybids')}
          className={`pb-3 transition border-b-2 ${activeTab === 'mybids' ? 'border-teal-600 text-teal-700 font-bold' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          My Submitted Bids ({MOCK_BIDS.length})
        </button>
        <button
          onClick={() => setActiveTab('recommended')}
          className={`pb-3 transition border-b-2 ${activeTab === 'recommended' ? 'border-teal-600 text-teal-700 font-bold' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          AI Recommended Tenders
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 transition border-b-2 ${activeTab === 'profile' ? 'border-teal-600 text-teal-700 font-bold' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          Company Profile & Verified Reputation
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Bids Submitted</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">12 Proposals</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Shortlisted Proposals</span>
              <div className="text-2xl font-bold text-purple-700 mt-1">3 Shortlisted</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Won Contracts</span>
              <div className="text-2xl font-bold text-emerald-600 mt-1">47 Projects</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Platform Trust Rating</span>
              <div className="text-2xl font-bold text-amber-500 mt-1">4.8 / 5.0</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                AI Smart Matched Opportunities for {supplier.name}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TENDERS.slice(0, 2).map(t => (
                <TenderCard key={t.id} tender={t} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: My Submitted Bids */}
      {activeTab === 'mybids' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-gray-100 font-bold uppercase text-[11px]">
              <tr>
                <th className="p-3">Tender Title</th>
                <th className="p-3">Quoted Price</th>
                <th className="p-3">Delivery Time</th>
                <th className="p-3">Warranty</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_BIDS.map(b => {
                const t = TENDERS.find(tend => tend.id === b.tenderId) || TENDERS[0];
                return (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-gray-900">{t.title}</td>
                    <td className="p-3 font-bold text-blue-900">{b.price}</td>
                    <td className="p-3">{b.delivery}</td>
                    <td className="p-3">{b.warranty}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        b.status === 'shortlisted' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <Link to={`/tenders/${t.id}`} className="text-blue-700 font-semibold hover:underline">
                        View Tender
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Recommended Tenders */}
      {activeTab === 'recommended' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TENDERS.map(t => <TenderCard key={t.id} tender={t} />)}
        </div>
      )}

      {/* Tab 4: Company Profile & Verified Reputation */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-6 max-w-3xl">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{supplier.name}</h2>
              <p className="text-xs text-gray-500 mt-1">{supplier.description}</p>
            </div>
            <VerificationBadge text="Trade License & VAT Verified" />
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div>
              <span className="text-gray-400 block font-medium">Years Active</span>
              <strong className="text-gray-900 text-sm">{supplier.yearsActive} Years</strong>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Location</span>
              <strong className="text-gray-900 text-sm">{supplier.location}</strong>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Trade License Reg</span>
              <strong className="text-emerald-700 text-sm">TRD-2026-8812 (Verified)</strong>
            </div>
            <div>
              <span className="text-gray-400 block font-medium">Completed Projects</span>
              <strong className="text-blue-900 text-sm">{supplier.completedProjects} Completed</strong>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-2">Verified Completed Project Reputation</h4>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-800">CCTV & Network Integration — Bank Asia</div>
                  <div className="text-[11px] text-gray-500">Completed in 2025 • Rating: 5.0/5.0 ⭐</div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Verified Completion
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-800">Software Portal Development — Eastern Logistics</div>
                  <div className="text-[11px] text-gray-500">Completed in 2024 • Rating: 4.8/5.0 ⭐</div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Verified Completion
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
