import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  CalendarCheck,
  CheckSquare,
  Award,
  ArrowUpRight,
  Clock,
  Plus,
  FileText,
  UserCheck,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { PageHeader } from "@/components/layout/PageHeader";

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner & Header */}
      <PageHeader
        title="Career Command Center"
        description="Your unified personal operating system for opportunities, applications, and interviews."
        actions={
          <div className="flex items-center gap-2">
            <Link to="/opportunities">
              <Button size="sm" variant="outline" leftIcon={<Plus className="w-4 h-4" />}>
                Add Opportunity
              </Button>
            </Link>
            <Link to="/applications">
              <Button size="sm" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
                New Application
              </Button>
            </Link>
          </div>
        }
      />

      {/* Profile Completeness Alert & Progress */}
      <Card className="bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-white border-blue-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-blue-900">Profile Completeness</span>
              <Badge variant="info">82% Complete</Badge>
            </div>
            <p className="text-xs text-slate-600">
              Complete your Job Preferences and Projects to unlock targeted opportunity discovery and explainable matching.
            </p>
            <div className="pt-2 w-full max-w-md">
              <ProgressBar value={82} size="md" color="blue" showPercent={false} />
            </div>
          </div>
          <Link to="/profile/preferences">
            <Button size="sm" variant="outline" className="bg-white">
              Complete Preferences
            </Button>
          </Link>
        </div>
      </Card>

      {/* High-Level KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Active Applications</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">14</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-emerald-600 font-medium">
            <span>+3 new this week</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Upcoming Interviews</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">3</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-slate-500">
            <span>Next: Round 2 Tech (Tomorrow)</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Tasks Due Today</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">4</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
              <CheckSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-amber-600 font-medium">
            <span>2 follow-ups pending</span>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500">Offers & Outcomes</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">1</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs text-emerald-600 font-medium">
            <span>1 offer in review</span>
          </div>
        </Card>
      </div>

      {/* Main Grid: Application Pipeline & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Stage Summary (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recruitment Pipeline</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Current distribution of applications by stage</p>
              </div>
              <Link to="/applications/pipeline" className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1">
                View Kanban <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Applied</span>
                  <p className="text-xl font-bold text-slate-900 mt-1">6</p>
                </div>
                <div className="p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                  <span className="text-xs text-blue-700 font-medium">Screening</span>
                  <p className="text-xl font-bold text-blue-900 mt-1">3</p>
                </div>
                <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100">
                  <span className="text-xs text-purple-700 font-medium">Interview</span>
                  <p className="text-xl font-bold text-purple-900 mt-1">4</p>
                </div>
                <div className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                  <span className="text-xs text-emerald-700 font-medium">Offer</span>
                  <p className="text-xl font-bold text-emerald-900 mt-1">1</p>
                </div>
                <div className="p-3 bg-slate-100 rounded-lg border border-slate-200">
                  <span className="text-xs text-slate-500 font-medium">Archived</span>
                  <p className="text-xl font-bold text-slate-700 mt-1">5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Timeline Preview */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <p className="text-xs text-slate-500 mt-0.5">Audit log of your job search touchpoints</p>
              </div>
              <span className="text-xs text-slate-400">Live Timeline</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900">
                      Interview Scheduled: <span className="font-normal text-slate-600">Round 2 Technical with Stripe</span>
                    </p>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> Today at 2:30 PM
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900">
                      Stage Changed: <span className="font-normal text-slate-600">Cloudflare application moved to Technical Screen</span>
                    </p>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> Yesterday
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-slate-400 mt-1.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900">
                      Resume Attached: <span className="font-normal text-slate-600">Cloud Engineer Resume v2 pinned to Datadog application</span>
                    </p>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" /> 2 days ago
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Widgets (1 col): Upcoming Interviews & Action Items */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Interviews</CardTitle>
              <Link to="/interviews" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                All
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900">Stripe</span>
                    <Badge variant="info">Technical Round</Badge>
                  </div>
                  <span className="text-xs text-slate-600">Tomorrow, 3:00 PM (45m)</span>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Google Meet</span>
                    <Link to="/interviews" className="text-xs text-blue-600 font-medium hover:underline">
                      Prep Notes →
                    </Link>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900">Datadog</span>
                    <Badge variant="neutral">Phone Screen</Badge>
                  </div>
                  <span className="text-xs text-slate-600">Thursday, 11:00 AM (30m)</span>
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">Recruiter Screen</span>
                    <Link to="/interviews" className="text-xs text-blue-600 font-medium hover:underline">
                      Prep Notes →
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Shortcuts */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2">
                <Link to="/applications" className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-center transition-colors">
                  <Briefcase className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                  <span className="text-xs font-medium text-slate-700 block">Add App</span>
                </Link>
                <Link to="/profile/resumes" className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-center transition-colors">
                  <FileText className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                  <span className="text-xs font-medium text-slate-700 block">Upload CV</span>
                </Link>
                <Link to="/interviews" className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-center transition-colors">
                  <CalendarCheck className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                  <span className="text-xs font-medium text-slate-700 block">Schedule</span>
                </Link>
                <Link to="/network" className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-center transition-colors">
                  <UserCheck className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                  <span className="text-xs font-medium text-slate-700 block">Add Contact</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
