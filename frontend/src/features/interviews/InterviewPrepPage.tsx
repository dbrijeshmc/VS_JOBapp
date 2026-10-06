import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  BookOpen,
  CheckSquare,
  Building2,
  Users,
  HelpCircle,
  FileText,
  Save,
} from "lucide-react";

export const InterviewPrepPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [checklist, setChecklist] = useState([
    { id: 1, text: "Read Google Cloud architectural whitepapers on Spanner & Bigtable", done: true },
    { id: 2, text: "Review distributed consensus (Paxos/Raft) and quorum replication", done: true },
    { id: 3, text: "Prepare 3 questions to ask interviewer David Chen about team roadmap", done: false },
    { id: 4, text: "Test camera, microphone, and quiet room setup 30 mins prior", done: false },
  ]);

  const toggleCheck = (idx: number) => {
    setChecklist((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, done: !c.done } : c))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to={`/interviews/${id || "int-1"}`} className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Interview Details
        </Link>
      </div>

      <PageHeader
        title="Interview Preparation Hub"
        subtitle="System Design Round • Google Software Engineer III"
        actions={
          <Button variant="primary">
            <Save className="w-4 h-4 mr-1.5" /> Save Prep Notes
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-600" /> Preparation Checklist
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {checklist.map((item, idx) => (
                <label
                  key={item.id}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 border border-slate-100 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleCheck(idx)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <span
                    className={`text-sm ${
                      item.done ? "line-through text-slate-400" : "text-slate-800"
                    }`}
                  >
                    {item.text}
                  </span>
                </label>
              ))}
            </CardContent>
          </Card>

          {/* Questions to prepare */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" /> Anticipated Questions & Talking Points
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="text-xs font-semibold text-slate-800">Q: How would you design a distributed rate limiter?</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Discuss Token Bucket vs Leaky Bucket algorithms, Redis sliding window counter, and local in-memory caching to avoid Redis round-trip latency at massive scale.
                </p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="text-xs font-semibold text-slate-800">Q: Tell me about a time you resolved a major production database bottleneck.</h4>
                <p className="text-sm text-slate-600 mt-1">
                  Use STAR method: Explain PostgreSQL read contention during analytics queries, implementing connection pooling via PgBouncer and moving intensive queries to read replicas.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Questions to ask the interviewer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" /> Questions to Ask the Interviewer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-700">
              <p>1. What are the key technical challenges your infrastructure team is tackling in Q4?</p>
              <p>2. How does the team balance long-term distributed architectural redesigns with rapid customer delivery?</p>
              <p>3. What distinguishes an engineer who simply performs well from one who truly excels on this team?</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Interviewer Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="font-semibold text-slate-900">David Chen</div>
              <p className="text-xs text-slate-600">
                Staff Infrastructure Architect at Google Cloud. 8 years at Google. Focus on distributed storage and networking.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Company Highlights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-slate-600">
              <p>• Recent announcements in Google Cloud Vertex AI and unified storage tiers.</p>
              <p>• Engineering philosophy emphasizing blameless post-mortems and site reliability engineering (SRE) rigor.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
