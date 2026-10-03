import test from "node:test";
import assert from "node:assert/strict";
import { getBusinessPhone } from "../lib/phone.js";
import { validateContact, validateEditableContent } from "../lib/validation.js";

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
