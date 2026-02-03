import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getDateRange } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const siteId = searchParams.get('siteId')
    const range = searchParams.get('range') || '7d'
    const format = searchParams.get('format') || 'csv'

    const { start, end } = getDateRange(range)

    let data
    if (siteId) {
      const pageViews = await prisma.pageView.findMany({
        where: {
          siteId,
          timestamp: { gte: start, lte: end }
        },
        orderBy: { timestamp: 'desc' }
      })

      const events = await prisma.event.findMany({
        where: {
          siteId,
          timestamp: { gte: start, lte: end }
        },
        orderBy: { timestamp: 'desc' }
      })

      data = { pageViews, events }
    } else {
      // Sample data for demo
      data = getSampleExportData()
    }

    if (format === 'json') {
      return new NextResponse(JSON.stringify(data, null, 2), {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="analytics-${range}.json"`,
        },
      })
    }

    // CSV format
    const csvContent = convertToCSV(data)
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="analytics-${range}.csv"`,
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json({ error: 'Export failed' }, { status: 500 })
  }
}

function convertToCSV(data: { pageViews: Array<Record<string, unknown>>; events: Array<Record<string, unknown>> }): string {
  const lines: string[] = []
  
  // Page views section
  lines.push('=== PAGE VIEWS ===')
  if (data.pageViews.length > 0) {
    const headers = Object.keys(data.pageViews[0])
    lines.push(headers.join(','))
    data.pageViews.forEach(row => {
      lines.push(headers.map(h => `"${row[h] || ''}"`).join(','))
    })
  }
  
  lines.push('')
  lines.push('=== EVENTS ===')
  if (data.events.length > 0) {
    const headers = Object.keys(data.events[0])
    lines.push(headers.join(','))
    data.events.forEach(row => {
      lines.push(headers.map(h => `"${row[h] || ''}"`).join(','))
    })
  }
  
  return lines.join('\n')
}

function getSampleExportData() {
  const pageViews = []
  const events = []
  
  for (let i = 0; i < 100; i++) {
    const date = new Date()
    date.setHours(date.getHours() - Math.floor(Math.random() * 168))
    
    pageViews.push({
      id: `pv-${i}`,
      path: ['/', '/pricing', '/features', '/docs', '/blog'][Math.floor(Math.random() * 5)],
      referrer: ['google.com', 'twitter.com', 'direct', 'github.com'][Math.floor(Math.random() * 4)],
      country: ['United States', 'United Kingdom', 'Germany', 'France'][Math.floor(Math.random() * 4)],
      device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)],
      browser: ['Chrome', 'Firefox', 'Safari', 'Edge'][Math.floor(Math.random() * 4)],
      timestamp: date.toISOString()
    })
  }
  
  for (let i = 0; i < 50; i++) {
    const date = new Date()
    date.setHours(date.getHours() - Math.floor(Math.random() * 168))
    
    events.push({
      id: `ev-${i}`,
      name: ['signup_click', 'pricing_view', 'demo_request', 'download_started'][Math.floor(Math.random() * 4)],
      path: ['/', '/pricing', '/features'][Math.floor(Math.random() * 3)],
      timestamp: date.toISOString()
    })
  }
  
  return { pageViews, events }
}
