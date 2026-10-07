"use client";

import { useState } from "react";
import { GNZ_SERVICE_OPTIONS } from "@/lib/validation";
import TurnstileWidget from "@/components/TurnstileWidget";

const initialFields = {
  firstName: "",
  lastName: "",
  companyName: "",
  phone: "",
  email: "",
  service: "",
  message: "",
  website: "",
};

function FieldError({ message }) {
  return message ? <span className="field-error" role="alert">{message}</span> : null;
}

function FieldLabel({ children, required = false }) {
  return <span className="field-label">{children}{required ? <span className="required-mark" aria-hidden="true">*</span> : null}</span>;
}

export default function ContactForm({ compact = false }) {
  const [fields, setFields] = useState(initialFields);
  const [submissionToken] = useState(() => globalThis.crypto?.randomUUID?.() || "33333333-3333-4333-8333-333333333333");
  const [startedAt] = useState(() => Date.now());
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [turnstileToken, setTurnstileToken] = useState("");

  function change(event) {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function submit(event) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...fields, submissionToken, startedAt, turnstileToken }),
      });
      const result = await response.json();
      if (!response.ok) {
        setErrors(result.errors || {});
        throw new Error(result.message || "Your message could not be sent.");
      }
      setStatus("success");
      setMessage(`Your inquiry was received as ${result.reference}. We will follow up using the details you provided.`);
    } catch (error) {
      setStatus("error");
      setMessage(error.message);
    }
  }

  if (status === "success") return <div className="form-success compact-success"><h2>Message received.</h2><p>{message}</p></div>;

  const idPrefix = compact ? "compact" : "full";
  return (
    <section className={compact ? "contact-panel compact" : "section contact-panel"}>
      <div className={compact ? "" : "container"}>
        {!compact ? <div className="contact-heading"><h2>Let&apos;s Talk</h2><p>Tell us what you are working toward and where you would like to improve marketing performance.</p></div> : null}
        <form className="contact-form" onSubmit={submit} noValidate>
          <div className="form-row">
            <label htmlFor={`${idPrefix}-firstName`}><FieldLabel required>First name</FieldLabel><input id={`${idPrefix}-firstName`} name="firstName" autoComplete="given-name" value={fields.firstName} onChange={change} aria-invalid={Boolean(errors.firstName)} aria-required="true" /><FieldError message={errors.firstName} /></label>
            <label htmlFor={`${idPrefix}-lastName`}><FieldLabel>Last name</FieldLabel><input id={`${idPrefix}-lastName`} name="lastName" autoComplete="family-name" value={fields.lastName} onChange={change} /></label>
          </div>
          <div className="form-row">
            <label htmlFor={`${idPrefix}-company`}><FieldLabel>Company</FieldLabel><input id={`${idPrefix}-company`} name="companyName" autoComplete="organization" value={fields.companyName} onChange={change} /></label>
            <label htmlFor={`${idPrefix}-phone`}><FieldLabel required>Telephone</FieldLabel><input id={`${idPrefix}-phone`} name="phone" type="tel" autoComplete="tel" value={fields.phone} onChange={change} aria-invalid={Boolean(errors.phone)} aria-required="true" /><FieldError message={errors.phone} /></label>
          </div>
          <div className="form-row">
            <label htmlFor={`${idPrefix}-email`}><FieldLabel required>Email</FieldLabel><input id={`${idPrefix}-email`} name="email" type="email" autoComplete="email" value={fields.email} onChange={change} aria-invalid={Boolean(errors.email)} aria-required="true" /><FieldError message={errors.email} /></label>
            <label htmlFor={`${idPrefix}-service`}><FieldLabel required>Service of interest</FieldLabel><select id={`${idPrefix}-service`} name="service" value={fields.service} onChange={change} aria-invalid={Boolean(errors.service)} aria-required="true"><option value="">Select a service</option>{GNZ_SERVICE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select><FieldError message={errors.service} /></label>
          </div>
          <label htmlFor={`${idPrefix}-message`}><FieldLabel required>Comments</FieldLabel><textarea id={`${idPrefix}-message`} name="message" rows={compact ? 4 : 6} maxLength="2000" value={fields.message} onChange={change} aria-invalid={Boolean(errors.message)} aria-required="true" /><FieldError message={errors.message} /></label>
          <div className="honey-field" aria-hidden="true"><label htmlFor={`${idPrefix}-website`}>Website<input id={`${idPrefix}-website`} name="website" tabIndex="-1" autoComplete="off" value={fields.website} onChange={change} /></label></div>
          <TurnstileWidget onToken={setTurnstileToken} />
          {message && status === "error" ? <div className="form-alert error" role="alert">{message}</div> : null}
          <button className="button" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Sending…" : "Submit"}</button>
        </form>
      </div>
    </section>
  );
}
