"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Home,
  BarChart3,
  Mic,
  GitBranch,
  Layers,
  LineChart,
  Menu,
  Bird,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeSection: string
  onSectionChange: (section: string) => void
}

const navItems = [
  { id: "home", label: "Inicio", icon: Home },
  { id: "analysis", label: "Análisis Exploratorio", icon: BarChart3 },
  { id: "interaction", label: "Panel de Interacción", icon: Mic },
  { id: "pipeline", label: "Pipeline del Modelo", icon: GitBranch },
  { id: "applications", label: "Aplicaciones", icon: Layers },
  { id: "comparison", label: "Comparación de Modelos", icon: LineChart },
]

function NidoLogo({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-3 px-2">
      <div className="relative">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-orange">
          <Bird className="w-6 h-6 text-primary-foreground" />
        </div>
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-accent rounded-full animate-pulse" />
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-xl font-bold tracking-tight text-foreground">NIDO</span>
          <span className="text-[10px] text-muted-foreground leading-tight">Bioacústica Colombia</span>
        </div>
      )}
    </div>
  )
}

function NavItem({
  item,
  isActive,
  collapsed,
  onClick,
}: {
  item: (typeof navItems)[0]
  isActive: boolean
  collapsed?: boolean
  onClick: () => void
}) {
  const Icon = item.icon
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200 group",
        isActive
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 flex-shrink-0 transition-colors",
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        )}
      />
      {!collapsed && (
        <span className="text-sm font-medium truncate">{item.label}</span>
      )}
      {isActive && !collapsed && (
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
      )}
    </button>
  )
}

function DesktopSidebar({
  activeSection,
  onSectionChange,
  collapsed,
  setCollapsed,
}: {
  activeSection: string
  onSectionChange: (section: string) => void
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}) {
  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
        <NidoLogo collapsed={collapsed} />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="flex flex-col gap-1 px-3">
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              collapsed={collapsed}
              onClick={() => onSectionChange(item.id)}
            />
          ))}
        </nav>
      </ScrollArea>
      <div className={cn("p-4 border-t border-sidebar-border", collapsed && "px-2")}>
        <div
          className={cn(
            "rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 p-3 border border-primary/20",
            collapsed && "p-2"
          )}
        >
          {!collapsed ? (
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-primary rounded-full wave-bar"
                    style={{ height: `${12 + Math.random() * 8}px` }}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">Sistema Activo</span>
            </div>
          ) : (
            <div className="flex justify-center gap-0.5">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full wave-bar"
                  style={{ height: `${8 + Math.random() * 6}px` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

function MobileNav({
  activeSection,
  onSectionChange,
}: {
  activeSection: string
  onSectionChange: (section: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <header className="lg:hidden flex items-center justify-between h-16 px-4 bg-sidebar border-b border-sidebar-border sticky top-0 z-50">
      <NidoLogo />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-72 bg-sidebar border-sidebar-border p-0">
          <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
            <NidoLogo />
          </div>
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={() => {
                    onSectionChange(item.id)
                    setOpen(false)
                  }}
                />
              ))}
            </nav>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export function DashboardLayout({ children, activeSection, onSectionChange }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <DesktopSidebar
        activeSection={activeSection}
        onSectionChange={onSectionChange}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav activeSection={activeSection} onSectionChange={onSectionChange} />
        <main className="flex-1 overflow-auto">
          <div className="container max-w-7xl mx-auto p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
