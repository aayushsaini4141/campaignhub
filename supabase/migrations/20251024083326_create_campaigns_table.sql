/*
  # Campaign Management Schema

  ## Overview
  Creates the core campaigns table for storing email and WhatsApp campaign data.

  ## New Tables
  
  ### campaigns
  - `id` (uuid, primary key) - Unique identifier for each campaign
  - `name` (text, required) - Name of the campaign
  - `type` (text, required) - Campaign type: 'email' or 'whatsapp'
  - `description` (text, optional) - Detailed description of the campaign
  - `status` (text, required) - Current status: 'draft', 'active', 'paused', 'completed'
  - `emails_sent` (integer, default 0) - Count of emails sent
  - `replies` (integer, default 0) - Count of replies received
  - `meetings_booked` (integer, default 0) - Count of meetings booked
  - `created_at` (timestamptz) - Timestamp when campaign was created
  - `updated_at` (timestamptz) - Timestamp when campaign was last updated

  ## Security
  - Enable RLS on campaigns table
  - Add policies for public access (simplified for demo purposes)
  
  ## Notes
  1. Using default values for counters to simplify data initialization
  2. Status field uses check constraint to ensure valid values
  3. Type field uses check constraint to ensure valid campaign types
*/

-- Create campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('email', 'whatsapp')),
  description text DEFAULT '',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'paused', 'completed')),
  emails_sent integer DEFAULT 0 CHECK (emails_sent >= 0),
  replies integer DEFAULT 0 CHECK (replies >= 0),
  meetings_booked integer DEFAULT 0 CHECK (meetings_booked >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (simplified for demo)
CREATE POLICY "Allow public read access to campaigns"
  ON campaigns
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow public insert access to campaigns"
  ON campaigns
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public update access to campaigns"
  ON campaigns
  FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to campaigns"
  ON campaigns
  FOR DELETE
  TO anon
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to auto-update updated_at
CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for demo
INSERT INTO campaigns (name, type, description, status, emails_sent, replies, meetings_booked)
VALUES 
  ('Summer Product Launch', 'email', 'Introducing our new product line to existing customers', 'active', 1240, 89, 12),
  ('Q4 Follow-up Campaign', 'email', 'Follow up with leads from Q3', 'active', 856, 45, 8),
  ('WhatsApp Outreach', 'whatsapp', 'Personal outreach to high-value prospects', 'paused', 320, 67, 15),
  ('Newsletter Subscribers', 'email', 'Monthly newsletter to subscriber base', 'completed', 2100, 142, 3),
  ('Holiday Special Offer', 'email', 'Special discount campaign for holidays', 'draft', 0, 0, 0);
