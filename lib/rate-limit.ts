const requestMap = new Map<string, { count: number; resetAt: number }>();

const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 1000;

export function rateLimit(ip: string): { success: boolean } {
  const now = Date.now();
  const record = requestMap.get(ip);

  if (!record || now > record.resetAt) {
    requestMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { success: true };
  }

  if (record.count >= MAX_REQUESTS) {
    return { success: false };
  }

  record.count++;
  return { success: true };
}
