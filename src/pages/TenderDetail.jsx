import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Clock, 
  FileText, 
  Send, 
  Sparkles, 
  CheckCircle, 
  MessageSquare, 
  ShieldCheck, 
  HelpCircle,
  Upload,
  ArrowLeft
} from 'lucide-react';
import { TENDERS, MOCK_BIDS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import VerificationBadge from '../components/VerificationBadge';
import AiAssistantModal from '../components/AiAssistantModal';
import toast from 'react-hot-toast';

export default function TenderDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  
  const tender = TENDERS.find(t => t.id === id) || TENDERS[0];
  
  const [showAiModal, setShowAiModal] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  
  // Q&A state
  const [qnaList, setQnaList] = useState([
    { id: 1, question: 'Is installation included in the quoted financial proposal?', answer: 'Yes, installation and 2-year maintenance must be included in the total price.', askedBy: 'TechVision BD', date: '2026-09-02' },
    { id: 2, question: 'Can foreign brand equipment be supplied if local warranty is guaranteed?', answer: 'Yes, provided technical specifications match the provided PDF sheet.', askedBy: 'SecureGuard BD', date: '2026-09-04' },
  ]);
  const [newQuestion, setNewQuestion] = useState('');

  // Bid Submission State
  const [bidData, setBidData] = useState({
    price: '',
    deliveryTime: '',
    warranty: '',
    experienceNotes: '',
    proposalFile: null,
  });

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    setQnaList([
      ...qnaList,
      {
        id: Date.now(),
        question: newQuestion,
        answer: 'Pending buyer response (Buyer notified via platform messaging)',
        askedBy: user ? user.name : 'Supplier Company',
        date: new Date().toISOString().split('T')[0],
      }
    ]);
    setNewQuestion('');
    toast.success('Question submitted to Buyer Q&A board!');
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (!bidData.price || !bidData.deliveryTime) {
      toast.error('Please fill in required proposal details');
      return;
    }
    toast.success('Proposal & Financial Bid submitted successfully!');
    setShowBidForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <div>
        <Link to="/tenders" className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-blue-700">
          <ArrowLeft className="w-4 h-4" /> Back to Tenders Listing
        </Link>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                {tender.categoryLabel}
              </span>
              <span className="text-xs text-gray-400">ID: {tender.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              {tender.title}
            </h1>
            <div className="flex items-center gap-2 pt-1">
              <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">
                {tender.buyer.logo}
              </div>
              <span className="font-bold text-gray-800 text-sm">{tender.buyer.name}</span>
              {tender.buyer.verified && <VerificationBadge size="xs" text="Verified Buyer" />}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={() => setShowAiModal(true)}
              className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-xl border border-indigo-200 flex items-center justify-center gap-1.5 transition"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              AI Eligibility Check
            </button>
            <button
              onClick={() => setShowBidForm(!showBidForm)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition"
            >
              <Send className="w-4 h-4" />
              Submit Bid Proposal
            </button>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs">
          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Estimated Budget</span>
            <span className="font-bold text-blue-900 text-sm">{tender.budget}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Location</span>
            <span className="font-semibold text-gray-800">{tender.location}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Bidding Deadline</span>
            <span className="font-semibold text-amber-700">{tender.deadline}</span>
          </div>
          <div>
            <span className="text-gray-400 text-[11px] block font-medium">Bids Received</span>
            <span className="font-bold text-teal-700">{tender.bidsCount} Proposals</span>
          </div>
        </div>
      </div>

      {/* Bid Submission Form Modal / Collapse */}
      {showBidForm && (
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 animate-in fade-in duration-200">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold">Submit Digital Bid Proposal</h3>
              <p className="text-xs text-slate-400">All submissions are confidential until evaluated by the buyer.</p>
            </div>
            <button onClick={() => setShowBidForm(false)} className="text-xs text-slate-400 hover:text-white">Cancel</button>
          </div>

          <form onSubmit={handleBidSubmit} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Total Quoted Price (৳)</label>
                <input
                  type="text"
                  placeholder="e.g. ৳8,45,000"
                  value={bidData.price}
                  onChange={(e) => setBidData({ ...bidData, price: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-teal-400"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Estimated Delivery Time</label>
                <input
                  type="text"
                  placeholder="e.g. 45 days"
                  value={bidData.deliveryTime}
                  onChange={(e) => setBidData({ ...bidData, deliveryTime: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-teal-400"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Warranty Coverage</label>
                <input
                  type="text"
                  placeholder="e.g. 2 Years Comprehensive"
                  value={bidData.warranty}
                  onChange={(e) => setBidData({ ...bidData, warranty: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-hidden focus:border-teal-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Relevant Experience & References</label>
              <textarea
                rows={3}
                placeholder="List similar completed projects, client references, or technical compliance notes..."
                value={bidData.experienceNotes}
                onChange={(e) => setBidData({ ...bidData, experienceNotes: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:outline-hidden focus:border-teal-400"
              />
            </div>

            <div className="bg-slate-800/80 p-4 rounded-xl border border-dashed border-slate-700 text-center">
              <Upload className="w-6 h-6 text-teal-400 mx-auto mb-1" />
              <span className="font-semibold text-slate-300 block">Attach Technical & Financial Proposal (PDF)</span>
              <span className="text-[11px] text-slate-500">Attach Trade License, VAT Info & Specification Sheets</span>
              <input type="file" className="mt-2 text-xs text-slate-400 mx-auto" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowBidForm(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 font-semibold rounded-xl text-slate-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-teal-500 hover:bg-teal-600 font-bold text-white rounded-xl shadow-lg"
              >
                Submit Proposal Now
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Grid: Details + Documents + Q&A */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Scope & Requirements */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Detailed Description */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <h3 className="font-bold text-gray-900 text-base">Requirement Overview & Scope</h3>
            <p className="text-xs text-gray-700 leading-relaxed">{tender.description}</p>
            
            <div className="pt-3">
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-2">Technical Requirements</h4>
              <ul className="space-y-2 text-xs text-gray-700">
                {tender.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-gray-100">
              <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-1">Eligibility Criteria</h4>
              <p className="text-xs text-gray-600">{tender.eligibility}</p>
            </div>
          </div>

          {/* Tender Q&A Board */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-700" />
                  Public Clarifications & Q&A Board
                </h3>
                <p className="text-xs text-gray-500">Clarifications asked by suppliers and answered by the buyer</p>
              </div>
            </div>

            <div className="space-y-3">
              {qnaList.map(q => (
                <div key={q.id} className="bg-gray-50 p-3.5 rounded-xl border border-gray-100 text-xs space-y-1.5">
                  <div className="font-semibold text-gray-900">Q: {q.question}</div>
                  <div className="text-blue-900 bg-blue-50/80 p-2 rounded-lg border border-blue-100 font-medium">
                    A: {q.answer}
                  </div>
                  <div className="text-[10px] text-gray-400 flex justify-between pt-1">
                    <span>Asked by: {q.askedBy}</span>
                    <span>Date: {q.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Ask Question Form */}
            <form onSubmit={handleQuestionSubmit} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Ask a technical clarification question to the buyer..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 focus:outline-hidden focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl shadow-xs shrink-0"
              >
                Ask Question
              </button>
            </form>
          </div>

        </div>

        {/* Right 1 Col: Attachments & Buyer Card */}
        <div className="space-y-6">
          
          {/* Official Attachments */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-700" />
              Attached Specification Documents
            </h4>
            <div className="space-y-2">
              {tender.documents.map((doc, idx) => (
                <div key={idx} className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
                  <span className="font-semibold text-blue-900 truncate">{doc}</span>
                  <button onClick={() => toast.success(`Downloading ${doc}`)} className="text-blue-700 font-bold text-[11px] hover:underline">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Buyer Trust & Verification Details */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
            <h4 className="font-bold text-gray-900 text-sm">Buyer Verification Info</h4>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span>Organization</span>
                <strong className="text-gray-900">{tender.buyer.name}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span>Status</span>
                <VerificationBadge size="xs" text="Trade Verified" />
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span>Tenders Posted</span>
                <span className="font-semibold text-gray-800">14 Tenders</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Location</span>
                <span className="font-semibold text-gray-800">{tender.location}</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* AI Assistant Modal */}
      {showAiModal && (
        <AiAssistantModal tender={tender} onClose={() => setShowAiModal(false)} />
      )}

    </div>
  );
}
