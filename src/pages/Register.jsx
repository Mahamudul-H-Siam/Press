import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Building2, ShieldCheck, Mail, Lock, FileText, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Register() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'supplier';
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState(initialRole);

  const [formData, setFormData] = useState({
    companyName: '',
    tradeLicense: '',
    email: '',
    password: '',
    category: 'technology',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role);
    toast.success(`Registered business account for ${formData.companyName || 'your company'}!`);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-gray-200/80 p-8 shadow-lg space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-teal-500 text-white font-bold flex items-center justify-center mx-auto shadow-md">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Register Business Account</h2>
          <p className="text-xs text-gray-500">Join the B2B Procurement Marketplace with trade verification</p>
        </div>

        {/* Account Type Toggle */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`p-3 rounded-xl border text-left transition ${
              role === 'buyer' ? 'border-blue-600 bg-blue-50/60 font-bold text-blue-900' : 'border-gray-200 text-gray-600'
            }`}
          >
            <div className="text-xs font-bold">🏢 I am a Buyer</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Post requirements & evaluate bids</div>
          </button>

          <button
            type="button"
            onClick={() => setRole('supplier')}
            className={`p-3 rounded-xl border text-left transition ${
              role === 'supplier' ? 'border-teal-600 bg-teal-50/60 font-bold text-teal-900' : 'border-gray-200 text-gray-600'
            }`}
          >
            <div className="text-xs font-bold">⚡ I am a Supplier</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Discover tenders & submit bids</div>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Company / Organization Name</label>
            <input
              type="text"
              placeholder="e.g. Apex Tech Solutions Ltd."
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-hidden focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Trade License Number</label>
              <input
                type="text"
                placeholder="TRD-2026-9901"
                value={formData.tradeLicense}
                onChange={(e) => setFormData({ ...formData, tradeLicense: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-hidden focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Corporate Email</label>
              <input
                type="email"
                placeholder="contact@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-hidden focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              type="password"
              placeholder="Create strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-hidden focus:border-blue-500"
              required
            />
          </div>

          <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl flex items-start gap-2 text-teal-900">
            <ShieldCheck className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
            <div className="text-[11px]">
              <strong>Business Trade Verification:</strong> Upon registration, our admin team verifies trade license details to award your company the "Verified Business" badge.
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white font-bold rounded-xl text-xs shadow-md transition"
          >
            Create Business Account
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Already registered? <Link to="/login" className="text-blue-700 font-semibold hover:underline">Sign In</Link>
        </div>

      </div>
    </div>
  );
}
