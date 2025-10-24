'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const formSchema = z.object({
  name: z.string().min(3, 'Campaign name must be at least 3 characters'),
  type: z.enum(['email', 'whatsapp'], {
    required_error: 'Please select a campaign type',
  }),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.enum(['draft', 'active', 'paused', 'completed']).default('draft'),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateCampaignFormProps {
  onSuccess: () => void;
}

export function CreateCampaignForm({ onSuccess }: CreateCampaignFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: 'email',
      description: '',
      status: 'draft',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    const { error } = await supabase.from('campaigns').insert([
      {
        name: values.name,
        type: values.type,
        description: values.description,
        status: values.status,
        emails_sent: 0,
        replies: 0,
        meetings_booked: 0,
      },
    ]);

    if (!error) {
      toast.success('Campaign created successfully!', {
        description: `${values.name} has been added to your campaigns.`,
      });
      form.reset();
      onSuccess();
    } else {
      toast.error('Failed to create campaign', {
        description: 'Please try again or contact support.',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-blue-800 bg-clip-text text-transparent">
          Create New Campaign
        </h2>
        <p className="text-slate-600">
          Fill in the details below to create a new outreach campaign
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Summer Product Launch"
                    {...field}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormDescription>
                  A clear, descriptive name for your campaign
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Campaign Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="email" id="email" className="sr-only peer" />
                      </FormControl>
                      <FormLabel
                        htmlFor="email"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-200 bg-white p-6 hover:bg-slate-50 peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 cursor-pointer transition-all duration-200"
                      >
                        <Mail className="w-8 h-8 mb-3 text-blue-500" />
                        <span className="font-semibold">Email</span>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormControl>
                        <RadioGroupItem value="whatsapp" id="whatsapp" className="sr-only peer" />
                      </FormControl>
                      <FormLabel
                        htmlFor="whatsapp"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-slate-200 bg-white p-6 hover:bg-slate-50 peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 cursor-pointer transition-all duration-200"
                      >
                        <MessageSquare className="w-8 h-8 mb-3 text-green-500" />
                        <span className="font-semibold">WhatsApp</span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="paused">Paused</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The current status of your campaign
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe the purpose and goals of this campaign..."
                    className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide details about the campaign objectives
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create Campaign
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
