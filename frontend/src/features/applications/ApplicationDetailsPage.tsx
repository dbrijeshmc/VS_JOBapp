import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Calendar,
  Clock,
  HeartPulse,
  Plus,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  History,
  FileText,
  Trash2,
  ExternalLink,
  MessageSquare,
  CheckCircle,
  HelpCircle,
  Users2,
  Edit2,
  Mail,
  Phone,
} from "lucide-react";
import { applicationService } from "@/services/applicationService";
import { contactService } from "@/services/contactService";
import { documentService } from "@/services/documentService";
import type {
  ApplicationStage,
  HealthStatus,
  ApplicationNote,
  ApplicationFollowup,
  ApplicationDocument,
  ApplicationAnswer,
} from "@/types/application.types";

const ALL_STAGES: { stage: ApplicationStage; label: string }[] = [
  { stage: "APPLIED", label: "Applied" },
  { stage: "PHONE_SCREEN", label: "Phone Screen" },
  { stage: "ASSESSMENT", label: "Assessment" },
  { stage: "INTERVIEW", label: "Interview" },
  { stage: "OFFER", label: "Offer" },
  { stage: "ACCEPTED", label: "Accepted" },
  { stage: "REJECTED", label: "Rejected" },
  { stage: "WITHDRAWN", label: "Withdrawn" },
];

