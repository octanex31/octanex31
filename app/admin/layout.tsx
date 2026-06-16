'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { cn } from '@/lib/utils';

const publicAdminRoutes = ['/admin/login'];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const checkAuth = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session && !publicAdminRoutes.includes(pathname)) {
      router.replace('/admin/login');
    } else {
      setIsAuthenticated(!!session);
    }
  }, [pathname, router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (!session && !publicAdminRoutes.includes(pathname)) {
        router.replace('/admin/login');
      }
    });
    return () => subscription?.unsubscribe();
  }, [pathname, router]);

  if (publicAdminRoutes.includes(pathname)) {
    return <>{children}</>;
  }

  if (isAuthenticated === null) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-bg-primary">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-electric-violet border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-bg-primary">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader
          title=""
          onMenuToggle={() => setMobileSidebarOpen(true)}
        />

        <main
          className={cn(
            'flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8',
            'bg-bg-primary',
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
