"use client";

import { useState } from "react";
import Link from "next/link";
import { FIELD, LABEL, SUBMIT } from "@/components/FormUi";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="name">
            Full Name*
          </label>
          <input id="name" type="text" required className={FIELD} />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">
            Email Id*
          </label>
          <input id="email" type="email" required className={FIELD} />
        </div>
        <div>
          <label className={LABEL} htmlFor="phone">
            Contact Number*
          </label>
          <input id="phone" type="tel" required className={FIELD} />
        </div>
        <div>
          <label className={LABEL} htmlFor="company">
            Company Name
          </label>
          <input id="company" type="text" className={FIELD} />
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="message">
          Message*
        </label>
        <textarea id="message" rows={4} required className={`${FIELD} resize-none`} />
      </div>

      <label className="flex items-start gap-2 font-body text-xs font-semibold text-slate-500">
        <input type="checkbox" required className="mt-0.5 accent-primary" />
        <span>
          I agree that Gennext IT may use the details above to respond to my enquiry, as described in the{" "}
          <Link href="/MainSite/privacy_policy" className="text-primary-dark underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {submitted && (
        <p role="status" className="font-body text-sm font-semibold text-primary-dark">
          Form abhi connected nahi hai, isliye koi message nahi bheja gaya.
        </p>
      )}

      <div className="flex justify-end">
        <button type="submit" className={SUBMIT}>
          SEND
        </button>
      </div>
    </form>
  );
}