export const ApplicationDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<
    "activity" | "history" | "notes" | "followups" | "documents" | "qa"
  >("activity");

  // Modals state
  const [isStageModalOpen, setIsStageModalOpen] = useState(false);
  const [targetStage, setTargetStage] = useState<string>("");
  const [stageNotes, setStageNotes] = useState<string>("");

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const [isFollowupModalOpen, setIsFollowupModalOpen] = useState(false);
  const [followupDate, setFollowupDate] = useState("");
  const [followupNote, setFollowupNote] = useState("");

  const [isAttachDocModalOpen, setIsAttachDocModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState("");

  const [isQAModalOpen, setIsQAModalOpen] = useState(false);
  const [qaQuestion, setQaQuestion] = useState("");
  const [qaAnswer, setQaAnswer] = useState("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState<string>("");

  // Queries
  const { data: app, isLoading, isError } = useQuery({
    queryKey: ["application", id],
    queryFn: () => applicationService.getApplication(id!),
    enabled: !!id,
  });

  const { data: health } = useQuery({
    queryKey: ["application-health", id],
    queryFn: () => applicationService.getHealth(id!),
    enabled: !!id,
  });

  const { data: stageHistory } = useQuery({
    queryKey: ["application-history", id],
    queryFn: () => applicationService.getStageHistory(id!),
    enabled: !!id,
  });

  const { data: activityList } = useQuery({
    queryKey: ["application-activity", id],
    queryFn: () => applicationService.getActivity(id!),
    enabled: !!id,
  });

  const { data: notesList } = useQuery({
    queryKey: ["application-notes", id],
    queryFn: () => applicationService.getNotes(id!),
    enabled: !!id,
  });

  const { data: followupsList } = useQuery({
    queryKey: ["application-followups", id],
    queryFn: () => applicationService.getFollowups(id!),
    enabled: !!id,
  });

  const { data: docsList } = useQuery({
    queryKey: ["application-documents", id],
    queryFn: () => applicationService.getDocuments(id!),
    enabled: !!id,
  });

  const { data: userVaultDocs } = useQuery({
    queryKey: ["documents-vault"],
    queryFn: () => documentService.listDocuments(),
    enabled: isAttachDocModalOpen,
  });

  const { data: answersList } = useQuery({
    queryKey: ["application-answers", id],
    queryFn: () => applicationService.getAnswers(id!),
    enabled: !!id,
  });

  // Mutations
  const stageMutation = useMutation({
    mutationFn: () => applicationService.transitionStage(id!, targetStage, stageNotes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application", id] });
      queryClient.invalidateQueries({ queryKey: ["application-health", id] });
      queryClient.invalidateQueries({ queryKey: ["application-history", id] });
      queryClient.invalidateQueries({ queryKey: ["application-activity", id] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application-pipeline"] });
      setIsStageModalOpen(false);
      setStageNotes("");
    },
  });

  const noteMutation = useMutation({
    mutationFn: () => applicationService.createNote(id!, noteContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-notes", id] });
      queryClient.invalidateQueries({ queryKey: ["application-activity", id] });
      queryClient.invalidateQueries({ queryKey: ["application-health", id] });
      setIsNoteModalOpen(false);
      setNoteContent("");
    },
  });

  const deleteNoteMutation = useMutation({
    mutationFn: (noteId: string) => applicationService.deleteNote(id!, noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-notes", id] });
      queryClient.invalidateQueries({ queryKey: ["application-health", id] });
    },
  });

  const followupMutation = useMutation({
    mutationFn: () =>
      applicationService.createFollowup(id!, {
        due_date: followupDate || null,
        note: followupNote || null,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-followups", id] });
      queryClient.invalidateQueries({ queryKey: ["application-activity", id] });
      queryClient.invalidateQueries({ queryKey: ["application-health", id] });
      setIsFollowupModalOpen(false);
      setFollowupDate("");
      setFollowupNote("");
    },
  });

  const toggleFollowupMutation = useMutation({
    mutationFn: ({ followupId, isCompleted }: { followupId: string; isCompleted: boolean }) =>
      applicationService.updateFollowup(id!, followupId, { is_completed: isCompleted }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-followups", id] });
      queryClient.invalidateQueries({ queryKey: ["application-activity", id] });
      queryClient.invalidateQueries({ queryKey: ["application-health", id] });
    },
  });

  const deleteFollowupMutation = useMutation({
    mutationFn: (followupId: string) => applicationService.deleteFollowup(id!, followupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-followups", id] });
      queryClient.invalidateQueries({ queryKey: ["application-health", id] });
    },
  });

  const attachDocMutation = useMutation({
    mutationFn: () => applicationService.attachDocument(id!, selectedDocId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-documents", id] });
      queryClient.invalidateQueries({ queryKey: ["application-activity", id] });
      setIsAttachDocModalOpen(false);
      setSelectedDocId("");
    },
  });

  const detachDocMutation = useMutation({
    mutationFn: (documentId: string) => applicationService.detachDocument(id!, documentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-documents", id] });
      queryClient.invalidateQueries({ queryKey: ["application-activity", id] });
    },
  });

  const answerMutation = useMutation({
    mutationFn: () =>
      applicationService.createAnswer(id!, {
        question: qaQuestion,
        answer: qaAnswer,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-answers", id] });
      queryClient.invalidateQueries({ queryKey: ["application-activity", id] });
      setIsQAModalOpen(false);
      setQaQuestion("");
      setQaAnswer("");
    },
  });

  const deleteAnswerMutation = useMutation({
    mutationFn: (ansId: string) => applicationService.deleteAnswer(id!, ansId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-answers", id] });
    },
  });

  const deleteAppMutation = useMutation({
    mutationFn: () => applicationService.deleteApplication(id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      queryClient.invalidateQueries({ queryKey: ["application-pipeline"] });
      navigate("/applications");
    },
  });

  const { data: contactsData } = useQuery({
    queryKey: ["contacts-selector"],
    queryFn: () => contactService.listContacts({ page_size: 100 }),
    enabled: isContactModalOpen,
  });

  const linkContactMutation = useMutation({
    mutationFn: (contactId: string | null) =>
      applicationService.updateApplication(id!, {
        contact_id: contactId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application", id] });
      queryClient.invalidateQueries({ queryKey: ["application-health", id] });
      queryClient.invalidateQueries({ queryKey: ["contact"] });
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      setIsContactModalOpen(false);
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-6 bg-slate-200 rounded w-48 animate-pulse" />
        <Card className="p-8 space-y-4 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/3" />
          <div className="h-4 bg-slate-100 rounded w-1/4" />
        </Card>
      </div>
    );
  }

  if (isError || !app) {
    return (
      <div className="space-y-6">
        <Link to="/applications" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Applications
        </Link>
        <Card className="p-8 text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Application Not Found</h2>
          <p className="text-sm text-slate-500">
            The requested application does not exist or you do not have permission to view it.
          </p>
          <Link to="/applications">
            <Button variant="primary" size="sm">
              Return to Applications
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const getHealthStatusBadge = (status?: HealthStatus) => {
    switch (status) {
      case "EXCELLENT":
        return <Badge variant="success">Excellent</Badge>;
      case "GOOD":
        return <Badge variant="info">Good</Badge>;
      case "NEEDS_ATTENTION":
        return <Badge variant="warning">Needs Attention</Badge>;
      case "POOR":
        return <Badge variant="danger">Poor</Badge>;
      default:
        return null;
    }
  };

  const getProgressColor = (status?: HealthStatus): "success" | "primary" | "warning" | "danger" => {
    switch (status) {
      case "EXCELLENT":
        return "success";
      case "GOOD":
        return "primary";
      case "NEEDS_ATTENTION":
        return "warning";
      case "POOR":
        return "danger";
      default:
        return "primary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <Link to="/applications" className="hover:text-blue-600 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Applications
        </Link>
      </div>

      {/* Header */}
      <PageHeader
        title={`${app.job_title} at ${app.company_name}`}
        subtitle={`${app.job_location || "Location Unspecified"} • ${
          app.applied_date ? `Applied on ${app.applied_date}` : "Not yet applied"
        }`}
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="info" className="text-sm px-3 py-1">
              {app.current_stage.replace("_", " ")}
            </Badge>
            <Button
              variant="primary"
              onClick={() => {
                setTargetStage(app.current_stage);
                setIsStageModalOpen(true);
              }}
            >
              Update Stage
            </Button>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(true)}>
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        }
      />

      {/* Grid Layout: Left Content, Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details & Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sub Navigation */}
          <div className="flex items-center border-b border-slate-200 gap-6 overflow-x-auto text-sm font-semibold">
            <button
              onClick={() => setActiveTab("activity")}
              className={`pb-3 transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "activity"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Activity Timeline
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`pb-3 transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "history"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Stage History
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`pb-3 transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "notes"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Notes ({notesList?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("followups")}
              className={`pb-3 transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "followups"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Follow-ups ({followupsList?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("documents")}
              className={`pb-3 transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "documents"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Documents ({docsList?.length || 0})
            </button>
            <button
              onClick={() => setActiveTab("qa")}
              className={`pb-3 transition-colors border-b-2 whitespace-nowrap ${
                activeTab === "qa"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              Q&A ({answersList?.length || 0})
            </button>
          </div>

          {/* Activity Timeline Tab */}
          {activeTab === "activity" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" /> Immutable Activity Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                  {activityList && activityList.length > 0 ? (
                    activityList.map((item) => (
                      <div key={item.id} className="relative">
                        <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white" />
                        <div className="text-xs font-semibold text-slate-400">
                          {new Date(item.created_at).toLocaleString()}
                        </div>
                        <div className="text-sm font-medium text-slate-800 mt-0.5">
                          {item.description}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Event: {item.event_type}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-slate-400 italic">No activity recorded yet.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stage History Tab */}
          {activeTab === "history" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" /> Stage Progression History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {stageHistory && stageHistory.length > 0 ? (
                    stageHistory.map((h) => (
                      <div
                        key={h.id}
                        className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {h.from_stage ? (
                              <>
                                <Badge variant="neutral">{h.from_stage.replace("_", " ")}</Badge>
                                <span className="text-xs text-slate-400">→</span>
                              </>
                            ) : null}
                            <Badge variant="info">{h.to_stage.replace("_", " ")}</Badge>
                          </div>
                          {h.notes && <p className="text-xs text-slate-600">{h.notes}</p>}
                        </div>
                        <div className="text-xs text-slate-400 whitespace-nowrap">
                          {new Date(h.changed_at).toLocaleString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-slate-400 italic">No stage history found.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes Tab */}
          {activeTab === "notes" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Tracking Notes</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsNoteModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-1" /> Add Note
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {notesList && notesList.length > 0 ? (
                  notesList.map((n) => (
                    <div key={n.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 relative group">
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span>{new Date(n.created_at).toLocaleString()}</span>
                        <button
                          onClick={() => deleteNoteMutation.mutate(n.id)}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-700 whitespace-pre-line">{n.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-400 italic py-4 text-center">
                    No notes recorded yet.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Follow-ups Tab */}
          {activeTab === "followups" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Scheduled Follow-ups</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsFollowupModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-1" /> Add Follow-up
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {followupsList && followupsList.length > 0 ? (
                  followupsList.map((fol) => (
                    <div
                      key={fol.id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={fol.is_completed}
                          onChange={(e) =>
                            toggleFollowupMutation.mutate({
                              followupId: fol.id,
                              isCompleted: e.target.checked,
                            })
                          }
                          className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <div className={fol.is_completed ? "line-through text-slate-400" : ""}>
                          <p className="text-sm text-slate-800">{fol.note || "Scheduled Follow-up"}</p>
                          {fol.due_date && (
                            <span className="text-xs text-slate-500">Due: {fol.due_date}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {fol.is_completed && <Badge variant="success">Completed</Badge>}
                        <button
                          onClick={() => deleteFollowupMutation.mutate(fol.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-400 italic py-4 text-center">
                    No follow-ups scheduled.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Documents Tab */}
          {activeTab === "documents" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Attached Documents</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsAttachDocModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-1" /> Attach Document
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {docsList && docsList.length > 0 ? (
                  docsList.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-500" />
                        <div>
                          <p className="text-sm font-semibold text-slate-800">
                            {doc.document?.name || "Document"}
                          </p>
                          <p className="text-xs text-slate-400">
                            {doc.document?.original_filename} • {doc.document?.doc_type}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => detachDocMutation.mutate(doc.document_id)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                        title="Detach document"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-400 italic py-4 text-center">
                    No supporting documents attached.
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Q&A Tab */}
          {activeTab === "qa" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Application Q&A</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsQAModalOpen(true)}>
                  <Plus className="w-4 h-4 mr-1" /> Add Response
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {answersList && answersList.length > 0 ? (
                  answersList.map((ans) => (
                    <div
                      key={ans.id}
                      className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1 relative group"
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-xs font-semibold text-slate-800">{ans.question}</p>
                        <button
                          onClick={() => deleteAnswerMutation.mutate(ans.id)}
                          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-opacity"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-600 whitespace-pre-line">{ans.answer}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-slate-400 italic py-4 text-center">
                    No custom Q&A answers recorded for this application.
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar: Health & Resume Locked */}
        <div className="space-y-6">
          {/* Health Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-emerald-600" /> Application Health
                </span>
                {getHealthStatusBadge(health?.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Audit Score</span>
                  <span>{health?.score || 0}%</span>
                </div>
                <ProgressBar
                  value={health?.score || 0}
                  color={getProgressColor(health?.status)}
                  size="sm"
                />
              </div>

              {/* Explainable Checks */}
              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Health Checks Breakdown
                </span>
                {health?.checks.map((check) => (
                  <div key={check.check_id} className="flex items-start gap-2 text-xs">
                    {check.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : check.category === "REQUIRED" || check.category === "PENALTY" ? (
                      <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={check.passed ? "text-slate-700" : "text-slate-900 font-medium"}>
                        {check.name}
                      </p>
                      <p className="text-[11px] text-slate-500">{check.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Locked Version Used */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-blue-600" /> Resume Version Locked
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {app.resume ? (
                <>
                  <p className="font-semibold text-slate-900">{app.resume.name}</p>
                  <div className="text-xs text-slate-500 space-y-0.5">
                    <p>File: {app.resume.original_filename}</p>
                    <p className="font-medium text-blue-600">Locked Version: {app.resume.version}</p>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                    Historical snapshot preserved. Even if you upload a newer resume version later, this application permanently references version {app.resume.version}.
                  </p>
                </>
              ) : (
                <div className="text-sm text-slate-400 italic">
                  No resume version locked for this application.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Primary Contact / Recruiter Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Users2 className="w-4 h-4 text-blue-600" /> Primary Contact
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedContactId(app.contact_id || "");
                  setIsContactModalOpen(true);
                }}
              >
                <Edit2 className="w-3.5 h-3.5 mr-1" />
                {app.contact ? "Change" : "Link"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {app.contact ? (
                <>
                  <div>
                    <Link
                      to={`/network/${app.contact.id}`}
                      className="font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-1"
                    >
                      {app.contact.first_name} {app.contact.last_name || ""}
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </Link>
                    <p className="text-xs text-slate-500">
                      {app.contact.role || "Role unspecified"}
                      {app.contact.company_name ? ` • ${app.contact.company_name}` : ""}
                    </p>
                  </div>

                  {app.contact.email && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${app.contact.email}`} className="text-blue-600 hover:underline">
                        {app.contact.email}
                      </a>
                    </div>
                  )}

                  {app.contact.phone && (
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`tel:${app.contact.phone}`} className="hover:text-blue-600">
                        {app.contact.phone}
                      </a>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <Link
                      to={`/network/${app.contact.id}`}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      View Contact Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => linkContactMutation.mutate(null)}
                      className="text-red-500 hover:text-red-700 font-medium"
                      disabled={linkContactMutation.isPending}
                    >
                      Unlink
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-3 space-y-2">
                  <p className="text-xs text-slate-400 italic">
                    No contact linked to this application.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedContactId("");
                      setIsContactModalOpen(true);
                    }}
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Link Contact
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stage Transition Modal */}
      <Modal
        isOpen={isStageModalOpen}
        onClose={() => setIsStageModalOpen(false)}
        title="Update Recruitment Stage"
        description="Transition the application to a new recruitment stage and record notes."
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Target Stage</label>
            <select
              value={targetStage}
              onChange={(e) => setTargetStage(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ALL_STAGES.map((st) => (
                <option key={st.stage} value={st.stage}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Transition Notes (Optional)</label>
            <textarea
              rows={3}
              placeholder="e.g. Completed screen with recruiter; moving to system design round."
              value={stageNotes}
              onChange={(e) => setStageNotes(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="outline" size="sm" onClick={() => setIsStageModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => stageMutation.mutate()}
              disabled={stageMutation.isPending}
            >
              {stageMutation.isPending ? "Updating..." : "Save Stage"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Note Modal */}
      <Modal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        title="Add Tracking Note"
        description="Record personal notes or interview debrief thoughts."
        maxWidth="md"
      >
        <div className="space-y-4">
          <textarea
            rows={4}
            placeholder="Write your note here..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="outline" size="sm" onClick={() => setIsNoteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => noteMutation.mutate()}
              disabled={noteMutation.isPending || !noteContent.trim()}
            >
              {noteMutation.isPending ? "Saving..." : "Add Note"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Schedule Follow-up Modal */}
      <Modal
        isOpen={isFollowupModalOpen}
        onClose={() => setIsFollowupModalOpen(false)}
        title="Schedule Follow-up"
        description="Set a reminder date to check in or follow up on this application."
        maxWidth="md"
      >
        <div className="space-y-4">
          <Input
            type="date"
            label="Due Date"
            value={followupDate}
            onChange={(e) => setFollowupDate(e.target.value)}
          />
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Reminder Note</label>
            <textarea
              rows={3}
              placeholder="e.g. Follow up on technical round scheduling."
              value={followupNote}
              onChange={(e) => setFollowupNote(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="outline" size="sm" onClick={() => setIsFollowupModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => followupMutation.mutate()}
              disabled={followupMutation.isPending}
            >
              {followupMutation.isPending ? "Scheduling..." : "Save Reminder"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Attach Document Modal */}
      <Modal
        isOpen={isAttachDocModalOpen}
        onClose={() => setIsAttachDocModalOpen(false)}
        title="Attach Supporting Document"
        description="Select a private document from your document vault to attach to this application."
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Select Document</label>
            <select
              value={selectedDocId}
              onChange={(e) => setSelectedDocId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Choose document --</option>
              {userVaultDocs?.items.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.doc_type})
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="outline" size="sm" onClick={() => setIsAttachDocModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => attachDocMutation.mutate()}
              disabled={attachDocMutation.isPending || !selectedDocId}
            >
              {attachDocMutation.isPending ? "Attaching..." : "Attach Document"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Q&A Modal */}
      <Modal
        isOpen={isQAModalOpen}
        onClose={() => setIsQAModalOpen(false)}
        title="Add Application Q&A"
        description="Record a specific question and answer submitted for this application."
        maxWidth="md"
      >
        <div className="space-y-4">
          <Input
            label="Question *"
            placeholder="e.g. What is your experience with async architectures?"
            value={qaQuestion}
            onChange={(e) => setQaQuestion(e.target.value)}
            required
          />
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Your Answer *</label>
            <textarea
              rows={4}
              placeholder="Your answer..."
              value={qaAnswer}
              onChange={(e) => setQaAnswer(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <Button variant="outline" size="sm" onClick={() => setIsQAModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => answerMutation.mutate()}
              disabled={answerMutation.isPending || !qaQuestion.trim() || !qaAnswer.trim()}
            >
              {answerMutation.isPending ? "Saving..." : "Save Answer"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete Application"
        description="Are you sure you want to delete this application? This will permanently remove its stage history, notes, and activity timeline."
        maxWidth="sm"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => deleteAppMutation.mutate()}
              disabled={deleteAppMutation.isPending}
            >
              {deleteAppMutation.isPending ? "Deleting..." : "Delete Application"}
            </Button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          This action cannot be undone.
        </p>
      </Modal>

      {/* Link / Change Contact Modal */}
      <Modal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="Associate Contact with Application"
        description="Select a recruiter, hiring manager, or referral from your professional network to associate with this application."
        maxWidth="md"
        footer={
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsContactModalOpen(false)}
            >
              Cancel
            </Button>
            {app.contact_id && (
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 hover:bg-red-50 border-red-200"
                onClick={() => linkContactMutation.mutate(null)}
                disabled={linkContactMutation.isPending}
              >
                Unlink Current Contact
              </Button>
            )}
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                linkContactMutation.mutate(selectedContactId || null)
              }
              disabled={linkContactMutation.isPending}
            >
              {linkContactMutation.isPending ? "Saving..." : "Save Association"}
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              Select Contact
            </label>
            <select
              value={selectedContactId}
              onChange={(e) => setSelectedContactId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- None (No Contact Linked) --</option>
              {contactsData?.items.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.first_name} {c.last_name || ""} ({c.role || "Role unspecified"}
                  {c.company ? ` • ${c.company.name}` : ""})
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500 flex items-start gap-2">
            <Users2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-slate-700">Don't see your contact?</p>
              <p>
                You can create new professional contacts in your{" "}
                <Link to="/network" className="text-blue-600 hover:underline">
                  Network Directory
                </Link>{" "}
                at any time.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
