import { FeedItem, FeedType } from '../types';

// Simulate fetching data from Microsoft Graph API
export const fetchMockFeed = (): Promise<FeedItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          type: FeedType.TEAMS_CHAT,
          title: 'MSXI - FY25 Fiscal Year',
          preview: 'Rishikesh: We need to finalize the dev slot planning for the migration module by EOD.',
          timestamp: new Date(new Date().setHours(10, 47)),
          author: { name: 'MSXI Team', initials: 'MS', email: 'rishikesh@maqsoftware.com', isGroup: true },
          isUrgent: true,
          link: 'https://teams.microsoft.com/l/message/19:af...'
        },
        {
          id: '2',
          type: FeedType.EMAIL,
          title: 'Client Feedback on MSXI Dashboard',
          preview: 'Summary: The client approved the layout but requested multi-select filters for the Region dropdown. Please estimate effort.',
          timestamp: new Date(new Date().setHours(9, 30)),
          author: { name: 'David Ross', initials: 'DR', email: 'david.ross@maqsoftware.com' },
          isUrgent: true,
          link: 'https://outlook.office.com/mail/inbox/id/2'
        },
        {
          id: '3',
          type: FeedType.TEAMS_CHAT,
          title: 'MSXI Internal Morning Sync',
          preview: 'Rishikesh: Name Work items Priority... sharing the excel sheet now.',
          timestamp: new Date(new Date().setHours(9, 39)),
          author: { name: 'MSXI Internal', initials: 'MI', email: 'rishikesh@maqsoftware.com', isGroup: true },
          isUrgent: false,
          link: 'https://teams.microsoft.com/l/message/19:af...'
        },
        {
          id: '4',
          type: FeedType.TEAMS_CHAT,
          title: 'MSXI + DC',
          preview: 'Jonty: Pratik Palan | MAQ Software, Raj is asking for the access logs.',
          timestamp: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday
          author: { name: 'MSXI + DC', initials: 'MD', email: 'jonty@maqsoftware.com', isGroup: true },
          isUrgent: false,
          link: 'https://teams.microsoft.com/l/message/19:af...'
        },
        {
          id: '5',
          type: FeedType.TEAMS_CHAT,
          title: 'Shwetha\'s Team',
          preview: 'Shwetha: Everyone I will be busy in a training session until 2 PM.',
          timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
          author: { name: 'Shwetha\'s Team', initials: 'ST', email: 'shwetha@maqsoftware.com', isGroup: true },
          isUrgent: false,
          link: 'https://teams.microsoft.com/l/message/19:af...'
        },
        {
          id: '6',
          type: FeedType.EMAIL,
          title: 'MSXI: Weekly Status Report',
          preview: 'Summary: Green status for all tracks. Backend deployment is scheduled for Thursday night.',
          timestamp: new Date(new Date().setHours(8, 15)),
          author: { name: 'Project Mgmt', initials: 'PM', email: 'pm@maqsoftware.com' },
          isUrgent: false,
          link: 'https://outlook.office.com/mail/inbox/id/6'
        },
        {
          id: '7',
          type: FeedType.TEAMS_CHAT,
          title: 'MSXI New Members Onboarding',
          preview: 'Suresh: Welcome to the team! Please check the pinned tab for setup docs.',
          timestamp: new Date(new Date().setDate(new Date().getDate() - 5)),
          author: { name: 'Onboarding', initials: 'ON', email: 'suresh@maqsoftware.com', isGroup: true },
          isUrgent: false,
          link: 'https://teams.microsoft.com/l/message/19:af...'
        },
        {
          id: '8',
          type: FeedType.EMAIL,
          title: 'Action: MSXI Access Review',
          preview: 'Summary: Please review your access permissions for the MSXI Azure resource group and confirm by replying.',
          timestamp: new Date(new Date().setHours(11, 0)),
          author: { name: 'IT Security', initials: 'IT', email: 'security@maqsoftware.com' },
          isUrgent: true,
          link: 'https://outlook.office.com/mail/inbox/id/8'
        }
      ]);
    }, 500);
  });
};