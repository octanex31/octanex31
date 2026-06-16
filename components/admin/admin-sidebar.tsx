'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hexagon,
  LayoutDashboard,
  Users,
  CalendarCheck,
  MessageSquare,
  Settings,
  Briefcase,
  CreditCard,
  Star,
  FileText,
  BookOpen,
  Image,
  BarChart3,
  LogOut,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: '/admin/leads', label: 'Leads', icon: <Users className="h-4 w-4" /> },
  { href: '/admin/demo-bookings', label: 'Demo Bookings', icon: <CalendarCheck className="h-4 w-4" /> },
  { href: '/admin/feedback', label: 'Feedback', icon: <MessageSquare className="h-4 w-4" /> },
  { href: '/admin/services', label: 'Services', icon: <Briefcase className="h-4 w-4" /> },
  { href: '/admin/portfolio', label: 'Portfolio', icon: <Image className="h-4 w-4" /> },
  { href: '/admin/pricing', label: 'Pricing', icon: <CreditCard className="h-4 w-4" /> },
  { href: '/admin/testimonials', label: 'Testimonials', icon: <Star className="h-4 w-4" /> },
  { href: '/admin/blog', label: 'Blog', icon: <FileText className="h-4 w-4" /> },
  { href: '/admin/case-studies', label: 'Case Studies', icon: <BookOpen className="h-4 w-4" /> },
  { href: '/admin/media', label: 'Media', icon: <Image className="h-4 w-4" /> },
  { href: '/admin/settings', label: 'Site Settings', icon: <Settings className="h-4 w-4" /> },
  { href: '/admin/analytics', label: 'Analytics', icon: <BarChart3 className="h-4 w-4" /> },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

function AdminSidebar({
  collapsed = false,
  onToggle,
  mobileOpen = false,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const sidebarContent = (
    <div
      className={cn(
        'flex h-full flex-col',
        collapsed ? 'w-[68px]' : 'w-60',
      )}
    >
      <div className="flex h-16 items-center border-b border-glass-border px-4">
        <Link
          href="/admin"
          className={cn(
            'flex items-center gap-2.5',
            collapsed && 'justify-center',
          )}
        >
          <Hexagon className="h-7 w-7 flex-shrink-0 text-electric-violet" />
          {!collapsed && (
            <span className="text-sm font-bold bg-gradient-to-r from-electric-violet to-cyan bg-clip-text text-transparent">
              OctaNex31
            </span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="ml-auto hidden rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-text-primary lg:block"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
        <button
          onClick={onMobileClose}
          className="ml-auto rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-text-primary lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === '/admin/dashboard'
                ? pathname === '/admin/dashboard' || pathname === '/admin'
                : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onMobileClose}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-electric-violet/10 text-electric-violet'
                      : 'text-text-secondary hover:bg-white/5 hover:text-text-primary',
                    collapsed && 'justify-center px-0',
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {item.icon}
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-glass-border p-3">
        <button
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/10',
            collapsed && 'justify-center px-0',
          )}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className={cn(
          'hidden h-screen flex-shrink-0 border-r border-glass-border bg-bg-secondary lg:block',
          collapsed ? 'w-[68px]' : 'w-60',
        )}
      >
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative h-full w-60 border-r border-glass-border bg-bg-secondary"
            >
              {sidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export { AdminSidebar, navItems };
