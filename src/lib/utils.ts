import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function getDateRange(range: string): { start: Date; end: Date } {
  const end = new Date()
  const start = new Date()
  
  switch (range) {
    case '24h':
      start.setHours(start.getHours() - 24)
      break
    case '7d':
      start.setDate(start.getDate() - 7)
      break
    case '30d':
      start.setDate(start.getDate() - 30)
      break
    case '90d':
      start.setDate(start.getDate() - 90)
      break
    default:
      start.setDate(start.getDate() - 7)
  }
  
  return { start, end }
}

export function parseUserAgent(ua: string): { browser: string; os: string; device: string } {
  let browser = 'Unknown'
  let os = 'Unknown'
  let device = 'desktop'
  
  // Browser detection
  if (ua.includes('Firefox')) browser = 'Firefox'
  else if (ua.includes('Chrome')) browser = 'Chrome'
  else if (ua.includes('Safari')) browser = 'Safari'
  else if (ua.includes('Edge')) browser = 'Edge'
  else if (ua.includes('Opera')) browser = 'Opera'
  
  // OS detection
  if (ua.includes('Windows')) os = 'Windows'
  else if (ua.includes('Mac OS')) os = 'macOS'
  else if (ua.includes('Linux')) os = 'Linux'
  else if (ua.includes('Android')) os = 'Android'
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS'
  
  // Device detection
  if (ua.includes('Mobile') || ua.includes('Android')) device = 'mobile'
  else if (ua.includes('Tablet') || ua.includes('iPad')) device = 'tablet'
  
  return { browser, os, device }
}

export function generateVisitorId(ip: string, userAgent: string): string {
  const data = `${ip}-${userAgent}`
  let hash = 0
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(36)
}
