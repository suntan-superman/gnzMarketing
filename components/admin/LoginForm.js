"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm({ setupRequired = false }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Sign in failed.");
      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setMessage(error.message);
      setSubmitting(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={submit}>
      {setupRequired ? <div className="admin-notice">Supabase credentials and the GNZ schema must be configured before admin sign-in.</div> : null}
      <label htmlFor="adminEmail">Email</label>
      <input id="adminEmail" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
      <label htmlFor="adminPassword">Password</label>
      <input id="adminPassword" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
      {message ? <div className="form-alert error" role="alert">{message}</div> : null}
      <button className="button" type="submit" disabled={submitting}>{submitting ? "Signing in…" : "Sign in"}</button>
      <p>Administrator accounts are provisioned privately. There is no public registration.</p>
    </form>
  );
}
