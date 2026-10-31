import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { getBusinessPhone } from "../lib/phone.js";
import { articleJsonLd, breadcrumbJsonLd, organizationJsonLd, websiteJsonLd } from "../lib/seo.js";
import { initializeAnalytics, trackEvent, trackPageView } from "../lib/analytics.js";
import { GNZ_LEAD_STATUSES, isPublicInvestmentOpportunity, validateContact, validateEditableContent, validateLeadUpdate, validateManagedRecord } from "../lib/validation.js";

const root = path.resolve(import.meta.dirname, "..");
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");

const validContact = {
  submissionToken: "33333333-3333-4333-8333-333333333333",
  firstName: "Taylor",
  lastName: "Client",
  companyName: "Example Co.",
  phone: "(661) 343-7663",
  email: "taylor@example.com",
  service: "behavioral-science",
  message: "We would like to discuss a customer insight project.",
};

test("contact validation accepts the GNZ lead fields", () => {
  const result = validateContact(validContact);
  assert.equal(result.valid, true);
  assert.equal(result.data.service, "behavioral-science");
  assert.equal(result.data.companyName, "Example Co.");
});

test("contact validation rejects invalid phone, service, and short comments", () => {
  const result = validateContact({ ...validContact, phone: "123", service: "unknown", message: "short" });
  assert.equal(result.valid, false);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.service);
  assert.ok(result.errors.message);
});

test("content validation keeps incomplete jobs and Hub entries available for editing", () => {
  const result = validateEditableContent({
    principals: [
      { id: "gabriel", name: "Gabriel", role: "Principal", bio: "Bio" },
      { id: "zay", name: "Zay", role: "Principal", bio: "Bio" },
    ],
    jobs: [{ id: "job-1", name: "", description: "", is_published: true }],
    hubEntries: [{ id: "hub-1", title: "", description: "", author: "", is_published: true }],
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.jobs);
  assert.ok(result.errors.hubEntries);
});

test("phone display and dialing values derive from one configured value", () => {
  assert.deepEqual(getBusinessPhone("2025550100"), { phoneDisplay: "(202) 555-0100", phoneHref: "tel:+12025550100" });
  assert.equal(getBusinessPhone("").phoneHref, "/contact");
});

test("investment opportunities require both the global gate and published status", () => {
  assert.equal(isPublicInvestmentOpportunity(false, "published"), false);
  assert.equal(isPublicInvestmentOpportunity(true, "draft"), false);
  assert.equal(isPublicInvestmentOpportunity(true, "published"), true);
});

test("managed content validation requires publishable content and safe URLs", () => {
  const unpublished = validateManagedRecord("selected-work", { title: "Example", summary: "A verified example." });
  assert.equal(unpublished.valid, true);
  const published = validateManagedRecord("selected-work", { title: "Example", summary: "A verified example.", status: "published", cover_image: "javascript:alert(1)" });
  assert.equal(published.valid, false);
  assert.ok(published.errors.body);
  assert.ok(published.errors.cover_image);
});
test("existing and expanded GNZ lead statuses remain valid", () => {
  const values = GNZ_LEAD_STATUSES.map((item) => item.value);
  assert.deepEqual(values, ["new", "contacted", "qualified", "in_discussion", "closed", "not_proceeding"]);
  for (const status of values) {
    assert.equal(validateLeadUpdate({ status, internalNotes: "", assignedTo: "" }).valid, true);
  }
});

test("lead mutation uses the verified session actor and never browser actor input", () => {
  const route = read("app/api/admin/leads/[id]/route.js");
  assert.match(route, /authorizeAdminRequest\(\)/);
  assert.match(route, /rpc\("smkh_admin_update_lead"/);
  assert.match(route, /p_actor_id:\s*auth\.user\.id/);
  assert.doesNotMatch(route, /input\.(?:actor|actorId|actor_id)/);
});

test("lead lifecycle mutations require admin authorization and protect permanent deletion", () => {
  const route = read("app/api/admin/leads/[id]/route.js");
  assert.match(route, /export async function PATCH/);
  assert.match(route, /export async function DELETE/);
  assert.match(route, /authorizeAdminRequest\(\)/g);
  assert.match(route, /Archive the lead before permanently deleting it/);
  assert.match(route, /smkh_notification_logs/);
});

test("technical SEO routes and metadata are present", () => {
  const sitemap = read("app/sitemap.js");
  const robots = read("app/robots.js");
  const layout = read("app/layout.js");
  assert.match(sitemap, /getPublicInsights/);
  assert.match(sitemap, /getPublicSelectedWork/);
  assert.match(sitemap, /investmentEnabled/);
  assert.match(robots, /sitemap\.xml/);
  assert.match(robots, /\/admin\//);
  assert.match(layout, /metadataBase/);
  assert.match(layout, /organizationJsonLd/);
});

test("SEO structured data serializes as valid JSON-LD", () => {
  const values = [organizationJsonLd(), websiteJsonLd(), breadcrumbJsonLd([{ name: "Home", path: "/" }]), articleJsonLd({ title: "Example", description: "Example description", path: "/insights/example" })];
  for (const value of values) assert.doesNotThrow(() => JSON.parse(JSON.stringify(value)));
});

test("admin remains noindex and public content filters remain server-side", () => {
  assert.match(read("app/admin/(protected)/layout.js"), /index: false/);
  assert.match(read("lib/managedContent.js"), /eq\("status", "published"\)/);
  assert.match(read("lib/managedContent.js"), /getInvestmentOpportunitiesPublicEnabled/);
});

test("GA4 lead events avoid personal data", () => {
  const contactForm = read("components/ContactForm.js");
  assert.match(contactForm, /trackEvent\("generate_lead"/);
  assert.doesNotMatch(contactForm, /trackEvent\([^\n]*(firstName|lastName|email|phone|message)/);
});

test("GA4 initialization disables automatic pageviews and deduplicates client navigation", () => {
  const calls = [];
  global.window = {
    __gnzAnalyticsConsent: true,
    dataLayer: [],
    gtag: (...args) => calls.push(args),
  };

  assert.equal(initializeAnalytics(" G-TEST123 "), true);
  assert.equal(calls[0][0], "js");
  assert.equal(calls[1][0], "config");
  assert.equal(calls[1][1], "G-TEST123");
  assert.equal(calls[1][2].send_page_view, false);
  assert.equal(trackPageView("/contact", "Contact"), true);
  assert.equal(trackPageView("/contact", "Contact"), false);
  assert.equal(trackPageView("/about", "About"), true);
  assert.equal(calls.filter(([name]) => name === "event").length, 2);

  delete global.window;
});

test("GA4 conversion events keep only approved non-PII parameters", () => {
  const calls = [];
  global.window = {
    __gnzAnalyticsConsent: true,
    gtag: (...args) => calls.push(args),
  };

  assert.equal(trackEvent("generate_lead", {
    form_location: "contact_page",
    service_interest: "marketing",
    email: "person@example.com",
    phone: "555-0100",
    message: "Private details",
  }), true);
  assert.deepEqual(calls[0], ["event", "generate_lead", { form_location: "contact_page", service_interest: "marketing" }]);

  delete global.window;
});
