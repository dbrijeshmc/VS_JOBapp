import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Bell,
  CheckCheck,
  CalendarCheck,
  Clock,
  Briefcase,
  AlertTriangle,
  User,
} from "lucide-react";

export const NotificationsPage: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const [notifications, setNotifications] = useState([
    {
      id: "notif-1",
      title: "Interview Reminder: Google Round 2",
      message: "Your Technical Interview with David Chen starts tomorrow at 10:00 AM PST.",
      type: "Interview",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: "notif-2",
      title: "Task Due: Complete Stripe Take-Home",
      message: "Deadline is in 24 hours. Don't forget to push your code repo and verify tests.",
      type: "Task",
      time: "5 hours ago",
      isRead: false,
    },
    {
      id: "notif-3",
      title: "Application Status Update: Amazon Web Services",
      message: "Stage updated to Offer Extended! Check your application details page for offer documents.",
      type: "Application",
      time: "1 day ago",
      isRead: true,
    },
    {
      id: "notif-4",
      title: "Profile Recommendation",
      message: "Add your desired salary preferences to unlock explainable job match evaluations.",
      type: "Profile",
      time: "3 days ago",
      isRead: true,
    },
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const filtered = notifications.filter((n) => (filter === "unread" ? !n.isRead : true));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle="Real-time alerts, interview reminders, follow-up pings, and milestone updates."
        actions={
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCheck className="w-4 h-4 mr-1.5" /> Mark All as Read
          </Button>
        }
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200">
        <button
          onClick={() => setFilter("all")}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            filter === "all"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            filter === "unread"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Unread ({notifications.filter((n) => !n.isRead).length})
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((n) => (
          <Card
            key={n.id}
            className={`p-4 transition-colors ${
              !n.isRead ? "border-blue-200 bg-blue-50/20" : "border-slate-200"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-slate-900">{n.title}</h4>
                  <Badge variant={n.isRead ? "neutral" : "info"}>{n.type}</Badge>
                </div>
                <p className="text-sm text-slate-600">{n.message}</p>
                <span className="text-xs text-slate-400 block pt-1">{n.time}</span>
              </div>

              {!n.isRead && (
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0 mt-1" />
              )}
            </div>
          </Card>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
            No notifications in this view.
          </div>
        )}
      </div>
    </div>
  );
};
