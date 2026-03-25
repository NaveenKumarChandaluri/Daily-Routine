import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  MessageSquare, 
  Calendar, 
  CheckCircle, 
  RefreshCw,
  Sparkles,
  Sun,
  LayoutDashboard
} from 'lucide-react';
import { KPICard } from './components/KPICard';
import { FeedList } from './components/FeedList';
import { fetchMockFeed } from './services/mockService';
import { generateDailyBriefing } from './services/geminiService';
import { FeedItem, FeedType } from './types';

const App = () => {
  const [activeTab, setActiveTab] = useState<FeedType | 'ALL'>('ALL');
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiBriefing, setAiBriefing] = useState<{
    morning_brief: string;
    top_priorities: string[];
    workload_score: number;
  } | null>(null);

  // Initialize Data
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchMockFeed();
      
      // Strict Filter Logic:
      // 1. Author must have @maqsoftware.com email
      // 2. If it's a Teams chat, it must be related to "MSXI" (checking title)
      const filteredData = data.filter(item => {
        const isMaqUser = item.author.email.endsWith('@maqsoftware.com');
        const isRelevantChat = item.type === FeedType.TEAMS_CHAT 
          ? item.title.includes('MSXI') || item.author.name.includes('MSXI')
          : true;
        
        return isMaqUser && isRelevantChat;
      });

      setFeedItems(filteredData);
      
      // Get AI Insight on the filtered data
      if (process.env.API_KEY && filteredData.length > 0) {
        const insight = await generateDailyBriefing(filteredData);
        setAiBriefing(insight);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate Metrics based on filtered data
  const metrics = {
    emails: feedItems.filter(i => i.type === FeedType.EMAIL).length,
    chats: feedItems.filter(i => i.type === FeedType.TEAMS_CHAT).length,
    meetings: feedItems.filter(i => i.type === FeedType.MEETING).length,
    tasks: feedItems.filter(i => i.type === FeedType.TASK).length,
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Launcher Functions
  const launchApp = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500 selection:text-white pb-20">
      
      {/* Top Navigation Bar */}
      <nav className="border-b border-slate-900 bg-[#050505]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-indigo-500" size={24} />
            <span className="font-bold text-lg tracking-tight">Morning Sync</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-400">
             <div className="flex items-center gap-2">
                <Sun size={16} className="text-yellow-500" />
                <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
             </div>
             <div className="h-4 w-px bg-slate-800" />
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-green-500">Online</span>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 mt-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
              {getGreeting()}, User.
            </h1>
            <p className="text-slate-400">
              Your <span className="text-white font-medium">MSXI</span> focused dashboard.
            </p>
          </div>
          <button 
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all disabled:opacity-50 text-sm font-medium"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            <span>Refresh Feed</span>
          </button>
        </div>

        {/* AI Briefing Section */}
        {aiBriefing && (
          <div className="mb-8 p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500/50 via-purple-500/50 to-pink-500/50">
             <div className="bg-[#0a0a0a] rounded-[15px] p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles size={100} />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-indigo-400" size={18} />
                    <h2 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">
                        Gemini Summary
                    </h2>
                    </div>
                    <p className="text-lg text-slate-200 leading-relaxed font-light mb-4">
                    "{aiBriefing.morning_brief}"
                    </p>
                    <div className="flex flex-wrap gap-2">
                    {aiBriefing.top_priorities.map((p, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs font-medium text-slate-300">
                        {p}
                        </span>
                    ))}
                    </div>
                </div>
             </div>
          </div>
        )}

        {/* KPI Grid / Filters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <KPICard
            title="Inbox"
            value={metrics.emails}
            subtext="Unread MAQ emails"
            icon={Mail}
            colorClass="blue-500"
            isActive={activeTab === FeedType.EMAIL}
            onClick={() => setActiveTab(activeTab === FeedType.EMAIL ? 'ALL' : FeedType.EMAIL)}
            onLaunch={(e) => { e.stopPropagation(); launchApp('https://outlook.office.com/mail/'); }}
          />
          <KPICard
            title="Teams"
            value={metrics.chats}
            subtext="MSXI Chats"
            icon={MessageSquare}
            colorClass="indigo-500"
            isActive={activeTab === FeedType.TEAMS_CHAT}
            onClick={() => setActiveTab(activeTab === FeedType.TEAMS_CHAT ? 'ALL' : FeedType.TEAMS_CHAT)}
            onLaunch={(e) => { e.stopPropagation(); launchApp('https://teams.microsoft.com/'); }}
          />
          <KPICard
            title="Calendar"
            value={metrics.meetings}
            subtext="Upcoming"
            icon={Calendar}
            colorClass="orange-500"
            isActive={activeTab === FeedType.MEETING}
            onClick={() => setActiveTab(activeTab === FeedType.MEETING ? 'ALL' : FeedType.MEETING)}
            onLaunch={(e) => { e.stopPropagation(); launchApp('https://outlook.office.com/calendar/'); }}
          />
          <KPICard
            title="Tasks"
            value={metrics.tasks}
            subtext="To Do"
            icon={CheckCircle}
            colorClass="green-500"
            isActive={activeTab === FeedType.TASK}
            onClick={() => setActiveTab(activeTab === FeedType.TASK ? 'ALL' : FeedType.TASK)}
            onLaunch={(e) => { e.stopPropagation(); launchApp('https://to-do.office.com/tasks/'); }}
          />
        </div>

        {/* Unified Feed Section */}
        <div className="bg-[#0a0a0a] rounded-2xl border border-slate-900 overflow-hidden">
          <div className="p-4 border-b border-slate-900 bg-slate-950/50 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-white">
                {activeTab === 'ALL' ? 'Unified Stream' : 
                 activeTab === FeedType.EMAIL ? 'Inbox Summaries' :
                 activeTab === FeedType.TEAMS_CHAT ? 'Recent Chats' : 'Items'}
            </h3>
            <span className="text-xs text-slate-500">
                Displaying {feedItems.filter(i => activeTab === 'ALL' || i.type === activeTab).length} items
            </span>
          </div>

          <div className="p-2">
            <FeedList 
                items={feedItems} 
                filterType={activeTab} 
                isLoading={loading} 
            />
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;