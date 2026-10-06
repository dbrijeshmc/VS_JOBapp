import React from "react";
import { NavLink } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { GitFork } from "lucide-react";

export const AnalyticsPipelinePage: React.FC = () => {
  const tabs = [
    { name: "Overview", path: "/analytics" },
    { name: "Trends", path: "/analytics/trends" },
    { name: "Pipeline", path: "/analytics/pipeline" },
    { name: "Companies", path: "/analytics/companies" },
    { name: "Outcomes", path: "/analytics/outcomes" },
    { name: "Time Analysis", path: "/analytics/time" },
  ];

  const funnel = [
    { stage: "Saved Opportunities", count: 42, conversion: 100 },
    { stage: "Applications Submitted", count: 24, conversion: 57.1 },
    { stage: "Under Review", count: 18, conversion: 75.0 },
    { stage: "Assessments / Screen", count: 12, conversion: 66.7 },
    { stage: "Technical Interviews", count: 8, conversion: 66.7 },
    { stage: "Final Round / Onsite", count: 4, conversion: 50.0 },
    { stage: "Job Offers", count: 2, conversion: 50.0 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pipeline Conversion"
        subtitle="Funnel metrics tracking conversion drop-offs between major application milestones."
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
            <GitFork className="w-5 h-5 text-blue-600" /> Hiring Funnel Conversion Rates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {funnel.map((step) => (
            <div key={step.stage} className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{step.stage}</span>
                <span>{step.count} candidates ({step.conversion}% stage conversion)</span>
              </div>
              <ProgressBar value={step.conversion} color="primary" size="sm" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
