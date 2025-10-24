'use client';

import { Settings as SettingsIcon, User, Bell, Shield, Palette } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div className="space-y-2 animate-in fade-in-0 slide-in-from-top-4 duration-500">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-cyan-700 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-slate-600">Manage your account and preferences</p>
      </div>

      <div className="grid gap-6 max-w-4xl">
        <Card
          className="border-0 shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: '100ms' }}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card
          className="border-0 shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: '200ms' }}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500">
                <Bell className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Configure how you receive updates</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-slate-500">Receive campaign updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-slate-500">Get real-time alerts in your browser</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Reports</Label>
                <p className="text-sm text-slate-500">Receive weekly performance summaries</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card
          className="border-0 shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: '300ms' }}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
            <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
              Update Password
            </Button>
          </CardContent>
        </Card>

        <Card
          className="border-0 shadow-lg animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: '400ms' }}
        >
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize your interface</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-slate-500">Switch to dark theme</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact View</Label>
                <p className="text-sm text-slate-500">Reduce spacing for more content</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
