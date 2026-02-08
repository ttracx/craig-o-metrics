import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/metrics - Get all metrics for a user
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email')
  
  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  try {
    // Get or create user
    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: { email },
      })
    }

    // Get metrics with values
    const metrics = await prisma.metric.findMany({
      where: { userId: user.id },
      include: {
        values: {
          orderBy: { date: 'asc' },
        },
      },
      orderBy: { createdAt: 'asc' },
    })

    // Calculate current/previous values and growth
    const metricsWithStats = metrics.map((metric) => {
      const values = metric.values
      const currentValue = values.length > 0 ? values[values.length - 1].value : 0
      const previousValue = values.length > 1 ? values[values.length - 2].value : 0
      const growth = previousValue ? ((currentValue - previousValue) / previousValue) * 100 : 0

      return {
        ...metric,
        currentValue,
        previousValue,
        growth,
        values: values.map(v => ({
          ...v,
          date: v.date.toISOString().split('T')[0],
        })),
      }
    })

    return NextResponse.json({
      metrics: metricsWithStats,
      plan: user.subscriptionStatus || 'free',
    })
  } catch (error) {
    console.error('Failed to fetch metrics:', error)
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 })
  }
}

// POST /api/metrics - Create a new metric
export async function POST(request: NextRequest) {
  try {
    const { email, name, type, color } = await request.json()

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name required' }, { status: 400 })
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: { email },
      })
    }

    // Check metric limit for free users
    const metricsCount = await prisma.metric.count({
      where: { userId: user.id },
    })

    const maxMetrics = user.subscriptionStatus === 'pro' ? Infinity : 3
    if (metricsCount >= maxMetrics) {
      return NextResponse.json({ error: 'Metric limit reached. Upgrade to Pro.' }, { status: 403 })
    }

    // Create metric
    const metric = await prisma.metric.create({
      data: {
        userId: user.id,
        name,
        type: type || 'number',
        color: color || '#3B82F6',
      },
    })

    return NextResponse.json({ metric })
  } catch (error) {
    console.error('Failed to create metric:', error)
    return NextResponse.json({ error: 'Failed to create metric' }, { status: 500 })
  }
}

// DELETE /api/metrics - Delete a metric
export async function DELETE(request: NextRequest) {
  const metricId = request.nextUrl.searchParams.get('id')
  const email = request.nextUrl.searchParams.get('email')

  if (!metricId || !email) {
    return NextResponse.json({ error: 'Metric ID and email required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await prisma.metric.deleteMany({
      where: { id: metricId, userId: user.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete metric:', error)
    return NextResponse.json({ error: 'Failed to delete metric' }, { status: 500 })
  }
}
