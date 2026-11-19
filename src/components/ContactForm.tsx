"use client";

import { useState } from "react";

const ROLES = [
  "Service member",
  "Spouse / partner",
  "Veteran",
  "Caregiver / family",
  "Civilian employee",
  "Other / prefer not to say",
];

const BRANCHES = [
  "U.S. Army",
  "U.S. Navy",
  "U.S. Air Force",
  "U.S. Marine Corps",
  "U.S. Coast Guard",
  "U.S. Space Force",
  "DoD / joint / other",
  "Prefer not to say",
];

const TOPICS = [
  "Retaliation / whistleblower",
  "Housing / barracks",
  "Mental health routing",
  "Family impact",
  "Command climate / abuse",
  "Older veteran / benefits",
  "Other",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const form = new FormData(e.currentTarget);

    const role = String(form.get("role") || "");
    const branch = String(form.get("branch") || "");
    const topic = String(form.get("topic") || "");
    const anonymous = form.get("anonymous") === "on";
    const timeline = String(form.get("timeline") || "");
    const docs = String(form.get("docs") || "");
    const tipBody = String(form.get("message") || "");

    const composed = [
      `Role: ${role || "—"}`,
      `Branch / context: ${branch || "—"}`,
      `Topic: ${topic || "—"}`,
      `Prefer limited identification: ${anonymous ? "yes" : "no"}`,
      timeline ? `Timeline notes:\n${timeline}` : null,
      docs ? `Documents available:\n${docs}` : null,
      "",
      "Tip narrative:",
      tipBody,
    ]
      .filter(Boolean)
      .join("\n");

    const payload = {
      name: anonymous
        ? `Source (${role || "undisclosed"})`
        : String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      subject: topic ? `Tip · ${topic}` : String(form.get("subject") || "Secure tip"),
      message: composed,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Could not send tip");
      }
      setStatus("done");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "done") {
    return (
      <div className="relative overflow-hidden border border-flag-blue/15 bg-white p-8 shadow-[var(--shadow-lift)] md:p-10">
        <div className="usa-rule-thin" />
        <p className="mt-6 eyebrow text-flag-red">Tip received</p>
        <h3 className="mt-3 font-display text-3xl text-flag-blue md:text-4xl">
          Your file is on the desk.
        </h3>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate">
          We triage for urgency, corroboration potential, and retaliation risk before expanding
          outreach. Silence from us can mean protection — not indifference. If you add documents
          later, use the same email so we can match the thread.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-copper mt-8 !bg-flag-red"
        >
          Send another tip
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden border border-flag-blue/15 bg-white shadow-[var(--shadow-lift)]"
    >
      <div className="usa-rule" />
      <div className="border-b border-flag-blue/10 bg-flag-blue px-6 py-5 text-bone md:px-8">
        <p className="eyebrow text-brass-soft">Secure tip intake</p>
        <p className="mt-2 font-display text-2xl md:text-3xl">Build the public record</p>
        <p className="mt-2 max-w-2xl text-sm text-fog">
          Prefer a personal device. Do not use a government workstation for sensitive tips. If you
          are in immediate danger, call emergency services first.
        </p>
      </div>

      <div className="space-y-6 p-6 md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block text-sm">
            <span className="font-condensed text-[0.7rem] tracking-[0.18em] text-flag-blue uppercase">
              Your role
            </span>
            <select
              name="role"
              required
              className="mt-2 w-full border border-flag-blue/15 bg-paper-deep px-3 py-3 outline-none focus:border-flag-red"
              defaultValue=""
            >
              <option value="" disabled>
                Select…
              </option>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="font-condensed text-[0.7rem] tracking-[0.18em] text-flag-blue uppercase">
              Branch / context
            </span>
            <select
              name="branch"
              required
              className="mt-2 w-full border border-flag-blue/15 bg-paper-deep px-3 py-3 outline-none focus:border-flag-red"
              defaultValue=""
            >
              <option value="" disabled>
                Select…
              </option>
              {BRANCHES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block text-sm">
          <span className="font-condensed text-[0.7rem] tracking-[0.18em] text-flag-blue uppercase">
            Topic lane
          </span>
          <select
            name="topic"
            required
            className="mt-2 w-full border border-flag-blue/15 bg-paper-deep px-3 py-3 outline-none focus:border-flag-red"
            defaultValue=""
          >
            <option value="" disabled>
              What is this tip mainly about?
            </option>
            {TOPICS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block text-sm">
            <span className="font-condensed text-[0.7rem] tracking-[0.18em] text-flag-blue uppercase">
              Name (or handle)
            </span>
            <input
              name="name"
              required
              placeholder="How should we address you?"
              className="mt-2 w-full border border-flag-blue/15 bg-paper-deep px-3 py-3 outline-none focus:border-flag-red"
            />
          </label>
          <label className="block text-sm">
            <span className="font-condensed text-[0.7rem] tracking-[0.18em] text-flag-blue uppercase">
              Contact email
            </span>
            <input
              name="email"
              type="email"
              required
              placeholder="Personal email preferred"
              className="mt-2 w-full border border-flag-blue/15 bg-paper-deep px-3 py-3 outline-none focus:border-flag-red"
            />
          </label>
        </div>

        <label className="flex cursor-pointer items-start gap-3 border border-flag-blue/10 bg-paper-deep p-4">
          <input name="anonymous" type="checkbox" className="mt-1 accent-[#bf0a30]" />
          <span className="text-sm leading-relaxed text-slate">
            <span className="font-semibold text-flag-blue">Limit how my name appears in the desk log.</span>{" "}
            We still need an email to follow up. Stories can run document-first if you must stay
            unnamed in publication.
          </span>
        </label>

        <label className="block text-sm">
          <span className="font-condensed text-[0.7rem] tracking-[0.18em] text-flag-blue uppercase">
            Timeline (dates, places, units — as specific as safe)
          </span>
          <textarea
            name="timeline"
            rows={3}
            placeholder="Example: Jan–Mar 2025 · installation · office that stalled · who was told"
            className="mt-2 w-full border border-flag-blue/15 bg-paper-deep px-3 py-3 outline-none focus:border-flag-red"
          />
        </label>

        <label className="block text-sm">
          <span className="font-condensed text-[0.7rem] tracking-[0.18em] text-flag-blue uppercase">
            Documents you can share later
          </span>
          <textarea
            name="docs"
            rows={2}
            placeholder="Work orders, emails, referral tickets, counseling notes, photos of conditions…"
            className="mt-2 w-full border border-flag-blue/15 bg-paper-deep px-3 py-3 outline-none focus:border-flag-red"
          />
        </label>

        <label className="block text-sm">
          <span className="font-condensed text-[0.7rem] tracking-[0.18em] text-flag-blue uppercase">
            What happened — the tip
          </span>
          <textarea
            name="message"
            required
            rows={10}
            placeholder="Write the story the climate survey will never capture. Who was harmed. What was promised. What was delivered. What you still need the public to know."
            className="mt-2 w-full border border-flag-blue/15 bg-paper-deep px-3 py-3 text-base leading-relaxed outline-none focus:border-flag-red"
          />
        </label>

        <div className="flex flex-col gap-4 border-t border-flag-blue/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-xs leading-relaxed text-aluminum">
            Submitting does not create attorney-client privilege. We are independent journalists.
            Never send classified material.
          </p>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn-copper shrink-0 !bg-flag-red disabled:opacity-60"
          >
            {status === "loading" ? "Encrypting to desk…" : "Submit secure tip"}
          </button>
        </div>

        {status === "error" && (
          <p className="border border-flag-red/30 bg-flag-red/5 px-4 py-3 text-sm text-flag-red">
            {error}
          </p>
        )}
      </div>
      <div className="usa-rule" />
    </form>
  );
}
