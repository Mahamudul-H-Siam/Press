import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">ProcureHub</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              The premier digital B2B procurement and tender marketplace connecting organizations with verified suppliers through transparent online bidding.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-slate-800/80 px-3 py-1.5 rounded-md w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Business Marketplace</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Marketplace</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/tenders" className="hover:text-white transition">Browse All Tenders</Link></li>
              <li><Link to="/tenders?category=technology" className="hover:text-white transition">Technology & Software</Link></li>
              <li><Link to="/tenders?category=construction" className="hover:text-white transition">Construction & Engineering</Link></li>
              <li><Link to="/tenders?category=security" className="hover:text-white transition">Security & Surveillance</Link></li>
              <li><Link to="/tenders?category=office" className="hover:text-white transition">Office & Facilities</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Platform & Solutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/buyer" className="hover:text-white transition">For Buyers (Post Requirement)</Link></li>
              <li><Link to="/supplier" className="hover:text-white transition">For Suppliers (Submit Bids)</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition">Pricing Plans</Link></li>
              <li><Link to="/about" className="hover:text-white transition">How Procurement Works</Link></li>
              <li><Link to="/admin" className="hover:text-white transition">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">Contact & Support</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Gulshan Avenue, Dhaka-1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>+880 9612-888999</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>support@procurehub-bd.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ProcureHub Digital B2B Procurement Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Supplier Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
