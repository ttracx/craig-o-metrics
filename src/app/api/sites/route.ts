import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const sites = await prisma.site.findMany({
      where: { userId },
      include: {
        _count: {
          select: {
            pageViews: true,
            events: true
          }
        }
      }
    })

    return NextResponse.json(sites)
  } catch (error) {
    console.error('Sites fetch error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, domain, userId } = body

    if (!name || !domain || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const site = await prisma.site.create({
      data: {
        name,
        domain,
        userId
      }
    })

    return NextResponse.json(site)
  } catch (error) {
    console.error('Site creation error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
