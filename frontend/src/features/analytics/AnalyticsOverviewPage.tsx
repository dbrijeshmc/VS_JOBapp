import React from "react";
import { Link, NavLink } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Building2,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Briefcase,
  FileCheck,
} from "lucide-react";

export const AnalyticsOverviewPage: React.FC = () => {
  const tabs = [
    { name: "Overview", path: "/analytics" },
    { name: "Trends", path: "/analytics/trends" },
    { name: "Pipeline", path: "/analytics/pipeline" },
    { name: "Companies", path: "/analytics/companies" },
    { name: "Outcomes", path: "/analytics/outcomes" },
    { name: "Time Analysis", path: "/analytics/time" },
  ];

  const metrics = [
    { label: "Total Applications", value: "24", change: "+4 this month", icon: Briefcase },
    { label: "Interview Conversion", value: "33.3%", change: "8 of 24 applied", icon: TrendingUp },
    { label: "Offer Conversion", value: "8.3%", change: "2 offers received", icon: CheckCircle2 },
    { label: "Avg Time to Interview", value: "12 days", change: "From submission", icon: Clock },
  ];

  const sourceBreakdown = [
    { source: "Direct Career Portal", count: 12, percent: 50 },
    { source: "Employee Referral", count: 6, percent: 25 },
    { source: "Recruiter Reachout", count: 4, percent: 16.7 },
    { source: "Saved Opportunity Import", count: 2, percent: 8.3 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Career Analytics"
        subtitle="Data-driven insights into your application conversion rates, pipeline velocity, and outcomes."
      />

      {/* Analytics Sub-nav */}
      <div className="flex items-center gap-6 border-b border-slate-200 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            end={tab.path === "/analytics"}
            className={({ isActive }) =>
              `pb-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Card key={m.label} className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">{m.label}</span>
                <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-2">
                <span className="text-2xl font-bold text-slate-900">{m.value}</span>
                <span className="text-xs text-emerald-600 font-medium ml-2">{m.change}</span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Source Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Applications by Source</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sourceBreakdown.map((item) => (
              <div key={item.source} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{item.source}</span>
                  <span>{item.count} apps ({item.percent}%)</span>
                </div>
                <ProgressBar value={item.percent} color="primary" size="sm" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Resume Usage Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-blue-600" /> Resume Version Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex justify-between text-sm font-semibold text-slate-800">
                <span>Software Engineer Resume (v3)</span>
                <Badge variant="success">42% Interview Rate</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">Used in 14 applications • 6 moved to interview</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex justify-between text-sm font-semibold text-slate-800">
                <span>Backend & Systems Resume (v2)</span>
                <Badge variant="info">25% Interview Rate</Badge>
              </div>
              <p className="text-xs text-slate-500 mt-1">Used in 8 applications • 2 moved to interview</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
