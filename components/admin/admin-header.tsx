'use client';

import { Bell, Menu, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminHeaderProps {
  title: string;
  onMenuToggle: () => void;
  userEmail?: string;
  userName?: string;
}

function AdminHeader({
  title,
  onMenuToggle,
  userEmail = 'admin@octanex31.com',
  userName = 'Admin',
}: AdminHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-glass-border bg-bg-secondary px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange" />
        </button>

        <div className="flex items-center gap-2.5 rounded-xl bg-glass-bg border border-glass-border px-3 py-1.5 backdrop-blur-xl">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-electric-violet/20 text-xs font-bold text-electric-violet">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-text-primary">{userName}</p>
            <p className="text-[10px] text-text-secondary">{userEmail}</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-text-secondary" />
        </div>
      </div>
    </header>
  );
}

export { AdminHeader };
