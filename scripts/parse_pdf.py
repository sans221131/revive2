import re
import json
from pathlib import Path
from pypdf import PdfReader

PDF_PATH = Path(__file__).resolve().parents[1] / 'data' / 'FINAL-MBA.pdf'
OUT_JSON = Path(__file__).resolve().parents[1] / 'data' / 'amity_mba_curriculum.json'
OUT_TEXT = Path(__file__).resolve().parents[1] / 'data' / 'FINAL-MBA.txt'

print('Reading PDF from', PDF_PATH)
reader = PdfReader(str(PDF_PATH))
text_pages = []
for p in reader.pages:
    try:
        text_pages.append(p.extract_text() or '')
    except Exception as e:
        text_pages.append('')

full_text = '\n'.join(text_pages)
OUT_TEXT.write_text(full_text, encoding='utf-8')
print('Saved extracted text to', OUT_TEXT)

# Split into lines
lines = [l.strip() for l in re.split(r"\r?\n", full_text) if l.strip()]

# Find semester headers
header_regexes = [re.compile(r"semester\s*[:\-]?\s*(\d+)", re.I),
                  re.compile(r"sem\.?\s*(\d+)", re.I),
                  re.compile(r"semester\s*(i|ii|iii|iv)", re.I),
                  re.compile(r"^semester\b", re.I)]

header_indices = []
for i, line in enumerate(lines):
    for rx in header_regexes:
        m = rx.search(line)
        if m:
            header_indices.append((i, line))
            break

if not header_indices:
    for i, line in enumerate(lines):
        if re.search(r'semester\s*[1-4]', line, re.I):
            header_indices.append((i, line))

if not header_indices:
    for i, line in enumerate(lines):
        if 'semester' in line.lower():
            header_indices.append((i, line))

segments = []
if header_indices:
    for idx, (start_idx, header_line) in enumerate(header_indices):
        end_idx = header_indices[idx+1][0] if idx+1 < len(header_indices) else len(lines)
        segment_lines = lines[start_idx+1:end_idx]
        # filter out footers and short lines
        segment_lines = [l for l in segment_lines if len(l) > 4 and not re.search(r'www\.|http|amity|page\s*\d+', l, re.I)]
        segments.append({'header': header_line, 'lines': segment_lines})
else:
    segments.append({'header': 'Full text', 'lines': lines})

result = []
for i, seg in enumerate(segments):
    # heuristically pick course-like lines: lines with at least 3 words or commas
    courses = [l for l in seg['lines'] if len(l.split()) >= 2]
    result.append({
        'source_pdf_path': str(PDF_PATH).replace('\\\\', '/'),
        'semester_hint': seg['header'],
        'semester_index': i+1,
        'courses': courses[:200],
        'notes': 'Heuristically parsed from brochure; verify manually.'
    })

OUT_JSON.write_text(json.dumps(result, indent=2, ensure_ascii=False), encoding='utf-8')
print('Wrote parsed JSON to', OUT_JSON)
print('Found', len(result), 'segments')
