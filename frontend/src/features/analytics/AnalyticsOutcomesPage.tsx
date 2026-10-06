import React from "react";
import { NavLink } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Award, CheckCircle, XCircle, Ban } from "lucide-react";

export const AnalyticsOutcomesPage: React.FC = () => {
  const tabs = [
    { name: "Overview", path: "/analytics" },
    { name: "Trends", path: "/analytics/trends" },
    { name: "Pipeline", path: "/analytics/pipeline" },
    { name: "Companies", path: "/analytics/companies" },
    { name: "Outcomes", path: "/analytics/outcomes" },
    { name: "Time Analysis", path: "/analytics/time" },
  ];

  const outcomes = [
    { label: "Active Applications", count: 18, color: "info" as const },
    { label: "Offers Extended", count: 2, color: "success" as const },
    { label: "Rejected After Review/Interview", count: 3, color: "danger" as const },
    { label: "Withdrawn by Candidate", count: 1, color: "neutral" as const },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Application Outcomes"
        subtitle="Historical outcome tracking across offers, rejections, and candidate withdrawals."
      />

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {outcomes.map((o) => (
          <Card key={o.label} className="p-4">
            <span className="text-xs font-medium text-slate-500">{o.label}</span>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-2xl font-bold text-slate-900">{o.count}</span>
              <Badge variant={o.color}>{o.label.split(" ")[0]}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
