"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { Topbar } from "@/components/dashboard/topbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  User,
  Bell,
  Shield,
  Database,
  Webhook,
  Mail,
  Key,
  Globe,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [highConfidenceThreshold, setHighConfidenceThreshold] = useState("90");

  return (
    <DashboardLayout>
      <Topbar
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="flex-1 overflow-auto p-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Profile Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Profile</CardTitle>
              </div>
              <CardDescription>
                Manage your account information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <Input
                    defaultValue="Admin User"
                    className="bg-input"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email
                  </label>
                  <Input
                    type="email"
                    defaultValue="admin@goflexxi.com"
                    className="bg-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Role
                </label>
                <Input
                  defaultValue="Administrator"
                  disabled
                  className="bg-secondary"
                />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Notifications</CardTitle>
              </div>
              <CardDescription>
                Configure how you receive updates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">
                      Email Notifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Receive daily digest and important alerts
                    </p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Webhook className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">
                      Slack Notifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Get real-time updates in Slack
                    </p>
                  </div>
                </div>
                <Switch
                  checked={slackNotifications}
                  onCheckedChange={setSlackNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Automation Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Automation</CardTitle>
              </div>
              <CardDescription>
                Configure automatic processing rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    Auto-approve high confidence
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Automatically approve opportunities above threshold
                  </p>
                </div>
                <Switch
                  checked={autoApprove}
                  onCheckedChange={setAutoApprove}
                />
              </div>
              {autoApprove && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Confidence Threshold (%)
                  </label>
                  <Input
                    type="number"
                    value={highConfidenceThreshold}
                    onChange={(e) => setHighConfidenceThreshold(e.target.value)}
                    min="0"
                    max="100"
                    className="w-32 bg-input"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* API Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">API Access</CardTitle>
              </div>
              <CardDescription>
                Manage API keys and webhooks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  API Key
                </label>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    defaultValue="sk_live_xxxxxxxxxxxxxxxxxxxx"
                    disabled
                    className="bg-secondary font-mono text-sm"
                  />
                  <Button variant="outline" className="border-border">
                    Regenerate
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Webhook URL
                </label>
                <Input
                  placeholder="https://your-app.com/webhook"
                  className="bg-input"
                />
              </div>
              <Button>Save API Settings</Button>
            </CardContent>
          </Card>

          {/* Data Settings */}
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg">Data Management</CardTitle>
              </div>
              <CardDescription>
                Export data and manage storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-secondary p-4">
                <div>
                  <p className="font-medium text-foreground">Export All Data</p>
                  <p className="text-sm text-muted-foreground">
                    Download all opportunities and reviews as CSV
                  </p>
                </div>
                <Button variant="outline" className="border-border">
                  <Globe className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-destructive/10 p-4">
                <div>
                  <p className="font-medium text-foreground">Delete All Data</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently remove all opportunities and reviews
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
