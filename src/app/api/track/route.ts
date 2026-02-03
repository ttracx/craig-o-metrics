import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { parseUserAgent, generateVisitorId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey, type, data } = body

    // Get client info
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown'
    const userAgent = request.headers.get('user-agent') || ''
    
    // Verify site exists
    const site = await prisma.site.findUnique({
      where: { apiKey }
    })

    if (!site) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
    }

    const visitorId = generateVisitorId(ip, userAgent)
    const { browser, os, device } = parseUserAgent(userAgent)

    if (type === 'pageview') {
      await prisma.pageView.create({
        data: {
          siteId: site.id,
          path: data.path || '/',
          referrer: data.referrer,
          userAgent,
          country: data.country || 'Unknown',
          region: data.region,
          city: data.city,
          browser,
          os,
          device,
          sessionId: data.sessionId,
          visitorId,
        }
      })
    } else if (type === 'event') {
      await prisma.event.create({
        data: {
          siteId: site.id,
          name: data.name,
          properties: data.properties,
          visitorId,
          sessionId: data.sessionId,
          path: data.path,
        }
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Tracking error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// Handle CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
