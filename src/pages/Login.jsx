import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, ShieldCheck, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState('buyer');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(role);
    toast.success(`Signed in as ${role.toUpperCase()} account`);
    navigate(`/${role}`);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200/80 p-8 shadow-lg space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-teal-500 text-white font-bold flex items-center justify-center mx-auto shadow-md">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Sign in to ProcureHub</h2>
          <p className="text-xs text-gray-500">Access your procurement dashboard or supplier bids</p>
        </div>

        {/* Role Selector */}
        <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => setRole('buyer')}
            className={`flex-1 py-2 rounded-lg transition ${role === 'buyer' ? 'bg-white text-blue-900 shadow-xs' : 'text-gray-600'}`}
          >
            🏢 Buyer Account
          </button>
          <button
            type="button"
            onClick={() => setRole('supplier')}
            className={`flex-1 py-2 rounded-lg transition ${role === 'supplier' ? 'bg-white text-blue-900 shadow-xs' : 'text-gray-600'}`}
          >
            ⚡ Supplier Account
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`flex-1 py-2 rounded-lg transition ${role === 'admin' ? 'bg-white text-blue-900 shadow-xs' : 'text-gray-600'}`}
          >
            🛡️ Admin
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Corporate Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="email"
                defaultValue={role === 'buyer' ? 'procurement@abcbank.com' : role === 'supplier' ? 'bids@techvision.com' : 'admin@procurehub.com'}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-hidden focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="password"
                defaultValue="password123"
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-800 focus:outline-hidden focus:border-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white font-bold rounded-xl text-xs shadow-md transition"
          >
            Sign In to Account
          </button>
        </form>

        <div className="text-center text-xs text-gray-500 pt-2 border-t border-gray-100">
          Don't have an account? <Link to="/register" className="text-blue-700 font-semibold hover:underline">Register Business</Link>
        </div>

      </div>
    </div>
  );
}
