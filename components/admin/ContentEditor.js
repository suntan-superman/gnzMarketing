"use client";

import { useState } from "react";

function updateAt(items, index, field, value) {
  return items.map((item, itemIndex) => itemIndex === index ? { ...item, [field]: value } : item);
}

export default function ContentEditor({ initialContent }) {
  const [content, setContent] = useState(initialContent);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const update = (collection, index, field, value) => setContent((current) => ({ ...current, [collection]: updateAt(current[collection], index, field, value) }));

  async function save(event) {
    event.preventDefault(); setSaving(true); setMessage(""); setError("");
    try {
      const response = await fetch("/api/admin/content", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(content) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Content could not be saved.");
      setContent({ principals: result.principals, jobs: result.jobs, hubEntries: result.hubEntries });
      setMessage("Site content saved.");
    } catch (saveError) { setError(saveError.message); }
    finally { setSaving(false); }
  }

  return <form className="content-editor" onSubmit={save}>
    <section className="admin-card"><div className="admin-card-heading"><div><h2>Principals</h2><p>Edit the bios shown on the About page.</p></div></div>{content.principals.map((principal, index) => <fieldset className="editor-block" key={principal.id}><legend>{principal.name || `Principal ${index + 1}`}</legend><div className="form-row"><label>Name<input value={principal.name} onChange={(event) => update("principals", index, "name", event.target.value)} /></label><label>Role<input value={principal.role} onChange={(event) => update("principals", index, "role", event.target.value)} /></label></div><label>Bio<textarea rows="5" value={principal.bio} onChange={(event) => update("principals", index, "bio", event.target.value)} /></label></fieldset>)}</section>
    <section className="admin-card"><div className="admin-card-heading"><div><h2>Jobs</h2><p>Incomplete job slots remain hidden from the public Jobs page.</p></div></div>{content.jobs.map((job, index) => <fieldset className="editor-block" key={job.id}><legend>Job {index + 1}</legend><label>Name<input value={job.name} onChange={(event) => update("jobs", index, "name", event.target.value)} /></label><label>Description<textarea rows="4" value={job.description} onChange={(event) => update("jobs", index, "description", event.target.value)} /></label><label className="checkbox-label"><input type="checkbox" checked={job.is_published} onChange={(event) => update("jobs", index, "is_published", event.target.checked)} /> Publish when complete</label></fieldset>)}</section>
    <section className="admin-card"><div className="admin-card-heading"><div><h2>Hub</h2><p>Entries need both a title and description before they appear publicly.</p></div></div>{content.hubEntries.map((entry, index) => <fieldset className="editor-block" key={entry.id}><legend>Hub entry {index + 1}</legend><label>Title<input value={entry.title} onChange={(event) => update("hubEntries", index, "title", event.target.value)} /></label><label>Description<textarea rows="5" value={entry.description} onChange={(event) => update("hubEntries", index, "description", event.target.value)} /></label><label>Author<input value={entry.author} onChange={(event) => update("hubEntries", index, "author", event.target.value)} /></label><label className="checkbox-label"><input type="checkbox" checked={entry.is_published} onChange={(event) => update("hubEntries", index, "is_published", event.target.checked)} /> Publish when complete</label></fieldset>)}</section>
    {message ? <div className="form-alert success" role="status">{message}</div> : null}
    {error ? <div className="form-alert error" role="alert">{error}</div> : null}
    <button className="button" type="submit" disabled={saving}>{saving ? "Saving…" : "Save site content"}</button>
  </form>;
}
