import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Video,
  Clock,
  CheckSquare,
  Plus,
} from "lucide-react";

export const CalendarPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState("September 2026");

  const events = [
    {
      id: "ev-1",
      date: "2026-09-08",
      time: "10:00 AM",
      title: "Google Technical Screen (Round 2)",
      type: "Interview",
      color: "blue",
    },
    {
      id: "ev-2",
      date: "2026-09-09",
      time: "05:00 PM",
      title: "Stripe Take-Home Challenge Due",
      type: "Deadline",
      color: "amber",
    },
    {
      id: "ev-3",
      date: "2026-09-12",
      time: "01:30 PM",
      title: "Stripe Architecture Deep Dive",
      type: "Interview",
      color: "blue",
    },
    {
      id: "ev-4",
      date: "2026-09-14",
      time: "11:00 AM",
      title: "Databricks Status Check-in Follow-up",
      type: "Task",
      color: "emerald",
    },
  ];

  // Calendar days grid representation
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Career Calendar"
        subtitle="Unified schedule of upcoming interviews, task deadlines, follow-ups, and recruiter calls."
        actions={
          <div className="flex items-center gap-3">
            <Button variant="outline">Export iCal / .ics</Button>
            <Button variant="primary">
              <Plus className="w-4 h-4 mr-1.5" /> Add Event
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar View */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-base text-slate-900">{currentMonth}</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" aria-label="Previous month">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" aria-label="Next month">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center font-semibold text-xs text-slate-500 mb-2">
              {daysOfWeek.map((d) => (
                <div key={d} className="py-1">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {/* Day cells */}
              {daysInMonth.map((day) => {
                const dayStr = `2026-09-${String(day).padStart(2, "0")}`;
                const dayEvents = events.filter((e) => e.date === dayStr);

                return (
                  <div
                    key={day}
                    className={`min-h-[80px] p-1.5 rounded-lg border text-left transition-colors ${
                      day === 7
                        ? "border-blue-500 bg-blue-50/20"
                        : "border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span
                        className={`text-xs font-semibold ${
                          day === 7 ? "text-blue-600" : "text-slate-700"
                        }`}
                      >
                        {day}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {dayEvents.map((ev) => (
                        <div
                          key={ev.id}
                          className={`text-[10px] p-1 rounded font-medium truncate ${
                            ev.color === "blue"
                              ? "bg-blue-100 text-blue-800"
                              : ev.color === "amber"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                          title={ev.title}
                        >
                          {ev.time} {ev.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Upcoming Agenda Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" /> Upcoming Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {events.map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-lg border border-slate-200/80 bg-slate-50 space-y-1 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        ev.type === "Interview"
                          ? "info"
                          : ev.type === "Deadline"
                          ? "danger"
                          : "success"
                      }
                    >
                      {ev.type}
                    </Badge>
                    <span className="text-xs text-slate-500">{ev.date}</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 text-xs mt-1">{ev.title}</h4>
                  <span className="text-xs text-slate-500 block">{ev.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
