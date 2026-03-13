"use client";

import React from "react";
import Link from "next/link";

import data from "../../data/amity_mba_curriculum.json";

export default function SemesterCurriculum() {
  const semesters = Array.isArray(data) ? data : [];

  return (
    <section id="curriculum" className="container-shell my-16">
      <div className="rounded-2xl border border-[#E6E9EE] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6C7676]">Curriculum</p>
                <h3 className="text-lg font-bold leading-snug text-[#0A2C59] md:text-xl">Semester-wise Curriculum</h3>
                <p className="mt-1 text-xs text-[#6C7676]">Official Amity Online MBA curriculum (from brochure)</p>
          </div>
          <div className="shrink-0">
            <Link href="/api/brochure" target="_blank" className="inline-flex items-center gap-2 rounded-full bg-[#0A2C59] px-4 py-2 text-sm font-semibold text-white">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v12" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 11l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Download
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {semesters.map((s: any, idx: number) => (
            <details key={idx} className="group overflow-hidden rounded-lg border border-[#EEF1F5] bg-white transition-shadow duration-150">
              <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A2C59] text-white font-semibold">{idx + 1}</div>
                  <div>
                    <div className="text-base font-medium text-[#0A2C59]">{s.semester_hint || `Semester ${s.semester_index || idx + 1}`}</div>
                    {s.notes ? <div className="text-xs text-[#6C7676] mt-0.5">{s.notes}</div> : null}
                  </div>
                </div>
                <div className="shrink-0">
                  <svg className="h-5 w-5 text-[#9AA6B2] transition-transform duration-150 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </summary>

              <div className="px-6 pb-6 pt-2">
                <ul className="space-y-2">
                  {(s.courses || []).slice(0, 100).map((c: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-2 w-2 flex-shrink-0 rounded-full bg-[#0A2C59]" />
                      <span className="text-sm text-[#34414A]">{c.replace(/^•\s*/, "")}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
