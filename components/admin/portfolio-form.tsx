'use client'

import { useState } from 'react'
import { X, ImagePlus } from 'lucide-react'

interface PortfolioFormProps {
  onClose: () => void
}

export function PortfolioForm({ onClose }: PortfolioFormProps) {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Signature Collection')
  const [description, setDescription] = useState('')
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      onClose()
    }, 1500)
  }

  return (
    <section className="w-full lg:w-[450px] border-l border-slate-100 bg-white flex flex-col shadow-2xl fixed right-0 top-0 bottom-0 z-40 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
        <h3 className="text-xl font-bold text-slate-900">New Portfolio Entry</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Image Upload */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Main Photography</label>
          <div className="relative group">
            <div className="w-full aspect-[4/3] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-6 bg-slate-50 hover:bg-slate-100 hover:border-accent transition-all cursor-pointer group-hover:scale-[1.02]">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ImagePlus className="w-8 h-8 text-accent" />
              </div>
              <p className="font-bold text-slate-700">Upload high-res image</p>
              <p className="text-xs text-slate-400 mt-2">Recommended: 1200 x 900px (JPG or PNG)</p>
            </div>
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label htmlFor="title" className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
            Creation Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Lavender & Honey Macarons"
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
          />
        </div>

        {/* Category Dropdown */}
        <div className="space-y-2">
          <label htmlFor="category" className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
            Category
          </label>
          <div className="relative">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl appearance-none focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none"
            >
              <option>Signature Collection</option>
              <option>Seasonal Special</option>
              <option>Wedding & Events</option>
              <option>Pastry Series</option>
              <option>Savory Selections</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Description Textarea */}
        <div className="space-y-2">
          <label htmlFor="description" className="block text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
            Story & Details
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the ingredients, the process, and what makes this creation unique..."
            rows={5}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-accent transition-all outline-none resize-none"
          />
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            className="w-5 h-5 rounded border-slate-300 text-accent focus:ring-accent cursor-pointer"
          />
          <label htmlFor="featured" className="text-sm font-medium text-slate-600 cursor-pointer">
            Featured in Homepage
          </label>
        </div>
      </form>

      {/* Footer Buttons */}
      <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4 shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 py-4 border border-slate-200 rounded-xl font-bold text-slate-500 hover:bg-white hover:border-slate-300 transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-4 bg-accent text-white rounded-xl font-bold hover:shadow-lg hover:shadow-accent/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Creation'}
        </button>
      </div>
    </section>
  )
}
