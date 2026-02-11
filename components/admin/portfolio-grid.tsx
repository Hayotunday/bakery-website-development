'use client'

import Image from 'next/image'
import { Edit2, Trash2 } from 'lucide-react'

interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  category: 'Signature' | 'Seasonal' | 'Wedding' | 'Pastry' | 'Savory'
  featured: boolean
}

const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Rustic Sourdough Boule',
    description: 'Slow-fermented for 48 hours using our 50-year-old heirloom starter.',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd13f5f?w=500&h=400&fit=crop',
    category: 'Signature',
    featured: true,
  },
  {
    id: '2',
    title: 'Almond Butter Croissant',
    description: '16 layers of flaky pastry filled with house-made Valencia almond cream.',
    image: 'https://images.unsplash.com/photo-1585080200992-193e30f8e319?w=500&h=400&fit=crop',
    category: 'Seasonal',
    featured: true,
  },
  {
    id: '3',
    title: 'Modern Minimalist Tier',
    description: 'Velvet vanilla bean sponge with organic raspberry reduction.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=400&fit=crop',
    category: 'Wedding',
    featured: true,
  },
]

const categoryColors: Record<string, string> = {
  Signature: 'bg-slate-900',
  Seasonal: 'bg-accent',
  Wedding: 'bg-slate-800',
  Pastry: 'bg-blue-600',
  Savory: 'bg-green-600',
}

interface PortfolioGridProps {
  viewMode: 'grid' | 'list'
}

export function PortfolioGrid({ viewMode }: PortfolioGridProps) {
  return (
    <section className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-lg font-bold text-slate-800">Active Showcase ({portfolioItems.length})</h3>
      </div>

      {viewMode === 'grid' ? (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100">
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={false}
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Category Badge */}
                <div className={`absolute top-4 left-4 ${categoryColors[item.category]} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full`}>
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="font-bold text-lg mb-1 text-slate-800">{item.title}</h4>
                <p className="text-sm text-slate-500 line-clamp-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // List View
        <div className="space-y-4">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-slate-100 p-4 flex gap-4 items-center">
              <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="128px"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  priority={false}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-lg text-slate-800">{item.title}</h4>
                    <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                  </div>
                  <div className={`${categoryColors[item.category]} text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap ml-4`}>
                    {item.category}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-accent hover:text-white transition-all">
                  <Edit2 className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-slate-100 text-accent hover:bg-accent hover:text-white transition-all">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
