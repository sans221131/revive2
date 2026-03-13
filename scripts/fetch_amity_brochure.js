const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const PDF_URL = 'https://amityonline.com/PDF/brochure/FINAL-MBA.pdf';
const OUT_DIR = path.resolve(__dirname, '..', 'data');
const PDF_PATH = path.resolve(__dirname, 'FINAL-MBA.pdf');
const OUT_JSON = path.join(OUT_DIR, 'amity_mba_curriculum.json');
const OUT_TEXT = path.join(OUT_DIR, 'FINAL-MBA.txt');

async function downloadPdf() {
  console.log('Downloading PDF:', PDF_URL);
  const res = await fetch(PDF_URL);
  if (!res.ok) throw new Error(`Failed to download PDF: ${res.status} ${res.statusText}`);
  const buffer = await res.buffer();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(PDF_PATH, buffer);
  console.log('Saved PDF to', PDF_PATH);
  return buffer;
}

function parseSemestersFromText(text) {
  const lines = text.split(/\r?\n/).map(l => l.replace(/\u00A0/g, ' ').trim()).filter(Boolean);

  // Find lines that indicate semester headers
  const headerRegexes = [
    /semester\s*[:\-]?\s*(\d+)/i,
    /sem\.?\s*(\d+)/i,
    /semester\s*(i|ii|iii|iv)/i,
    /^semester\b/i,
  ];

  const headerIndices = [];
  lines.forEach((line, idx) => {
    for (const rx of headerRegexes) {
      const m = line.match(rx);
      if (m) {
        headerIndices.push({ idx, line, match: m[1] || null });
        break;
      }
    }
  });

  // If we didn't find headers, try to find explicit 'Semester 1' variants in the whole text
  if (headerIndices.length === 0) {
    lines.forEach((line, idx) => {
      if (/semester\s*[1-4]/i.test(line) || /sem\.?\s*[1-4]/i.test(line)) headerIndices.push({ idx, line });
    });
  }

  // If still none, fallback: try to find 'Semester' words and nearby context
  if (headerIndices.length === 0) {
    lines.forEach((line, idx) => {
      if (/semester/i.test(line)) headerIndices.push({ idx, line });
    });
  }

  // Build segments between headers
  const segments = [];
  if (headerIndices.length > 0) {
    for (let i = 0; i < headerIndices.length; i++) {
      const start = headerIndices[i].idx + 1; // content after header line
      const end = i + 1 < headerIndices.length ? headerIndices[i + 1].idx : lines.length;
      const segmentLines = lines.slice(start, end).map(l => l.replace(/^\d+\.\s*/, '').trim());
      segments.push({ header: headerIndices[i].line, lines: segmentLines });
    }
  } else {
    // no headers at all; return the whole text as a single segment
    segments.push({ header: 'Full text', lines });
  }

  // For each segment, try to extract course-like lines (heuristic: lines with title case or containing keywords)
  const sems = [];
  segments.forEach((seg, idx) => {
    const candidates = [];
    for (const l of seg.lines) {
      // skip common footer words or page numbers
      if (/page\s*\d+/i.test(l)) continue;
      if (l.length < 5) continue;
      // skip lines that look like addresses or contact info
      if (/www\.|http|https|brochure|amity|contact|tel|email|@/i.test(l)) continue;
      // heuristics: lines that contain words and maybe commas
      if (/[A-Za-z].*/.test(l)) candidates.push(l);
      if (candidates.length >= 200) break;
    }

    sems.push({ header: seg.header, courses: candidates.slice(0, 200) });
  });

  return sems;
}

(async function main() {
  try {
    const buffer = await downloadPdf();
    console.log('Extracting text from PDF (this may take a moment)...');
    const data = await pdf(buffer);
    const text = data.text || '';
    fs.writeFileSync(OUT_TEXT, text, 'utf8');
    console.log('Saved extracted text to', OUT_TEXT);

    const semesters = parseSemestersFromText(text);

    const result = [];
    semesters.forEach((s, i) => {
      result.push({
        source_pdf_url: PDF_URL,
        local_pdf: PDF_PATH.replace(/\\/g, '/'),
        semester_hint: s.header,
        semester_index: i + 1,
        courses: s.courses,
        notes: 'Parsed heuristically from brochure text; verify manually.'
      });
    });

    fs.writeFileSync(OUT_JSON, JSON.stringify(result, null, 2), 'utf8');
    console.log('Wrote parsed JSON to', OUT_JSON);
    console.log('Summary: found', result.length, 'segments. Next: review data at', OUT_JSON);
  } catch (err) {
    console.error('Error:', err.message || err);
    process.exit(1);
  }
})();
