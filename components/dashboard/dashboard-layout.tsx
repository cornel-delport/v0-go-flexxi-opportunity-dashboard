'use client';

import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar"; // I will create this component next

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <Topbar title="Dashboard" />
        {children}
      </main>
    </div>
  );
}
