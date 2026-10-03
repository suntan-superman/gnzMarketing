/** Keep the displayed and dialable business phone values tied to one setting. */
export function getBusinessPhone(value) {
  const raw = String(value ?? "").trim();
  const digits = raw.replace(/\D/g, "");
  const numeric = /^[+\d\s().-]+$/.test(raw);
  const us = numeric && ((!raw.startsWith("+") && digits.length === 10) || (digits.length === 11 && digits.startsWith("1")))
    ? digits.slice(-10)
    : null;
  const e164 = us
    ? `+1${us}`
    : numeric && raw.startsWith("+") && /^[1-9]\d{6,14}$/.test(digits)
      ? `+${digits}`
      : null;

  return {
    phoneDisplay: us ? `(${us.slice(0, 3)}) ${us.slice(3, 6)}-${us.slice(6)}` : raw,
    phoneHref: e164 || digits ? `tel:${e164 || raw.replace(/[^\d+]/g, "")}` : "/contact",
  };
}
