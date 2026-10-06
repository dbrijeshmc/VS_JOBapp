import React from "react";
import { NavLink } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Building2 } from "lucide-react";

export const AnalyticsCompaniesPage: React.FC = () => {
  const tabs = [
    { name: "Overview", path: "/analytics" },
    { name: "Trends", path: "/analytics/trends" },
    { name: "Pipeline", path: "/analytics/pipeline" },
    { name: "Companies", path: "/analytics/companies" },
    { name: "Outcomes", path: "/analytics/outcomes" },
    { name: "Time Analysis", path: "/analytics/time" },
  ];

  const companiesAnalysis = [
    { company: "Google", applications: 2, responseTime: "8 days", outcome: "Interviewing" },
    { company: "Stripe", applications: 1, responseTime: "5 days", outcome: "Take-Home Assessment" },
    { company: "Amazon Web Services", applications: 1, responseTime: "14 days", outcome: "Offer Accepted" },
    { company: "Databricks", applications: 1, responseTime: "10 days", outcome: "Under Review" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Response Analytics"
        subtitle="Response rates, speed, and outcomes grouped by target employer."
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
            <Building2 className="w-5 h-5 text-blue-600" /> Employer Response Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {companiesAnalysis.map((c) => (
              <div key={c.company} className="p-4 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{c.company}</h4>
                  <span className="text-xs text-slate-500">{c.applications} applications • Avg response: {c.responseTime}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                    {c.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
