'use client'

import { useState, useEffect } from 'react'
import { Eye, Users, Clock, TrendingDown, BarChart3, Settings, LogOut } from 'lucide-react'
import { StatCard } from '@/components/ui/stat-card'
import { PageViewsChart } from '@/components/charts/page-views-chart'
import { ReferrersChart } from '@/components/charts/referrers-chart'
import { DevicesChart } from '@/components/charts/devices-chart'
import { GeoChart } from '@/components/charts/geo-chart'
import { RetentionChart } from '@/components/charts/retention-chart'
import { EventsTable } from '@/components/charts/events-table'
import { PagesTable } from '@/components/charts/pages-table'
import { RealTimeWidget } from '@/components/dashboard/real-time-widget'
import { ExportButton } from '@/components/dashboard/export-button'
import { DateRangePicker } from '@/components/dashboard/date-range-picker'
import Link from 'next/link'

interface AnalyticsData {
  overview: {
    totalPageViews: number
    uniqueVisitors: number
    totalEvents: number
    avgSessionDuration: string
    bounceRate: number
  }
  chartData: Array<{ date: string; pageViews: number; visitors: number }>
  topPages: Array<{ path: string; views: number; uniqueVisitors: number; avgTime: string }>
  referrers: Array<{ source: string; visits: number }>
  devices: Array<{ name: string; value: number }>
  countries: Array<{ country: string; visits: number; percentage: number }>
  events: Array<{ name: string; count: number; lastTriggered: string }>
  retention: Array<{ cohort: string; week0: number; week1: number; week2: number; week3: number; week4: number }>
}

export default function Dashboard() {
  const [dateRange, setDateRange] = useState('7d')
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const response = await fetch(`/api/analytics?range=${dateRange}`)
        const json = await response.json()
        setData(json)
      } catch (error) {
        console.error('Failed to fetch analytics:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [dateRange])

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 p-6">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">Craig-O-Metrics</span>
        </Link>
        
        <nav className="space-y-1">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium">
            <BarChart3 className="w-5 h-5" />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Users className="w-5 h-5" />
            Visitors
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Eye className="w-5 h-5" />
            Pages
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
            <Settings className="w-5 h-5" />
            Settings
          </a>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="p-4 bg-gray-50 rounded-lg mb-4">
            <p className="text-sm font-medium text-gray-900">Pro Plan</p>
            <p className="text-xs text-gray-500">Unlimited pageviews</p>
          </div>
          <a href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <LogOut className="w-4 h-4" />
            Sign Out
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-500">Track your website performance</p>
          </div>
          <div className="flex items-center gap-4">
            <DateRangePicker value={dateRange} onChange={setDateRange} />
            <ExportButton dateRange={dateRange} />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard 
            title="Page Views" 
            value={data.overview.totalPageViews} 
            change={12}
            icon={Eye}
            color="blue"
          />
          <StatCard 
            title="Unique Visitors" 
            value={data.overview.uniqueVisitors}
            change={8}
            icon={Users}
            color="green"
          />
          <StatCard 
            title="Avg. Duration" 
            value={data.overview.avgSessionDuration}
            change={5}
            icon={Clock}
            color="purple"
          />
          <StatCard 
            title="Bounce Rate" 
            value={`${data.overview.bounceRate}%`}
            change={-3}
            icon={TrendingDown}
            color="orange"
          />
        </div>

        {/* Real-time + Chart */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2">
            <PageViewsChart data={data.chartData} />
          </div>
          <RealTimeWidget />
        </div>

        {/* Tables Row */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <PagesTable data={data.topPages} />
          <EventsTable data={data.events} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <ReferrersChart data={data.referrers} />
          <DevicesChart data={data.devices} />
          <GeoChart data={data.countries} />
        </div>

        {/* Retention */}
        <RetentionChart data={data.retention} />
      </main>
    </div>
  )
}
