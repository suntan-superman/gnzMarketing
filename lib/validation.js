const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const GNZ_SERVICE_OPTIONS = [
  { value: "marketing", label: "Marketing" },
  { value: "business-development", label: "Business Development" },
  { value: "real-estate", label: "Real Estate" },
  { value: "strategic-partnerships", label: "Strategic Partnerships" },
  { value: "behavioral-science", label: "Behavioral Insight" },
  { value: "data-science", label: "Data Science" },
  { value: "performance-marketing", label: "Performance Marketing" },
  { value: "general-inquiry", label: "General Inquiry" },
];

export const GNZ_LEAD_STATUSES = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "qualified", label: "Qualified" },
  { value: "closed", label: "Closed" },
];

export function getServiceLabel(value) {
  return GNZ_SERVICE_OPTIONS.find((item) => item.value === value)?.label || value;
}

export function cleanText(value, max = 500) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);
}

export function normalizePhone(value) {
  return cleanText(value, 30).replace(/[^\d+()\- .]/g, "");
}

export function isValidPhone(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function validateContact(input) {
  const allowedServices = new Set(GNZ_SERVICE_OPTIONS.map((item) => item.value));
  const data = {
    submissionToken: cleanText(input.submissionToken, 36),
    firstName: cleanText(input.firstName, 80),
    lastName: cleanText(input.lastName, 80),
    companyName: cleanText(input.companyName, 160),
    phone: normalizePhone(input.phone),
    email: cleanText(input.email, 160).toLowerCase(),
    service: cleanText(input.service, 60),
    message: cleanText(input.message, 2000),
  };
  const errors = {};
  if (!UUID_PATTERN.test(data.submissionToken)) errors.submissionToken = "Please refresh and try again.";
  if (!data.firstName) errors.firstName = "Enter your first name.";
  if (!isValidPhone(data.phone)) errors.phone = "Enter a valid telephone number.";
  if (!data.email || !EMAIL_PATTERN.test(data.email)) errors.email = "Enter a valid email address.";
  if (!allowedServices.has(data.service)) errors.service = "Choose a service.";
  if (data.message.length < 10) errors.message = "Tell us how we can help.";
  return { valid: Object.keys(errors).length === 0, data, errors };
}

export function validateLeadUpdate(input) {
  const status = cleanText(input.status, 40);
  const internalNotes = cleanText(input.internalNotes, 5000);
  if (!GNZ_LEAD_STATUSES.some((item) => item.value === status)) return { valid: false, error: "Choose a valid status." };
  return { valid: true, data: { status, internal_notes: internalNotes } };
}

export function validateEditableContent(input) {
  const errors = {};
  const text = (value, key, max, required = true) => {
    const cleaned = cleanText(value, max);
    if (required && !cleaned) errors[key] = "Enter text for this field.";
    return cleaned;
  };
  const source = input && typeof input === "object" ? input : {};
  const principals = Array.isArray(source.principals)
    ? source.principals.map((item, index) => ({
        id: cleanText(item.id, 40),
        name: text(item.name, `principals.${index}.name`, 120),
        role: text(item.role, `principals.${index}.role`, 160),
        bio: text(item.bio, `principals.${index}.bio`, 1200),
        sort_order: index,
      }))
    : [];
  const jobs = Array.isArray(source.jobs)
    ? source.jobs.map((item, index) => ({
        id: cleanText(item.id, 40) || `job-${index + 1}`,
        name: text(item.name, `jobs.${index}.name`, 120, false),
        description: text(item.description, `jobs.${index}.description`, 1200, false),
        is_published: Boolean(item.is_published),
        sort_order: index,
      }))
    : [];
  const hubEntries = Array.isArray(source.hubEntries)
    ? source.hubEntries.map((item, index) => ({
        id: cleanText(item.id, 40) || `hub-${index + 1}`,
        title: text(item.title, `hubEntries.${index}.title`, 180, false),
        description: text(item.description, `hubEntries.${index}.description`, 2000, false),
        author: text(item.author, `hubEntries.${index}.author`, 120, false),
        is_published: Boolean(item.is_published),
        sort_order: index,
      }))
    : [];
  if (principals.length !== 2) errors.principals = "Provide both principal profiles.";
  if (jobs.length !== 3) errors.jobs = "Provide three job slots.";
  if (hubEntries.length !== 3) errors.hubEntries = "Provide three Hub entry slots.";
  return { valid: Object.keys(errors).length === 0, data: { principals, jobs, hubEntries }, errors };
}
