"use client";

import { useMemo, useState } from "react";

const statusOptions = ["draft", "published", "archived"];

function blankRecord(kind) {
  if (kind === "selected-work") return { title: "", slug: "", category: "Marketing", summary: "", body: "", cover_image: "", image_alt: "", outcome: "", client_name: "", work_date: "", status: "draft", sort_order: 0, featured: false, source_reference: "", approval_notes: "" };
  if (kind === "insights") return { title: "", slug: "", excerpt: "", body: "", category: "", tags: "", cover_image: "", image_alt: "", attribution: "", source_url: "", original_published_at: "", status: "draft", sort_order: 0, featured: false };
  return { title: "", slug: "", summary: "", body: "", cover_image: "", image_alt: "", location: "", asset_type: "", status: "draft", sort_order: 0, internal_notes: "" };
}

function labelFor(kind) {
  return kind === "selected-work" ? "Selected Work" : kind === "investment-opportunities" ? "Investment Opportunities" : "Insights";
}

function singularLabel(kind) {
  return kind === "selected-work" ? "Selected Work" : kind === "investment-opportunities" ? "Investment Opportunity" : "Insight";
}

function toEditorRecord(kind, record) {
  const next = { ...blankRecord(kind), ...record };
  if (kind === "insights" && Array.isArray(next.tags)) next.tags = next.tags.join(", ");
  return next;
}

function toPayload(kind, record) {
  const payload = { ...record };
  if (kind === "insights") payload.tags = String(record.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean);
  return payload;
}

function displayDate(value) {
  if (!value) return "Not published";
  return new Date(value).toLocaleDateString();
}

