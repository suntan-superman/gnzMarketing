"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GNZ_LEAD_STATUSES } from "@/lib/validation";

export default function LeadStatusEditor({ lead, assignees = [] }) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.status);
  const [internalNotes, setInternalNotes] = useState(lead.internal_notes || "");
  const [assignedTo, setAssignedTo] = useState(lead.assigned_to || "");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  async function save(event) {
    event.preventDefault(); setSaving(true); setMessage("");
    const response = await fetch(`/api/admin/leads/${lead.id}`, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ status, internalNotes, assignedTo }) });
    const result = await response.json();
    setMessage(response.ok ? "Lead updated." : result.message || "Lead could not be updated.");
    setSaving(false);
    if (response.ok) router.refresh();
  }
<<<<<<< HEAD
  return <form className="admin-card lead-editor" onSubmit={save}><h2>Follow-up</h2><label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}>{GNZ_LEAD_STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><label>Assigned to<select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)}><option value="">Unassigned</option>{assignees.map((item) => <option key={item.user_id} value={item.user_id}>{item.display_name || "GNZ administrator"}</option>)}</select></label><label>Internal notes<textarea rows="7" value={internalNotes} onChange={(event) => setInternalNotes(event.target.value)} /></label>{message ? <div className="form-alert" role="status">{message}</div> : null}<button className="button" type="submit" disabled={saving}>{saving ? "Saving…" : "Save follow-up"}</button></form>;
=======
  async function changeArchiveState(action) {
    const prompt = action === "archive"
      ? "Archive this lead? It will leave the active lead list but can be restored later."
      : "Restore this lead to the active lead list?";
    if (!window.confirm(prompt)) return;
    setSaving(true); setMessage("");
    const response = await fetch(`/api/admin/leads/${lead.id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ action }) });
    const result = await response.json();
    setMessage(response.ok ? (action === "archive" ? "Lead archived." : "Lead restored.") : result.message || "Lead could not be updated.");
    setSaving(false);
    if (response.ok) router.refresh();
  }
  async function permanentlyDelete() {
    if (!window.confirm("Permanently delete this archived lead and its notification history? This cannot be undone.")) return;
    setSaving(true); setMessage("");
    const response = await fetch(`/api/admin/leads/${lead.id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) { setMessage(result.message || "Lead could not be deleted."); setSaving(false); return; }
    router.push("/admin/leads?view=archived");
  }
  return <form className="admin-card lead-editor" onSubmit={save}><h2>Follow-up</h2>{lead.archived_at ? <p className="lead-archived-notice">Archived on {new Date(lead.archived_at).toLocaleString()}. This lead is hidden from the active list.</p> : null}<label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}>{GNZ_LEAD_STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><label>Assigned to<select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)}><option value="">Unassigned</option>{assignees.map((item) => <option key={item.user_id} value={item.user_id}>{item.display_name || "GNZ administrator"}</option>)}</select></label><label>Internal notes<textarea rows="7" value={internalNotes} onChange={(event) => setInternalNotes(event.target.value)} /></label>{message ? <div className="form-alert" role="status">{message}</div> : null}<button className="button" type="submit" disabled={saving}>{saving ? "Saving…" : "Save follow-up"}</button><div className="lead-lifecycle-actions"><button className="button button-secondary" type="button" onClick={() => changeArchiveState(lead.archived_at ? "restore" : "archive")} disabled={saving}>{lead.archived_at ? "Restore lead" : "Archive lead"}</button>{lead.archived_at ? <button className="button button-danger" type="button" onClick={permanentlyDelete} disabled={saving}>Delete permanently</button> : null}</div></form>;
>>>>>>> feature/gnz-admin-content-oct-2026
}
