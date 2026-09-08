import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle, Building2, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [queue, setQueue] = useState([
    { id: 1, companyName: 'Apex Tech Solutions', role: 'Supplier', license: 'TRD-2026-901', doc: 'TradeLicense_Apex.pdf', status: 'pending', date: '2026-09-05' },
    { id: 2, companyName: 'Delta Construction Ltd.', role: 'Supplier', license: 'TRD-2026-441', doc: 'TradeLicense_Delta.pdf', status: 'pending', date: '2026-09-04' },
    { id: 3, companyName: 'Horizon Healthcare', role: 'Buyer', license: 'TRD-2026-112', doc: 'CompanyReg_Horizon.pdf', status: 'pending', date: '2026-09-05' },
  ]);

  const handleApprove = (id) => {
    setQueue(queue.map(q => q.id === id ? { ...q, status: 'approved' } : q));
    toast.success('Company verified and awarded "Verified Business" badge!');
  };

  const handleReject = (id) => {
    setQueue(queue.map(q => q.id === id ? { ...q, status: 'rejected' } : q));
    toast.error('Verification application rejected.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-teal-400" />
            Marketplace Admin Portal & Trade Verification Queue
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review trade licenses, verify buyers/suppliers, and moderate tender publications.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center text-xs font-bold text-gray-700">
          <span>Pending Trade License Verification Queue ({queue.filter(q => q.status === 'pending').length})</span>
        </div>

        <table className="w-full text-left text-xs text-gray-700">
          <thead className="bg-gray-100 font-bold uppercase text-[11px]">
            <tr>
              <th className="p-3">Company Name</th>
              <th className="p-3">Account Type</th>
              <th className="p-3">Trade License Number</th>
              <th className="p-3">Attached Document</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {queue.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-3 font-bold text-gray-900">{item.companyName}</td>
                <td className="p-3 font-semibold text-blue-900">{item.role}</td>
                <td className="p-3 text-gray-600">{item.license}</td>
                <td className="p-3 text-blue-700 font-semibold underline cursor-pointer" onClick={() => toast.success(`Viewing ${item.doc}`)}>
                  {item.doc}
                </td>
                <td className="p-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    item.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                    item.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-3 text-right space-x-2">
                  {item.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleApprove(item.id)}
                        className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-md shadow-xs"
                      >
                        Approve & Verify
                      </button>
                      <button
                        onClick={() => handleReject(item.id)}
                        className="px-3 py-1 bg-rose-100 text-rose-700 hover:bg-rose-200 font-semibold rounded-md"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
