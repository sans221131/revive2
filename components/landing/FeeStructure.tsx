"use client";

import React from "react";
import { useEnquireModal } from "../../src/lib/enquire-context";

export default function FeeStructure() {
  const cards = [
    { title: "24 Months Zero Cost EMI", amount: "INR 8,292/-", sub: "Interest-free" },
    { title: "Per Semester Fee", amount: "INR 49,750/-", sub: "" },
    { title: "Full Course Fee", amount: "INR 1,99,000/-", sub: "" , featured: true },
    { title: "Attractive Scholarships Available", amount: "", sub: "" },
  ];

  const { openModal } = useEnquireModal();

  return (
    <section className="container-shell my-12">
      <div className="text-center">
        <h2 className="mb-2 text-2xl font-semibold text-[#0A2C59]">Fee Structure</h2>
        <div className="mx-auto mb-6 h-0.5 w-24 rounded-full bg-[#FACB06]" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c, i) => {
          const base = "rounded-2xl p-6 shadow-sm";
          if (c.featured) {
            return (
              <div key={i} className={`${base} bg-[#0A2C59] text-white shadow-[0_8px_30px_rgba(10,44,89,0.25)]`}>
                <p className="text-sm font-medium text-white/90">{c.title}</p>
                <p className="mt-4 text-2xl font-bold text-white">{c.amount || "INR 1,99,000/-"}</p>
                {c.sub ? <p className="mt-1 text-xs text-white/80">{c.sub}</p> : null}
              </div>
            );
          }

          return (
            <div key={i} className={`${base} border border-[#E6E8EC] bg-white text-left`}>
              <p className="text-sm font-medium text-[#6C7676]">{c.title}</p>
              <p className="mt-4 text-2xl font-bold text-[#0A2C59]">{c.amount || ""}</p>
              {c.sub ? <p className="mt-1 text-xs text-[#6C7676]">{c.sub}</p> : null}
              {!c.amount && (
                <div className="mt-4">
                  <p className="mb-3 text-sm text-[#34414A]">Contact us for scholarship details and eligibility.</p>
                  <button onClick={() => openModal()} className="inline-flex items-center gap-2 rounded-full bg-[#FACB06] px-4 py-2 text-sm font-semibold text-[#041428]">Check Eligibility</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
