import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Search, 
  PlusCircle, 
  User, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Briefcase,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-teal-600 bg-clip-text text-transparent">
                ProcureHub
              </span>
              <span className="block text-[10px] text-gray-500 font-medium tracking-wider uppercase">
                B2B Tender Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/tenders"
              className={`text-sm font-medium transition-colors ${
                isActive('/tenders') ? 'text-blue-700 font-semibold' : 'text-gray-600 hover:text-blue-700'
              }`}
            >
              Browse Tenders
            </Link>
            <Link
              to="/pricing"
              className={`text-sm font-medium transition-colors ${
                isActive('/pricing') ? 'text-blue-700 font-semibold' : 'text-gray-600 hover:text-blue-700'
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors ${
                isActive('/about') ? 'text-blue-700 font-semibold' : 'text-gray-600 hover:text-blue-700'
              }`}
            >
              How it Works
            </Link>
          </nav>

          {/* Action Buttons & User Menu */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                {/* Role Switcher Demo Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 rounded-lg flex items-center gap-1.5 transition"
                  >
                    <span>Role: <strong className="capitalize text-blue-700">{user.role}</strong></span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {roleDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50">
                      <div className="px-3 py-1 text-[11px] font-semibold text-gray-400 uppercase">Switch Demo Persona</div>
                      <button
                        onClick={() => { switchRole('buyer'); setRoleDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-gray-50 ${user.role === 'buyer' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                      >
                        🏢 Buyer Persona
                      </button>
                      <button
                        onClick={() => { switchRole('supplier'); setRoleDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-gray-50 ${user.role === 'supplier' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                      >
                        ⚡ Supplier Persona
                      </button>
                      <button
                        onClick={() => { switchRole('admin'); setRoleDropdownOpen(false); }}
                        className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between hover:bg-gray-50 ${user.role === 'admin' ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                      >
                        🛡️ Admin Persona
                      </button>
                    </div>
                  )}
                </div>

                {/* Post Tender Button for Buyers */}
                {user.role === 'buyer' && (
                  <Link
                    to="/buyer/post-tender"
                    className="px-4 py-2 bg-gradient-to-r from-blue-700 to-teal-600 hover:from-blue-800 hover:to-teal-700 text-white font-medium text-sm rounded-lg shadow-sm flex items-center gap-1.5 transition transform active:scale-95"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Post Tender
                  </Link>
                )}

                {/* Dashboard Link */}
                <Link
                  to={`/${user.role}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm rounded-lg transition flex items-center gap-1.5"
                >
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  Dashboard
                </Link>

                {/* Logout Button */}
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm rounded-lg shadow-sm transition"
                >
                  Register Business
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-2 pb-4 space-y-3">
          <Link
            to="/tenders"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-blue-700"
          >
            Browse Tenders
          </Link>
          <Link
            to="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-blue-700"
          >
            Pricing
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-700 hover:text-blue-700"
          >
            How it Works
          </Link>

          {user ? (
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <Link
                to={`/${user.role}`}
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 bg-blue-700 text-white font-semibold rounded-lg"
              >
                Go to {user.role.toUpperCase()} Dashboard
              </Link>
              <button
                onClick={() => { logout(); setMobileMenuOpen(false); }}
                className="block w-full text-center py-2 text-red-600 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2 text-gray-700 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-2.5 bg-blue-700 text-white font-semibold rounded-lg"
              >
                Register Business
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
