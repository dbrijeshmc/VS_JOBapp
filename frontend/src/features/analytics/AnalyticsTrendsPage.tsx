import React from "react";
import { NavLink } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { TrendingUp, Calendar } from "lucide-react";

export const AnalyticsTrendsPage: React.FC = () => {
  const tabs = [
    { name: "Overview", path: "/analytics" },
    { name: "Trends", path: "/analytics/trends" },
    { name: "Pipeline", path: "/analytics/pipeline" },
    { name: "Companies", path: "/analytics/companies" },
    { name: "Outcomes", path: "/analytics/outcomes" },
    { name: "Time Analysis", path: "/analytics/time" },
  ];

  const monthlyTrends = [
    { month: "June 2026", applied: 4, interviews: 1 },
    { month: "July 2026", applied: 6, interviews: 2 },
    { month: "August 2026", applied: 10, interviews: 4 },
    { month: "September 2026 (MTD)", applied: 4, interviews: 1 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Application Trends"
        subtitle="Monthly volume of submitted applications and interview progression."
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

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" /> Monthly Submissions & Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyTrends.map((m) => (
              <div key={m.month} className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{m.month}</h4>
                  <span className="text-xs text-slate-500">{m.applied} applications submitted</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-blue-600">{m.interviews} interviews</span>
                  <span className="text-xs text-slate-400 block">Progressed</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
