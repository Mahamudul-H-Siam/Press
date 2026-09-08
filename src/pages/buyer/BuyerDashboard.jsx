import React, { useState } from 'react';
import { 
  PlusCircle, 
  FileText, 
  CheckCircle, 
  Users, 
  Eye, 
  Plus, 
  Trash2, 
  Sparkles,
  BarChart2,
  Award
} from 'lucide-react';
import { TENDERS, MOCK_BIDS, CATEGORIES, LOCATIONS } from '../../data/mockData';
import BidComparisonTable from '../../components/BidComparisonTable';
import VerificationBadge from '../../components/VerificationBadge';
import toast from 'react-hot-toast';

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'post' | 'tenders' | 'evaluation'
  const [bids, setBids] = useState(MOCK_BIDS);
  const [selectedTenderId, setSelectedTenderId] = useState('T001');

  // Post Tender Multi-step Form state
  const [postData, setPostData] = useState({
    title: '',
    category: 'security',
    budget: '',
    location: 'Dhaka',
    deadline: '',
    description: '',
    requirements: [''],
    eligibility: '',
  });

  const handleAddReq = () => {
    setPostData({ ...postData, requirements: [...postData.requirements, ''] });
  };

  const handleReqChange = (idx, val) => {
    const updated = [...postData.requirements];
    updated[idx] = val;
    setPostData({ ...postData, requirements: updated });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postData.title || !postData.budget) {
      toast.error('Please complete required fields');
      return;
    }
    toast.success('Requirement / Tender published successfully!');
    setActiveTab('tenders');
  };

  const handleShortlist = (bidId) => {
    setBids(bids.map(b => b.id === bidId ? { ...b, status: 'shortlisted' } : b));
    toast.success('Supplier proposal shortlisted!');
  };

  const handleSelectWinner = (bid) => {
    setBids(bids.map(b => b.id === bid.id ? { ...b, status: 'awarded' } : b));
    toast.success(`Winner selected: ${bid.supplier.name} awarded the contract!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold">ABC Bank Procurement Portal</h1>
            <VerificationBadge size="xs" text="Verified Corporate" />
          </div>
          <p className="text-xs text-blue-200 mt-1">Manage active requirements, compare standardized proposals, and select winning providers.</p>
        </div>

        <button
          onClick={() => setActiveTab('post')}
          className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 shrink-0 transition"
        >
          <PlusCircle className="w-4 h-4" /> Post New Requirement
        </button>
      </div>

      {/* Nav Tabs */}
      <div className="flex border-b border-gray-200 text-xs font-semibold space-x-6">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 transition border-b-2 ${activeTab === 'overview' ? 'border-blue-700 text-blue-700 font-bold' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          Overview & Metrics
        </button>
        <button
          onClick={() => setActiveTab('tenders')}
          className={`pb-3 transition border-b-2 ${activeTab === 'tenders' ? 'border-blue-700 text-blue-700 font-bold' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          My Posted Tenders ({TENDERS.length})
        </button>
        <button
          onClick={() => setActiveTab('evaluation')}
          className={`pb-3 transition border-b-2 ${activeTab === 'evaluation' ? 'border-blue-700 text-blue-700 font-bold' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          Standardized Bid Evaluation Matrix
        </button>
        <button
          onClick={() => setActiveTab('post')}
          className={`pb-3 transition border-b-2 ${activeTab === 'post' ? 'border-blue-700 text-blue-700 font-bold' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
        >
          Post New Requirement
        </button>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Active Requirements</span>
              <div className="text-2xl font-bold text-gray-900 mt-1">4 Tenders</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Bids Received</span>
              <div className="text-2xl font-bold text-blue-700 mt-1">32 Proposals</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Under Evaluation</span>
              <div className="text-2xl font-bold text-amber-600 mt-1">2 Tenders</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-gray-200/80 shadow-xs">
              <span className="text-xs text-gray-500 font-medium">Awarded Contracts</span>
              <div className="text-2xl font-bold text-teal-600 mt-1">18 Projects</div>
            </div>
          </div>

          {/* Quick evaluation matrix preview */}
          <div className="space-y-3">
            <h3 className="font-bold text-gray-900 text-sm">Recent Submitted Bids for "CCTV Installation for 5 Branches"</h3>
            <BidComparisonTable bids={bids} onSelectWinner={handleSelectWinner} onShortlist={handleShortlist} />
          </div>
        </div>
      )}

      {/* Tab 2: My Posted Tenders */}
      {activeTab === 'tenders' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-100 font-bold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Tender Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Budget</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Bids</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {TENDERS.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-3 font-bold text-gray-900">{t.title}</td>
                    <td className="p-3">{t.categoryLabel}</td>
                    <td className="p-3 font-semibold text-blue-900">{t.budget}</td>
                    <td className="p-3">{t.deadline}</td>
                    <td className="p-3 font-bold text-teal-700">{t.bidsCount} Bids</td>
                    <td className="p-3">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        {t.status}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => setActiveTab('evaluation')}
                        className="px-3 py-1 bg-blue-50 text-blue-700 font-semibold rounded-md hover:bg-blue-100"
                      >
                        Evaluate Bids
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Standardized Bid Evaluation Matrix */}
      {activeTab === 'evaluation' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center justify-between">
            <span className="text-xs font-bold text-gray-700">Select Active Requirement:</span>
            <select
              value={selectedTenderId}
              onChange={(e) => setSelectedTenderId(e.target.value)}
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-gray-800"
            >
              {TENDERS.map(t => (
                <option key={t.id} value={t.id}>{t.title} ({t.bidsCount} Bids)</option>
              ))}
            </select>
          </div>

          <BidComparisonTable bids={bids} onSelectWinner={handleSelectWinner} onShortlist={handleShortlist} />
        </div>
      )}

      {/* Tab 4: Post New Requirement Form */}
      {activeTab === 'post' && (
        <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs max-w-3xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Publish New Procurement Requirement</h2>
            <p className="text-xs text-gray-500">Provide clear specifications to receive accurate competitive bids from verified service providers.</p>
          </div>

          <form onSubmit={handlePostSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Requirement / Tender Title</label>
              <input
                type="text"
                placeholder="e.g. Office Renovation & Electrical Wiring for Branch"
                value={postData.title}
                onChange={(e) => setPostData({ ...postData, title: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-hidden focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Category</label>
                <select
                  value={postData.category}
                  onChange={(e) => setPostData({ ...postData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800"
                >
                  {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Estimated Budget (৳)</label>
                <input
                  type="text"
                  placeholder="e.g. ৳5,00,000 – ৳8,00,000"
                  value={postData.budget}
                  onChange={(e) => setPostData({ ...postData, budget: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Location</label>
                <select
                  value={postData.location}
                  onChange={(e) => setPostData({ ...postData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800"
                >
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Submission Deadline Date</label>
              <input
                type="date"
                value={postData.deadline}
                onChange={(e) => setPostData({ ...postData, deadline: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Full Work Scope & Specifications</label>
              <textarea
                rows={4}
                placeholder="Describe project goals, deliverables, timeline expectations..."
                value={postData.description}
                onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-800"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-gray-700">Technical Requirements List</label>
                <button type="button" onClick={handleAddReq} className="text-blue-700 font-bold flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Item
                </button>
              </div>
              {postData.requirements.map((req, idx) => (
                <input
                  key={idx}
                  type="text"
                  placeholder={`Requirement #${idx + 1}`}
                  value={req}
                  onChange={(e) => handleReqChange(idx, e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 mb-2"
                />
              ))}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white font-bold rounded-xl shadow-md"
              >
                Publish Requirement to Marketplace
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
