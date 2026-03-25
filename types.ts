export enum FeedType {
  EMAIL = 'EMAIL',
  TEAMS_CHAT = 'TEAMS_CHAT',
  MEETING = 'MEETING',
  TASK = 'TASK'
}

export interface Author {
  name: string;
  avatar?: string;
  initials: string;
  email: string;
  isGroup?: boolean; // New field to support split avatars
}

export interface FeedItem {
  id: string;
  type: FeedType;
  title: string;
  preview: string;
  timestamp: Date;
  author: Author;
  isUrgent: boolean;
  link: string; // Deep link to Outlook or Teams
}

export interface KPIMetrics {
  unreadEmails: number;
  unreadChats: number;
  upcomingMeetings: number;
  urgentTasks: number;
}

export interface AIInsight {
  summary: string;
  priorityScore: number;
  actionItems: string[];
}