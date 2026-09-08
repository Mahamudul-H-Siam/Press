import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, DollarSign, Clock, FileText, ArrowRight, Tag } from 'lucide-react';
import VerificationBadge from './VerificationBadge';

export default function TenderCard({ tender }) {
  const isUrgent = new Date(tender.deadline) - new Date() < 1000 * 60 * 60 * 24 * 10; // less than 10 days

  return (
    <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      <div className="p-5">
        
        {/* Top Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-100">
              {tender.buyer.logo}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-gray-700">{tender.buyer.name}</span>
                {tender.buyer.verified && <VerificationBadge size="xs" text="Verified" />}
              </div>
              <span className="text-[11px] text-gray-500">{tender.categoryLabel}</span>
            </div>
          </div>

          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            tender.status === 'open' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600'
          }`}>
            {tender.status === 'open' ? 'Open for Bids' : tender.status}
          </span>
        </div>

        {/* Title */}
        <Link to={`/tenders/${tender.id}`} className="block group-hover:text-blue-700 transition">
          <h3 className="text-base font-bold text-gray-900 leading-snug mb-2 line-clamp-2">
            {tender.title}
          </h3>
        </Link>

        {/* Description snippet */}
        <p className="text-xs text-gray-600 line-clamp-2 mb-4">
          {tender.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tender.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="bg-gray-100 text-gray-600 text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1">
              <Tag className="w-2.5 h-2.5 text-gray-400" />
              {tag}
            </span>
          ))}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="font-semibold text-gray-800 truncate">{tender.budget}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{tender.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className={isUrgent ? 'text-amber-700 font-semibold' : ''}>
              Deadline: {tender.deadline}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>{tender.bidsCount} Bids Submitted</span>
          </div>
        </div>

      </div>

      {/* Footer link */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-[11px] text-gray-400">ID: {tender.id}</span>
        <Link
          to={`/tenders/${tender.id}`}
          className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
        >
          View Details & Bid
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
