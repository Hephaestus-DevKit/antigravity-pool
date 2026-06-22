export type AccountSummary = {
  id: string;
  name: string;
  email: string | null;
  status: string;
  lastUsed: string;
  usageCount: number;
  hasRefreshToken: boolean;
  quotaStatus: string;
  quotaResetAt: string | null;
  quotaMessage: string | null;
  quotaCheckedAt: string | null;
  leaseUntil: string | null;
};

export type RequestLogSummary = {
  id: string;
  accountId: string | null;
  model: string;
  statusCode: number;
  latency: number;
  promptTokens: number;
  completionTokens: number;
  error: string | null;
  timestamp: string;
  account: {
    name: string;
  } | null;
};

export type HealthStatus = {
  account: {
    id: string;
    name: string;
    email: string | null;
    status: string;
    quotaStatus: string;
    quotaResetAt: string | null;
    lastUsed: string;
    usageCount: number;
  };
  apiAvailable: boolean;
  hasRefreshToken: boolean;
  error?: string;
  checkedAt: string;
};
