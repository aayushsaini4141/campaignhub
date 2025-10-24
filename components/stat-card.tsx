'use client';

import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  gradient: string;
  delay?: number;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  gradient,
  delay = 0,
}: StatCardProps) {
  return (
    <Card
      className={cn(
        'border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1',
        'animate-in fade-in-0 slide-in-from-bottom-4'
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={cn(
              'p-3 rounded-xl shadow-lg',
              gradient
            )}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div
              className={cn(
                'px-2 py-1 rounded-full text-xs font-semibold',
                trend.isPositive
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </div>
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
