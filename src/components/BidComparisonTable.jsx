import React, { useState } from 'react';
import { ShieldCheck, Star, Award, CheckCircle, Clock, FileCheck, ThumbsUp } from 'lucide-react';
import VerificationBadge from './VerificationBadge';

export default function BidComparisonTable({ bids = [], onSelectWinner, onShortlist }) {
  const [selectedBid, setSelectedBid] = useState(null);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
      <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
        <div>
          <h3 className="font-bold text-base">Standardized Bid Evaluation & Comparison</h3>
          <p className="text-xs text-slate-300">Compare submitted proposals across key metrics transparently</p>
        </div>
        <span className="text-xs bg-blue-600 px-2.5 py-1 rounded-full font-medium">
          {bids.length} Proposals Received
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-100 text-gray-700 font-semibold border-b border-gray-200 uppercase tracking-wider text-[11px]">
            <tr>
              <th className="p-3.5">Supplier / Company</th>
              <th className="p-3.5">Quoted Price</th>
              <th className="p-3.5">Delivery Time</th>
              <th className="p-3.5">Warranty</th>
              <th className="p-3.5">Experience</th>
              <th className="p-3.5">Tech Score</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bids.map((bid) => (
              <tr 
                key={bid.id} 
                className={`hover:bg-blue-50/50 transition ${bid.status === 'shortlisted' ? 'bg-amber-50/30' : ''}`}
              >
                <td className="p-3.5 font-medium">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 font-bold text-gray-900 text-sm">
                      {bid.supplier.name}
                      {bid.supplier.verified && <VerificationBadge size="xs" text="Verified" />}
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-[11px] mt-0.5">
                      <span className="flex items-center text-amber-500 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400 mr-0.5" />
                        {bid.supplier.rating}
                      </span>
                      <span>• {bid.supplier.projects} projects done</span>
                    </div>
                  </div>
                </td>
                <td className="p-3.5">
                  <span className="font-bold text-blue-800 text-sm">{bid.price}</span>
                </td>
                <td className="p-3.5 font-medium text-gray-800">{bid.delivery}</td>
                <td className="p-3.5">{bid.warranty}</td>
                <td className="p-3.5">{bid.experience}</td>
                <td className="p-3.5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-12 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          bid.technicalScore > 90 ? 'bg-emerald-500' : bid.technicalScore > 75 ? 'bg-blue-500' : 'bg-amber-500'
                        }`} 
                        style={{ width: `${bid.technicalScore}%` }}
                      ></div>
                    </div>
                    <span className="font-bold text-xs text-gray-800">{bid.technicalScore}%</span>
                  </div>
                </td>
                <td className="p-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${
                    bid.status === 'shortlisted' ? 'bg-purple-100 text-purple-700' : 
                    bid.status === 'awarded' ? 'bg-emerald-100 text-emerald-800 font-bold' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {bid.status}
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  {bid.status !== 'shortlisted' && (
                    <button
                      onClick={() => onShortlist(bid.id)}
                      className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 font-semibold rounded-md transition text-xs"
                    >
                      Shortlist
                    </button>
                  )}
                  <button
                    onClick={() => onSelectWinner(bid)}
                    className="px-3 py-1 bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white font-semibold rounded-md shadow-xs transition text-xs"
                  >
                    Select Winner
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-3 bg-gray-50 text-[11px] text-gray-500 border-t border-gray-200 flex justify-between items-center">
        <span>💡 Principle: "Best qualified offer wins" — system evaluates price, technical compliance, delivery time, and warranty.</span>
        <span>Controlled Transparency Enabled</span>
      </div>
    </div>
  );
}
