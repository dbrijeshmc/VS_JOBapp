import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CalendarCheck,
  Plus,
  Clock,
  Video,
  Building2,
  ChevronRight,
  BookOpen,
} from "lucide-react";

export const InterviewsPage: React.FC = () => {
  const [filter, setFilter] = useState<"upcoming" | "completed" | "cancelled">("upcoming");

  const interviews = [
    {
      id: "int-1",
      company: "Google",
      role: "Software Engineer III",
      round: "Technical Interview (System Design)",
      stage: "Round 2",
      scheduledAt: "2026-09-09 10:00 AM PST",
      duration: "60 mins",
      format: "Google Meet",
      status: "Upcoming",
      interviewers: "David Chen (Staff Architect)",
    },
    {
      id: "int-2",
      company: "Stripe",
      role: "Backend Infrastructure Engineer",
      round: "Architecture & Concurrency Deep Dive",
      stage: "Technical Onsite",
      scheduledAt: "2026-09-12 01:30 PM PST",
      duration: "45 mins",
      format: "Zoom",
      status: "Upcoming",
      interviewers: "Elena Rostova (Engineering Lead)",
    },
    {
      id: "int-3",
      company: "Google",
      role: "Software Engineer III",
      round: "Recruiter Screen",
      stage: "Round 1",
      scheduledAt: "2026-08-28 11:00 AM PST",
      duration: "30 mins",
      format: "Phone Call",
      status: "Completed",
      interviewers: "Sarah Jenkins (Technical Recruiter)",
    },
  ];

  const filteredInterviews = interviews.filter((i) => {
    if (filter === "upcoming") return i.status === "Upcoming";
    if (filter === "completed") return i.status === "Completed";
    if (filter === "cancelled") return i.status === "Cancelled";
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Interviews"
        subtitle="Schedule, organize, and prepare for upcoming technical screens and onsite rounds."
        actions={
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-1.5" /> Schedule Interview
          </Button>
        }
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setFilter("upcoming")}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            filter === "upcoming"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Upcoming ({interviews.filter((i) => i.status === "Upcoming").length})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ml-4 ${
            filter === "completed"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Completed ({interviews.filter((i) => i.status === "Completed").length})
        </button>
      </div>

      <div className="space-y-4">
        {filteredInterviews.map((item) => (
          <Card key={item.id} className="p-5 hover:border-blue-300 transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-slate-900 text-base">{item.round}</h3>
                  <Badge variant={item.status === "Upcoming" ? "info" : "success"}>
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm font-medium text-slate-700">
                  {item.company} • <span className="text-slate-500 font-normal">{item.role}</span>
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" /> {item.scheduledAt} ({item.duration})
                  </span>
                  <span className="flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-slate-400" /> {item.format}
                  </span>
                  <span>Interviewer: {item.interviewers}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link to={`/interviews/${item.id}/prep`}>
                  <Button variant="outline" size="sm">
                    <BookOpen className="w-4 h-4 mr-1.5 text-indigo-600" /> Prep Hub
                  </Button>
                </Link>
                <Link to={`/interviews/${item.id}`}>
                  <Button variant="outline" size="sm">
                    Details <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
