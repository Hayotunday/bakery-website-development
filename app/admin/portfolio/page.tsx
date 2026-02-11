'use client'

import { useState } from 'react'
import { PortfolioHeader } from '@/components/admin/portfolio-header'
import { PortfolioGrid } from '@/components/admin/portfolio-grid'
import { PortfolioForm } from '@/components/admin/portfolio-form'

export default function PortfolioPage() {
  const [showForm, setShowForm] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
      <PortfolioHeader onAddClick={() => setShowForm(true)} viewMode={viewMode} onViewModeChange={setViewMode} />

      <div className="flex-1 overflow-hidden flex lg:flex-row flex-col">
        <PortfolioGrid viewMode={viewMode} />

        {/* Form Drawer */}
        {showForm && <PortfolioForm onClose={() => setShowForm(false)} />}
      </div>
    </div>
  )
}
