export default function ContactForm({ compact = false }) {
  return (
    <section className={compact ? "contact-panel compact" : "section contact-panel"}>
      <div className={compact ? "" : "container"}>
        {!compact ? (
          <div className="contact-heading">
            <h2>Let's Talk</h2>
            <p>No backend is connected yet. This form is ready for a future email, SMS, or CRM integration.</p>
          </div>
        ) : null}
        <form>
          <div className="form-row">
            <label>
              First Name <span>(required)</span>
              <input name="firstName" autoComplete="given-name" />
            </label>
            <label>
              Last Name <span>(required)</span>
              <input name="lastName" autoComplete="family-name" />
            </label>
          </div>
          <label>
            Email <span>(required)</span>
            <input name="email" type="email" autoComplete="email" />
          </label>
          {!compact ? (
            <label>
              Message
              <textarea name="message" rows="5" />
            </label>
          ) : null}
          <button className="button" type="button">Submit</button>
        </form>
      </div>
    </section>
  );
}
