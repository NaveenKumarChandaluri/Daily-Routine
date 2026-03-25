import React from 'react';
import { FeedItem, FeedType } from '../types';
import { Mail, Calendar, CheckCircle, Clock } from 'lucide-react';

interface FeedListProps {
  items: FeedItem[];
  filterType: FeedType | 'ALL';
  isLoading: boolean;
}

const Avatar: React.FC<{ name: string; initials: string; isGroup?: boolean }> = ({ name, initials, isGroup }) => {
  if (isGroup) {
    // Render a "Split" avatar style to mimic Teams group chats
    return (
      <div className="w-12 h-12 rounded-full overflow-hidden grid grid-cols-2 gap-[1px] bg-slate-800 flex-shrink-0">
        <div className="bg-indigo-400 flex items-center justify-center text-[8px] font-bold text-white">
            {initials[0]}
        </div>
        <div className="bg-purple-400 flex items-center justify-center text-[8px] font-bold text-white">
            {initials[1] || 'A'}
        </div>
        <div className="bg-blue-400 flex items-center justify-center text-[8px] font-bold text-white">
            {name[0]}
        </div>
        <div className="bg-pink-400 flex items-center justify-center text-[8px] font-bold text-white">
            {name[1] || 'B'}
        </div>
      </div>
    );
  }
  
  // Single User Avatar
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-lg flex-shrink-0">
      {initials}
    </div>
  );
};

const formatDate = (date: Date) => {
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth();
    
    if (isToday) {
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    }
    return `${date.getDate()}-${date.getMonth() + 1}`;
};

export const FeedList: React.FC<FeedListProps> = ({ items, filterType, isLoading }) => {
  const filteredItems = filterType === 'ALL' 
    ? items 
    : items.filter(item => item.type === filterType);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 bg-slate-900 rounded-lg w-full border border-slate-800"></div>
        ))}
      </div>
    );
  }

  if (filteredItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-slate-500">
        <p>No items found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {filteredItems.map((item) => (
        <a
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-3 hover:bg-slate-900 rounded-xl transition-colors group border-b border-slate-900/50 hover:border-transparent cursor-pointer"
        >
          {/* Avatar Area */}
          <div className="relative">
            <Avatar 
                name={item.author.name} 
                initials={item.author.initials} 
                isGroup={item.author.isGroup} 
            />
            {item.isUrgent && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#050505] rounded-full animate-pulse" title="Urgent" />
            )}
            <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#050505] flex items-center justify-center text-[10px]
                ${item.type === FeedType.EMAIL ? 'bg-blue-500 text-white' : ''}
                ${item.type === FeedType.TEAMS_CHAT ? 'bg-indigo-500 text-white' : ''}
                ${item.type === FeedType.MEETING ? 'bg-orange-500 text-white' : ''}
            `}>
                {item.type === FeedType.EMAIL && <Mail size={10} />}
                {item.type === FeedType.TEAMS_CHAT && <span className="font-bold">T</span>}
                {item.type === FeedType.MEETING && <Calendar size={10} />}
            </div>
          </div>

          {/* Content Area - Designed to match Teams List View */}
          <div className="flex-1 min-w-0">
             <div className="flex justify-between items-baseline mb-0.5">
                <h4 className="text-sm font-semibold text-slate-200 truncate pr-2">
                    {item.title}
                </h4>
                <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
                    {formatDate(item.timestamp)}
                </span>
             </div>
             
             {/* Preview Text */}
             <div className="text-sm text-slate-400 truncate group-hover:text-slate-300">
                {item.type === FeedType.EMAIL ? (
                    <span className="flex items-center gap-1">
                        <span className="font-medium text-blue-400 text-xs uppercase tracking-wide">Summary:</span>
                        <span className="truncate">{item.preview.replace('Summary: ', '')}</span>
                    </span>
                ) : (
                    <span>{item.preview}</span>
                )}
             </div>
          </div>
        </a>
      ))}
    </div>
  );
};