import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/sidebar';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CampaignHub - Outreach Platform',
  description: 'Manage your email and WhatsApp campaigns',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar />
          <main className="flex-1 lg:ml-64">
            {children}
          </main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
