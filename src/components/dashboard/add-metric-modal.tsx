'use client'

import { useState } from 'react'
import { X, DollarSign, Percent, Hash } from 'lucide-react'

interface AddMetricModalProps {
  onClose: () => void
  onAdd: (metric: { name: string; type: string; color: string }) => void
}

const COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#06B6D4', // Cyan
  '#F97316', // Orange
]

const PRESETS = [
  { name: 'Monthly Recurring Revenue', type: 'currency', icon: DollarSign },
  { name: 'Annual Recurring Revenue', type: 'currency', icon: DollarSign },
  { name: 'Active Customers', type: 'number', icon: Hash },
  { name: 'Churn Rate', type: 'percentage', icon: Percent },
  { name: 'Customer Acquisition Cost', type: 'currency', icon: DollarSign },
  { name: 'Lifetime Value', type: 'currency', icon: DollarSign },
  { name: 'Conversion Rate', type: 'percentage', icon: Percent },
  { name: 'Net Promoter Score', type: 'number', icon: Hash },
]

export function AddMetricModal({ onClose, onAdd }: AddMetricModalProps) {
  const [name, setName] = useState('')
  const [type, setType] = useState('number')
  const [color, setColor] = useState(COLORS[0])
  const [showCustom, setShowCustom] = useState(false)

  const handlePresetClick = (preset: typeof PRESETS[number]) => {
    onAdd({ 
      name: preset.name, 
      type: preset.type, 
      color: COLORS[Math.floor(Math.random() * COLORS.length)] 
    })
  }

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onAdd({ name: name.trim(), type, color })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a1a1a] rounded-xl w-full max-w-lg border border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-xl font-semibold">Add Metric</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          {!showCustom ? (
            <>
              <p className="text-sm text-gray-400 mb-4">Choose a preset or create custom</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {PRESETS.map((preset) => {
                  const Icon = preset.icon
                  return (
                    <button
                      key={preset.name}
                      onClick={() => handlePresetClick(preset)}
                      className="flex items-center gap-2 p-3 bg-[#0a0a0a] border border-gray-800 rounded-lg hover:border-blue-500 hover:bg-blue-500/5 transition-all text-left"
                    >
                      <Icon className="w-4 h-4 text-gray-400" />
                      <span className="text-sm truncate">{preset.name}</span>
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => setShowCustom(true)}
                className="w-full p-3 border border-dashed border-gray-700 rounded-lg hover:border-blue-500 text-gray-400 hover:text-blue-400 transition-all"
              >
                + Create Custom Metric
              </button>
            </>
          ) : (
            <form onSubmit={handleCustomSubmit}>
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Metric Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Monthly Active Users"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'number', label: 'Number', icon: Hash },
                    { value: 'currency', label: 'Currency', icon: DollarSign },
                    { value: 'percentage', label: 'Percentage', icon: Percent },
                  ].map((t) => {
                    const Icon = t.icon
                    return (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setType(t.value)}
                        className={`flex items-center justify-center gap-2 p-3 rounded-lg border transition-all ${
                          type === t.value
                            ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm">{t.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Color</label>
                <div className="flex gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded-lg transition-all ${
                        color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-[#1a1a1a]' : ''
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCustom(false)}
                  className="flex-1 px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
                >
                  Add Metric
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
