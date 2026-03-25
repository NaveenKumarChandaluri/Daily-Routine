import React from 'react';
import { LucideIcon, ExternalLink } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  colorClass: string;
  isActive: boolean;
  onClick: () => void;
  onLaunch: (e: React.MouseEvent) => void;
}

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  subtext, 
  icon: Icon, 
  colorClass, 
  isActive,
  onClick,
  onLaunch
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative p-5 rounded-2xl border transition-all duration-300 w-full text-left group cursor-pointer
        ${isActive 
          ? `bg-slate-800 border-${colorClass} shadow-lg shadow-${colorClass}/10` 
          : 'bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-slate-600'
        }
      `}
    >
      <div className="flex justify-between items-start mb-3">
        <div className={`p-2.5 rounded-lg transition-all ${
            isActive ? `bg-${colorClass} text-white` : 'bg-slate-950 text-slate-400 group-hover:text-white'
          }`}>
          <Icon size={20} />
        </div>
        
        {/* Launch Button */}
        <button 
          onClick={onLaunch}
          className="p-1.5 rounded-md text-slate-500 hover:text-white hover:bg-slate-700 transition-colors"
          title={`Open ${title}`}
        >
          <ExternalLink size={16} />
        </button>
      </div>
      
      <div className="space-y-1">
        <h3 className={`text-2xl font-bold tracking-tight ${isActive ? 'text-white' : 'text-slate-200'}`}>
          {value}
        </h3>
        <p className={`text-sm font-medium ${isActive ? `text-${colorClass}` : 'text-slate-400'}`}>
          {title}
        </p>
      </div>

      {subtext && (
        <div className="mt-3 pt-3 border-t border-slate-800 group-hover:border-slate-700/50">
          <p className="text-xs text-slate-500 group-hover:text-slate-400 truncate">{subtext}</p>
        </div>
      )}
      
      {/* Active Indicator Line */}
      {isActive && (
        <div className={`absolute bottom-0 left-4 right-4 h-1 rounded-t-full bg-${colorClass}`} />
      )}
    </div>
  );
};