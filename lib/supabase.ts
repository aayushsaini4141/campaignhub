import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Campaign = {
  id: string;
  name: string;
  type: 'email' | 'whatsapp';
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  emails_sent: number;
  replies: number;
  meetings_booked: number;
  created_at: string;
  updated_at: string;
};
