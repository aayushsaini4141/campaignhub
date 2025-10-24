'use client';

import { useEffect, useState } from 'react';
import { BarChart3, Mail, MessageSquare, Calendar, TrendingUp } from 'lucide-react';
import { StatCard } from '@/components/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase, Campaign } from '@/lib/supabase';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function Dashboard() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });

    if (data && !error) {
      setCampaigns(data);
    }
    setLoading(false);
  };

  const activeCampaigns = campaigns.filter((c) => c.status === 'active').length;
  const totalEmailsSent = campaigns.reduce((sum, c) => sum + c.emails_sent, 0);
  const totalReplies = campaigns.reduce((sum, c) => sum + c.replies, 0);
  const totalMeetings = campaigns.reduce((sum, c) => sum + c.meetings_booked, 0);

  const chartData = campaigns.slice(0, 5).map((campaign) => ({
    name: campaign.name.length > 15 ? campaign.name.substring(0, 15) + '...' : campaign.name,
    sent: campaign.emails_sent,
    replies: campaign.replies,
    meetings: campaign.meetings_booked,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="space-y-2 animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-700 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-slate-600">Welcome back! Here's your campaign overview.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Active Campaigns"
          value={activeCampaigns}
          icon={TrendingUp}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          trend={{ value: '12%', isPositive: true }}
          delay={100}
        />
        <StatCard
          title="Emails Sent"
          value={totalEmailsSent.toLocaleString()}
          icon={Mail}
          gradient="bg-gradient-to-br from-green-500 to-emerald-600"
          trend={{ value: '8%', isPositive: true }}
          delay={200}
        />
        <StatCard
          title="Replies"
          value={totalReplies.toLocaleString()}
          icon={MessageSquare}
          gradient="bg-gradient-to-br from-orange-500 to-amber-600"
          trend={{ value: '5%', isPositive: false }}
          delay={300}
        />
        <StatCard
          title="Meetings Booked"
          value={totalMeetings}
          icon={Calendar}
          gradient="bg-gradient-to-br from-purple-500 to-pink-600"
          trend={{ value: '15%', isPositive: true }}
          delay={400}
        />
      </div>

      <Card
        className="border-0 shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
        style={{ animationDelay: '500ms' }}
      >
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <CardTitle>Campaign Performance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
              <Legend />
              <Bar dataKey="sent" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Emails Sent" />
              <Bar dataKey="replies" fill="#10b981" radius={[8, 8, 0, 0]} name="Replies" />
              <Bar dataKey="meetings" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Meetings" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