export default function ManagedContentEditor({ kind, initialRecords = [], investmentPublicEnabled = false }) {
  const label = labelFor(kind);
  const [records, setRecords] = useState(initialRecords);
  const [draft, setDraft] = useState(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [preview, setPreview] = useState(false);
  const [gateEnabled, setGateEnabled] = useState(investmentPublicEnabled);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const visibleRecords = useMemo(() => records.filter((record) => {
    const haystack = `${record.title} ${record.slug} ${record.category || ""}`.toLowerCase();
    return (!query || haystack.includes(query.toLowerCase())) && (!statusFilter || record.status === statusFilter);
  }), [records, query, statusFilter]);

  function edit(record) {
    setDraft(toEditorRecord(kind, record));
    setPreview(false);
    setMessage("");
    setError("");
  }

  function update(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  async function save(event) {
    event.preventDefault();
    if (!draft) return;
    setSaving(true); setMessage(""); setError("");
    try {
      const existing = Boolean(draft.id);
      const response = await fetch(`/api/admin/managed/${kind}`, { method: existing ? "PUT" : "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(toPayload(kind, draft)) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "The record could not be saved.");
      setRecords((current) => existing ? current.map((record) => record.id === result.record.id ? result.record : record) : [result.record, ...current]);
      setDraft(toEditorRecord(kind, result.record));
      setMessage(`${label} saved.`);
    } catch (saveError) { setError(saveError.message); }
    finally { setSaving(false); }
  }

  async function archive(record) {
    if (!window.confirm(`Archive this ${label.toLowerCase().replace(/s$/, "")} record?`)) return;
    setSaving(true); setMessage(""); setError("");
    try {
      const response = await fetch(`/api/admin/managed/${kind}`, { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: record.id }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "The record could not be archived.");
      setRecords((current) => current.map((item) => item.id === result.record.id ? result.record : item));
      if (draft?.id === record.id) setDraft(toEditorRecord(kind, result.record));
      setMessage("Record archived.");
    } catch (archiveError) { setError(archiveError.message); }
    finally { setSaving(false); }
  }

  async function updateGate(event) {
    const enabled = event.target.checked;
    if (enabled && !window.confirm("Enabling this setting makes individually published Investment Opportunities visible to the public. Confirm only after legal/content review.")) { event.target.checked = false; return; }
    setSaving(true); setMessage(""); setError("");
    try {
      const response = await fetch("/api/admin/investment-settings", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ enabled }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "The visibility setting could not be saved.");
      setGateEnabled(result.setting.boolean_value === true);
      setMessage(enabled ? "Investment Opportunities public visibility enabled." : "Investment Opportunities public visibility disabled.");
    } catch (gateError) { event.target.checked = gateEnabled; setError(gateError.message); }
    finally { setSaving(false); }
  }

  const isOpportunity = kind === "investment-opportunities";
  return <div className="managed-editor">
    {isOpportunity ? <section className="admin-card managed-gate-card">
      <div><p className="kicker">Global publishing gate</p><h2>{gateEnabled ? "Public section enabled" : "Public section disabled"}</h2><p>Individual published records remain hidden until this server-side setting is enabled.</p></div>
      <label className="checkbox-label gate-toggle"><input type="checkbox" checked={gateEnabled} onChange={updateGate} disabled={saving} /> Allow published Investment Opportunities to be visible publicly</label>
      {!gateEnabled ? <strong className="managed-gate-warning">Public visibility is OFF. No opportunity is listed publicly.</strong> : <strong className="managed-gate-warning">Legal and content approval is still required before publishing.</strong>}
    </section> : null}
    <section className="admin-card">
      <div className="admin-card-heading"><div><p className="kicker">Manage content</p><h2>{label}</h2><p>Drafts and archived records never appear on public pages.</p></div><button className="button" type="button" onClick={() => { setDraft(blankRecord(kind)); setPreview(false); setMessage(""); setError(""); }}>New {singularLabel(kind)}</button></div>
      <div className="managed-filters"><label>Search<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, slug, or category" /></label><label>Status<select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option value="">All statuses</option>{statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}</select></label></div>
      <div className="managed-record-list">{visibleRecords.length ? visibleRecords.map((record) => <button className={`managed-record ${draft?.id === record.id ? "selected" : ""}`} type="button" key={record.id} onClick={() => edit(record)}><strong>{record.title || "Untitled record"}</strong><span>{record.category || record.slug || "No category"}</span><small><b className={`status-badge status-${record.status}`}>{record.status}</b> · Updated {displayDate(record.updated_at || record.created_at)}</small></button>) : <div className="admin-empty">No records match this filter.</div>}</div>
    </section>
    {draft ? <form className="admin-card managed-form" onSubmit={save}>
      <div className="admin-card-heading"><div><p className="kicker">{draft.id ? "Edit record" : "New record"}</p><h2>{draft.title || `New ${singularLabel(kind)}`}</h2><p>Preview stays private to signed-in administrators until the record is published.</p></div><button className="button button-secondary" type="button" onClick={() => setPreview((value) => !value)}>{preview ? "Hide preview" : "Preview"}</button></div>
      <div className="form-row"><label>Title *<input required value={draft.title} onChange={(event) => update("title", event.target.value)} /></label><label>Slug *<input required value={draft.slug} onChange={(event) => update("slug", event.target.value)} placeholder="generated-from-title" /></label></div>
      {kind === "selected-work" ? <>
        <div className="form-row"><label>Category<select value={draft.category} onChange={(event) => update("category", event.target.value)}>{["Marketing", "Business Development", "Strategic Partnerships", "Real Estate"].map((item) => <option key={item}>{item}</option>)}</select></label><label>Status<select value={draft.status} onChange={(event) => update("status", event.target.value)}>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></label></div>
        <label>Summary *<textarea required rows="3" value={draft.summary} onChange={(event) => update("summary", event.target.value)} /></label><label>Details / body<textarea rows="8" value={draft.body} onChange={(event) => update("body", event.target.value)} /></label>
        <div className="form-row"><label>Client / partner name (optional)<input value={draft.client_name} onChange={(event) => update("client_name", event.target.value)} /></label><label>Work date (optional)<input type="date" value={draft.work_date || ""} onChange={(event) => update("work_date", event.target.value)} /></label></div>
        <label>Verified outcome or metric (optional)<textarea rows="3" value={draft.outcome} onChange={(event) => update("outcome", event.target.value)} /></label><div className="form-row"><label>Cover image URL (optional)<input value={draft.cover_image} onChange={(event) => update("cover_image", event.target.value)} /></label><label>Image alt text<input value={draft.image_alt} onChange={(event) => update("image_alt", event.target.value)} /></label></div>
        <label>Internal approval notes<textarea rows="3" value={draft.approval_notes} onChange={(event) => update("approval_notes", event.target.value)} /></label><label className="checkbox-label"><input type="checkbox" checked={draft.featured} onChange={(event) => update("featured", event.target.checked)} /> Feature this record</label>
      </> : null}
      {kind === "insights" ? <>
        <div className="form-row"><label>Category<input value={draft.category} onChange={(event) => update("category", event.target.value)} /></label><label>Status<select value={draft.status} onChange={(event) => update("status", event.target.value)}>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></label></div>
        <label>Excerpt *<textarea required rows="3" value={draft.excerpt} onChange={(event) => update("excerpt", event.target.value)} /></label><label>Body<textarea rows="9" value={draft.body} onChange={(event) => update("body", event.target.value)} /></label><label>Tags <span className="admin-help">comma-separated</span><input value={draft.tags} onChange={(event) => update("tags", event.target.value)} /></label>
        <div className="form-row"><label>Attribution<input value={draft.attribution} onChange={(event) => update("attribution", event.target.value)} /></label><label>Source URL (optional)<input value={draft.source_url} onChange={(event) => update("source_url", event.target.value)} /></label></div><div className="form-row"><label>Original publication date<input type="date" value={draft.original_published_at || ""} onChange={(event) => update("original_published_at", event.target.value)} /></label><label>Cover image URL (optional)<input value={draft.cover_image} onChange={(event) => update("cover_image", event.target.value)} /></label></div><label>Image alt text<input value={draft.image_alt} onChange={(event) => update("image_alt", event.target.value)} /></label><label className="checkbox-label"><input type="checkbox" checked={draft.featured} onChange={(event) => update("featured", event.target.checked)} /> Feature this insight</label>
      </> : null}
      {isOpportunity ? <>
        <div className="form-row"><label>Status<select value={draft.status} onChange={(event) => update("status", event.target.value)}>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></label><label>Sort order<input type="number" value={draft.sort_order} onChange={(event) => update("sort_order", event.target.value)} /></label></div>
        <label>Summary<textarea rows="3" value={draft.summary} onChange={(event) => update("summary", event.target.value)} /></label><label>Details / body<textarea rows="9" value={draft.body} onChange={(event) => update("body", event.target.value)} /></label><div className="form-row"><label>Location (optional)<input value={draft.location} onChange={(event) => update("location", event.target.value)} /></label><label>Asset type (optional)<input value={draft.asset_type} onChange={(event) => update("asset_type", event.target.value)} /></label></div><div className="form-row"><label>Cover image URL (optional)<input value={draft.cover_image} onChange={(event) => update("cover_image", event.target.value)} /></label><label>Image alt text<input value={draft.image_alt} onChange={(event) => update("image_alt", event.target.value)} /></label></div><label>Internal notes<textarea rows="4" value={draft.internal_notes} onChange={(event) => update("internal_notes", event.target.value)} /></label><p className="admin-help">Do not add returns, yields, financing terms, or investment projections. Public activation requires separate owner/legal review.</p>
      </> : null}
      {preview ? <div className="managed-preview" aria-label="Private content preview"><p className="kicker">Admin preview</p><h2>{draft.title || "Untitled record"}</h2><p>{draft.summary || draft.excerpt}</p><div className="managed-preview-body">{draft.body || "No body content yet."}</div></div> : null}
      {message ? <div className="form-alert success" role="status">{message}</div> : null}{error ? <div className="form-alert error" role="alert">{error}</div> : null}
      <div className="managed-actions"><button className="button" type="submit" disabled={saving}>{saving ? "Saving…" : draft.id ? "Save changes" : "Create draft"}</button>{draft.id ? <button className="button button-secondary" type="button" disabled={saving || draft.status === "archived"} onClick={() => archive(draft)}>Archive</button> : null}<button className="button button-secondary" type="button" onClick={() => setDraft(null)}>Close</button></div>
    </form> : null}
  </div>;
}
