export default function SectionIntro({ kicker, title, copy, centered = false }) {
  return (
    <div className={`section-intro ${centered ? "centered" : ""}`}>
      {kicker ? <p className="kicker">{kicker}</p> : null}
      {title ? <h2>{title}</h2> : null}
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}
