import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function VerificationBadge({ text = "Verified Business", size = "sm" }) {
  return (
    <span className={`inline-flex items-center gap-1 bg-teal-50 text-teal-700 border border-teal-200/80 font-medium rounded-full ${
      size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-0.5 text-xs'
    }`}>
      <ShieldCheck className={size === 'xs' ? 'w-3 h-3 text-teal-600' : 'w-3.5 h-3.5 text-teal-600'} />
      <span>{text}</span>
    </span>
  );
}
