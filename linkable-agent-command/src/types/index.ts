export type CampaignVertical = 'clinical' | 'claimguard' | 'sitesafe' | 'omnistock' | 'saccade' | 'all';

export type LeadStatus = 'delivered' | 'followed_up' | 'replied' | 'meeting_booked' | 'bounced_suppressed';

export type ReplyIntent = 'ui_ux_mod' | 'custom_ehr' | 'pricing_licensing' | 'demo_request' | 'claims_defense' | 'osha_safety' | 'general';

export interface LeadRecord {
  id: number;
  companyName: string;
  hospitalName?: string;
  contactName: string;
  title: string;
  email: string;
  country: string;
  dispatchedAt: string;
  followedUpAt?: string;
  status: LeadStatus;
  vertical: CampaignVertical;
  openCount: number;
  lastEngagedAgo: string;
  messageId: string;
  painPoint?: string;
}

export interface InboundReply {
  id: string;
  senderEmail: string;
  senderName: string;
  organization: string;
  receivedAt: string;
  subject: string;
  snippet: string;
  intent: ReplyIntent;
  confidenceScore: number;
  suggestedAiReply: string;
  status: 'pending_review' | 'approved_sent' | 'archived';
}

export interface CloudEngineTelemetry {
  serviceName: string;
  cloudProvider: 'Google Cloud Run';
  region: string;
  status: 'ONLINE_24_7' | 'DEGRADED' | 'PAUSED';
  nextCronTriggerInMinutes: number;
  dailyQuotasRemaining: number;
  uptimePercentage: number;
  lastExecutionTimestamp: string;
  autoPilotEnabled: boolean;
  telegramAlertsActive: boolean;
}
