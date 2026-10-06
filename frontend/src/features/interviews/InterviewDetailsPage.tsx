import React from "react";
import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  Building2,
  User,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

export const InterviewDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const interview = {
    id: id || "int-1",
    company: "Google",
    role: "Software Engineer III",
    round: "Technical Interview (System Design)",
    stage: "Round 2",
    scheduledAt: "2026-09-09 10:00 AM PST",
    duration: "60 mins",
    format: "Google Meet",
    meetingUrl: "https://meet.google.com/abc-defg-hij",
    status: "Upcoming",
    interviewers: "David Chen (Staff Infrastructure Architect)",
    agenda:
      "Design a high-throughput, low-latency metrics aggregation system capable of handling 500k writes/sec with automated failover.",
    notes:
      "Review consistent hashing, Raft consensus protocols, write-ahead logs, and LSM trees before the interview.",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/interviews" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Interviews
        </Link>
      </div>

      <PageHeader
        title={interview.round}
        subtitle={`${interview.company} • ${interview.role}`}
        actions={
          <div className="flex items-center gap-3">
            <Link to={`/interviews/${interview.id}/prep`}>
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-1.5" /> Open Prep Notes
              </Button>
            </Link>
            <a href={interview.meetingUrl} target="_blank" rel="noreferrer">
              <Button variant="primary">
                <Video className="w-4 h-4 mr-1.5" /> Join Meeting
              </Button>
            </a>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Session Scope & Agenda</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 leading-relaxed">{interview.agenda}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personal Interview Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-700 leading-relaxed">{interview.notes}</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Date & Time</span>
                <span className="font-medium text-slate-900">{interview.scheduledAt}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Duration</span>
                <span className="font-medium text-slate-900">{interview.duration}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Interviewer</span>
                <span className="font-medium text-slate-900">{interview.interviewers}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Platform</span>
                <span className="font-medium text-slate-900">{interview.format}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
