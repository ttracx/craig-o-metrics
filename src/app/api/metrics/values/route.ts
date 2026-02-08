import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/metrics/values - Add a value to a metric
export async function POST(request: NextRequest) {
  try {
    const { email, metricId, value, date, notes } = await request.json()

    if (!email || !metricId || value === undefined || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Verify metric belongs to user
    const metric = await prisma.metric.findFirst({
      where: { id: metricId, userId: user.id },
    })

    if (!metric) {
      return NextResponse.json({ error: 'Metric not found' }, { status: 404 })
    }

    // Upsert value (update if date exists, create otherwise)
    const metricValue = await prisma.metricValue.upsert({
      where: {
        metricId_date: {
          metricId,
          date: new Date(date),
        },
      },
      create: {
        metricId,
        userId: user.id,
        value: parseFloat(value),
        date: new Date(date),
        notes,
      },
      update: {
        value: parseFloat(value),
        notes,
      },
    })

    return NextResponse.json({ value: metricValue })
  } catch (error) {
    console.error('Failed to add value:', error)
    return NextResponse.json({ error: 'Failed to add value' }, { status: 500 })
  }
}

// DELETE /api/metrics/values - Delete a value
export async function DELETE(request: NextRequest) {
  const valueId = request.nextUrl.searchParams.get('id')
  const email = request.nextUrl.searchParams.get('email')

  if (!valueId || !email) {
    return NextResponse.json({ error: 'Value ID and email required' }, { status: 400 })
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    await prisma.metricValue.deleteMany({
      where: { id: valueId, userId: user.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete value:', error)
    return NextResponse.json({ error: 'Failed to delete value' }, { status: 500 })
  }
}
