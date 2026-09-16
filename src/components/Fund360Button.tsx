import React from 'react';
import { HeartHandshake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Fund360Button({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        navigate('/fund360');
      }}
      className={`rounded-full border border-emerald-300 bg-emerald-50 text-emerald-900 font-black inline-flex items-center justify-center gap-2 hover:bg-emerald-100 transition-colors shadow-sm whitespace-nowrap ${
        compact ? 'h-9 px-3 text-[11px]' : 'h-10 px-4 text-xs'
      } ${className}`}
      title="Open FUND 365"
    >
      <HeartHandshake className="w-4 h-4" />
      <span>FUND 365</span>
    </button>
  );
}
