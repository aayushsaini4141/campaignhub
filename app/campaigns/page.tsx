'use client';

import { useEffect, useState } from 'react';
import { Plus, Mail, MessageSquare, Eye, Trash2, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { supabase, Campaign } from '@/lib/supabase';
import { toast } from 'sonner';
import { CreateCampaignForm } from '@/components/create-campaign-form';
import { format } from 'date-fns';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('campaigns').delete().eq('id', id);

    if (!error) {
      toast.success('Campaign deleted successfully');
      fetchCampaigns();
    } else {
      toast.error('Failed to delete campaign');
    }
  };

  const getStatusColor = (status: Campaign['status']) => {
    const colors = {
      draft: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
      active: 'bg-green-100 text-green-700 hover:bg-green-200',
      paused: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
      completed: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    };
    return colors[status];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-700 bg-clip-text text-transparent  flex justify-center md:justify-start">
            Campaigns
          </h1>
          <p className="text-slate-600 mt-1">Manage your outreach campaigns</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <CreateCampaignForm
              onSuccess={() => {
                setIsCreateOpen(false);
                fetchCampaigns();
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Card
        className="border-0 shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
        style={{ animationDelay: '200ms' }}
      >
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="font-semibold">Campaign</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold text-right">Sent</TableHead>
                  <TableHead className="font-semibold text-right">Replies</TableHead>
                  <TableHead className="font-semibold text-right">Meetings</TableHead>
                  <TableHead className="font-semibold">Created</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.map((campaign, index) => (
                  <TableRow
                    key={campaign.id}
                    className="hover:bg-slate-50 transition-colors animate-in fade-in-0 slide-in-from-left-4"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            campaign.type === 'email'
                              ? 'bg-blue-100'
                              : 'bg-green-100'
                          }`}
                        >
                          {campaign.type === 'email' ? (
                            <Mail className="w-4 h-4 text-blue-600" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-green-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {campaign.description.length > 50
                              ? campaign.description.substring(0, 50) + '...'
                              : campaign.description}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(campaign.status)}>
                        {campaign.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {campaign.emails_sent.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {campaign.replies.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {campaign.meetings_booked}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {format(new Date(campaign.created_at), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(campaign.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {campaigns.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                No campaigns yet
              </h3>
              <p className="text-slate-500 mb-4">
                Get started by creating your first campaign
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
