import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import {
  User,
  Shield,
  Bell,
  Lock,
  Laptop,
  Database,
  Palette,
  Trash2,
  CheckCircle2,
  Download,
} from "lucide-react";

export const SettingsHubPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "general" | "security" | "notifications" | "privacy" | "sessions" | "data" | "appearance" | "delete"
  >("general");

  const tabs = [
    { id: "general", label: "General & Account", icon: User },
    { id: "security", label: "Security & Passwords", icon: Shield },
    { id: "notifications", label: "Notification Channels", icon: Bell },
    { id: "privacy", label: "Privacy & Data Visibility", icon: Lock },
    { id: "sessions", label: "Active Sessions", icon: Laptop },
    { id: "data", label: "Data Export & Import", icon: Database },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "delete", label: "Delete Account", icon: Trash2, danger: true },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Platform Settings"
        subtitle="Manage your authentication credentials, session security, privacy controls, and preferences."
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                  isActive
                    ? tab.danger
                      ? "bg-rose-50 text-rose-700 font-semibold"
                      : "bg-blue-50 text-blue-700 font-semibold"
                    : tab.danger
                    ? "text-rose-600 hover:bg-rose-50/60"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? tab.danger
                        ? "text-rose-600"
                        : "text-blue-600"
                      : tab.danger
                      ? "text-rose-500"
                      : "text-slate-400"
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panel */}
        <div className="md:col-span-3">
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Account Email
                    </label>
                    <Input defaultValue="candidate@example.com" disabled />
                    <span className="text-[11px] text-slate-400">Used for platform login and security notices.</span>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Timezone
                    </label>
                    <Input defaultValue="America/Los_Angeles (PST)" />
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="primary">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security & Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-w-md space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Current Password
                    </label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      New Password
                    </label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Confirm New Password
                    </label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="primary">Update Password</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                  <div>
                    <span className="font-semibold text-sm text-slate-900 block">In-App Notifications</span>
                    <span className="text-xs text-slate-500">Receive in-platform alerts for interview reminders and deadlines.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                </label>

                <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200">
                  <div>
                    <span className="font-semibold text-sm text-slate-900 block">Email Digest & Alerts</span>
                    <span className="text-xs text-slate-500">Send daily follow-up reminders and weekly pipeline summaries.</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                </label>
              </CardContent>
            </Card>
          )}

          {activeTab === "privacy" && (
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data Protection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-slate-700">
                <p>
                  Career OS isolates all candidate resumes, cover letters, notes, and company contacts in private, tenant-scoped storage.
                </p>
                <p>
                  No external analytics trackers or third-party ad networks have access to your job search data.
                </p>
              </CardContent>
            </Card>
          )}

          {activeTab === "sessions" && (
            <Card>
              <CardHeader>
                <CardTitle>Active User Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-sm">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">Chrome on Windows</span>
                      <Badge variant="success">Current Session</Badge>
                    </div>
                    <span className="text-xs text-slate-500">IP: 127.0.0.1 • Started today</span>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    Active
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "data" && (
            <Card>
              <CardHeader>
                <CardTitle>Data Export</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600">
                  Export your complete application timeline, contacts, interview notes, and profile records in standard JSON or CSV format.
                </p>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-1.5" /> Export All Data (.json)
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "appearance" && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance & Theme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="p-3 border-2 border-blue-600 rounded-xl bg-white text-slate-900 text-sm font-semibold cursor-pointer">
                    Light Theme (Default)
                  </div>
                  <div className="p-3 border border-slate-200 rounded-xl bg-slate-900 text-white text-sm font-semibold opacity-60 cursor-not-allowed">
                    Dark Theme (Coming Soon)
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "delete" && (
            <Card className="border-rose-200 bg-rose-50/20">
              <CardHeader>
                <CardTitle className="text-rose-700">Delete Account & Purge Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-700">
                  Permanently delete your account, uploaded resumes, private documents, application pipeline, and historical notes. This action is irreversible.
                </p>
                <Button variant="danger">
                  <Trash2 className="w-4 h-4 mr-1.5" /> Delete My Account
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
