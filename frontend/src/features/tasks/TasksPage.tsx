import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  CheckSquare,
  Plus,
  Calendar,
  Clock,
  Briefcase,
  Building2,
  Users,
  CheckCircle2,
  Circle,
} from "lucide-react";

export const TasksPage: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "today" | "upcoming" | "completed">("all");

  const [tasks, setTasks] = useState([
    {
      id: "task-1",
      title: "Follow up with Sarah Jenkins on interview schedule",
      description: "Send a polite email inquiring about the Round 2 confirmation details.",
      dueDate: "2026-09-07",
      priority: "High",
      status: "Pending",
      relatedType: "Application",
      relatedTitle: "Google • Software Engineer III",
      isCompleted: false,
    },
    {
      id: "task-2",
      title: "Complete Stripe take-home system design repo",
      description: "Write unit tests and commit architecture diagram for the concurrency challenge.",
      dueDate: "2026-09-08",
      priority: "Urgent",
      status: "Pending",
      relatedType: "Application",
      relatedTitle: "Stripe • Backend Infrastructure",
      isCompleted: false,
    },
    {
      id: "task-3",
      title: "Update LinkedIn headline and featured projects",
      description: "Feature the recently open-sourced distributed task queue repository.",
      dueDate: "2026-09-12",
      priority: "Medium",
      status: "Pending",
      relatedType: "General",
      relatedTitle: "Career Branding",
      isCompleted: false,
    },
    {
      id: "task-4",
      title: "Connect with David Chen on LinkedIn",
      description: "Include a customized note referencing shared interest in Raft consensus.",
      dueDate: "2026-09-05",
      priority: "Medium",
      status: "Completed",
      relatedType: "Contact",
      relatedTitle: "David Chen (Google)",
      isCompleted: true,
    },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.isCompleted;
    if (filter === "all") return true;
    if (filter === "today") return t.dueDate === "2026-09-07" && !t.isCompleted;
    if (filter === "upcoming") return t.dueDate > "2026-09-07" && !t.isCompleted;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Tasks & Follow-ups"
        subtitle="Manage actionable items across applications, interviews, contacts, and career milestones."
        actions={
          <Button variant="primary">
            <Plus className="w-4 h-4 mr-1.5" /> Add Task
          </Button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200">
        <button
          onClick={() => setFilter("all")}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            filter === "all"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          All Tasks
        </button>
        <button
          onClick={() => setFilter("today")}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            filter === "today"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Due Today
        </button>
        <button
          onClick={() => setFilter("upcoming")}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            filter === "upcoming"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 ${
            filter === "completed"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          Completed
        </button>
      </div>

      <div className="space-y-3">
        {filteredTasks.map((t) => (
          <Card key={t.id} className="p-4 hover:border-slate-300 transition-colors">
            <div className="flex items-start gap-3">
              <button
                onClick={() => toggleTask(t.id)}
                className="mt-0.5 text-slate-400 hover:text-blue-600 transition-colors"
                aria-label="Toggle task completion"
              >
                {t.isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4
                    className={`font-semibold text-sm ${
                      t.isCompleted ? "line-through text-slate-400" : "text-slate-900"
                    }`}
                  >
                    {t.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        t.priority === "Urgent"
                          ? "danger"
                          : t.priority === "High"
                          ? "warning"
                          : "neutral"
                      }
                    >
                      {t.priority}
                    </Badge>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Due: {t.dueDate}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-600">{t.description}</p>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                  <span className="font-medium text-slate-600">
                    Linked to: {t.relatedType} ({t.relatedTitle})
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
            No tasks found in this view.
          </div>
        )}
      </div>
    </div>
  );
};
