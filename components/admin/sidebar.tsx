'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutGrid, ImageIcon, UtensilsCrossed, ShoppingBag, Settings } from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const navigationItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutGrid },
    { label: 'Portfolio Gallery', href: '/admin/portfolio', icon: ImageIcon },
    { label: 'Menu Catalog', href: '/admin/menu', icon: UtensilsCrossed },
    { label: 'Order Requests', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Admin Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <aside className="w-72 bg-slate-900 text-white hidden lg:flex flex-col">
      {/* Logo Section */}
      <div className="p-8">
        <div className="flex flex-col items-start gap-4">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center p-2">
            <div className="text-2xl font-black">PW</div>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Perfect White</h1>
            <p className="text-[10px] uppercase tracking-widest text-slate-400">Cakes and Events</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-accent text-white shadow-lg shadow-accent/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-6 border-t border-slate-800">
        <div className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            MR
          </div>
          <div className="overflow-hidden text-left">
            <p className="text-sm font-bold truncate">Marcelle Roux</p>
            <p className="text-xs text-slate-400">Head Baker</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
