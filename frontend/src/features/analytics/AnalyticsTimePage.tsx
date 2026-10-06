import React from "react";
import { NavLink } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Clock } from "lucide-react";

export const AnalyticsTimePage: React.FC = () => {
  const tabs = [
    { name: "Overview", path: "/analytics" },
    { name: "Trends", path: "/analytics/trends" },
    { name: "Pipeline", path: "/analytics/pipeline" },
    { name: "Companies", path: "/analytics/companies" },
    { name: "Outcomes", path: "/analytics/outcomes" },
    { name: "Time Analysis", path: "/analytics/time" },
  ];

  const timeMetrics = [
    { stage: "Applied → Recruiter Screen", avgDays: 6, benchmark: "5 - 10 days" },
    { stage: "Recruiter Screen → Technical Round 1", avgDays: 5, benchmark: "3 - 7 days" },
    { stage: "Technical Round 1 → Onsite Panel", avgDays: 8, benchmark: "7 - 14 days" },
    { stage: "Onsite Panel → Decision / Offer", avgDays: 4, benchmark: "3 - 7 days" },
    { stage: "Total Time to Offer (Average)", avgDays: 23, benchmark: "20 - 35 days" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Time & Velocity Analysis"
        subtitle="Average duration spent in each stage and time-to-offer velocity metrics."
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
            <Clock className="w-5 h-5 text-blue-600" /> Stage Velocity Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {timeMetrics.map((item) => (
              <div key={item.stage} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{item.stage}</h4>
                  <span className="text-xs text-slate-500">Industry benchmark: {item.benchmark}</span>
                </div>
                <div className="text-right font-bold text-slate-800 text-sm">
                  {item.avgDays} days avg
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
