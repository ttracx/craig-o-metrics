'use client'

import { useState } from 'react'
import { Download, Loader2 } from 'lucide-react'

interface ExportButtonProps {
  siteId?: string
  dateRange: string
}

export function ExportButton({ siteId, dateRange }: ExportButtonProps) {
  const [loading, setLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleExport = async (format: 'csv' | 'json') => {
    setLoading(true)
    setShowDropdown(false)
    
    try {
      const response = await fetch(`/api/export?siteId=${siteId}&range=${dateRange}&format=${format}`)
      const blob = await response.blob()
      
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-${dateRange}.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        Export
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
          <button
            onClick={() => handleExport('csv')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Export as CSV
          </button>
          <button
            onClick={() => handleExport('json')}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Export as JSON
          </button>
        </div>
      )}
    </div>
  )
}
