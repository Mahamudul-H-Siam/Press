import React, { useState } from 'react';
import { Bot, Sparkles, AlertCircle, CheckCircle, FileText, X, ShieldAlert } from 'lucide-react';

export default function AiAssistantModal({ tender, onClose }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        matchScore: '94%',
        eligibility: 'Eligible',
        summary: `Tender requires ${tender.title}. Scope includes turnkey execution with maintenance. Estimated project scale: ${tender.budget}.`,
        keyRequirements: [
          '3+ years corporate experience in category',
          'Valid Trade License & VAT registration',
          'Technical proposal detailing timeline & SLA',
          'Warranty coverage commitment',
        ],
        riskLevel: 'Low-Medium',
        riskNotes: 'Strict completion deadline (30-45 days). Ensure workforce availability before bidding.',
        recommendation: 'Highly Recommended for your company profile.',
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-teal-800 p-5 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md">
              <Bot className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <h3 className="font-bold text-base flex items-center gap-2">
                AI Tender Assistant & Document Analyzer
                <Sparkles className="w-4 h-4 text-amber-300" />
              </h3>
              <p className="text-xs text-blue-200">Smart matching & automated eligibility analysis</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-lg text-white/80 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4 bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 flex items-center gap-3">
            <FileText className="w-5 h-5 text-blue-700 shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-gray-900">{tender.title}</div>
              <div className="text-gray-500">Buyer: {tender.buyer.name} • Category: {tender.categoryLabel}</div>
            </div>
          </div>

          {!result && !analyzing && (
            <div className="text-center py-6">
              <Sparkles className="w-12 h-12 text-teal-500 mx-auto mb-3 animate-pulse" />
              <h4 className="font-bold text-gray-800 text-sm mb-1">Analyze Tender Document & Match Fit</h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto mb-5">
                Our AI scans the technical requirements, eligibility criteria, required attachments, and risk profile against your business capabilities.
              </p>
              <button
                onClick={handleAnalyze}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white font-semibold rounded-xl text-sm shadow-md transition transform active:scale-95"
              >
                Run AI Tender Analysis
              </button>
            </div>
          )}

          {analyzing && (
            <div className="text-center py-10">
              <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-xs font-semibold text-gray-700">Analyzing tender document specifications...</p>
            </div>
          )}

          {result && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-emerald-700 font-medium">Match Fit Score</span>
                    <div className="text-xl font-extrabold text-emerald-800">{result.matchScore}</div>
                  </div>
                  <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-blue-700 font-medium">Eligibility Status</span>
                    <div className="text-xl font-extrabold text-blue-900">{result.eligibility}</div>
                  </div>
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              <div>
                <h5 className="font-bold text-gray-900 mb-1">AI Executive Summary:</h5>
                <p className="text-gray-600 bg-gray-50 p-2.5 rounded-lg border border-gray-100">{result.summary}</p>
              </div>

              <div>
                <h5 className="font-bold text-gray-900 mb-1">Extracted Key Checklist:</h5>
                <ul className="space-y-1 text-gray-700">
                  {result.keyRequirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2 text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold">Risk Assessment ({result.riskLevel}):</span> {result.riskNotes}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold text-gray-700 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
