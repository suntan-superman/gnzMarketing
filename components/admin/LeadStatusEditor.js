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
  return <form className="admin-card lead-editor" onSubmit={save}><h2>Follow-up</h2><label>Status<select value={status} onChange={(event) => setStatus(event.target.value)}>{GNZ_LEAD_STATUSES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label><label>Assigned to<select value={assignedTo} onChange={(event) => setAssignedTo(event.target.value)}><option value="">Unassigned</option>{assignees.map((item) => <option key={item.user_id} value={item.user_id}>{item.display_name || "GNZ administrator"}</option>)}</select></label><label>Internal notes<textarea rows="7" value={internalNotes} onChange={(event) => setInternalNotes(event.target.value)} /></label>{message ? <div className="form-alert" role="status">{message}</div> : null}<button className="button" type="submit" disabled={saving}>{saving ? "Saving…" : "Save follow-up"}</button></form>;
}
