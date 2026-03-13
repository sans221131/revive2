import fs from "fs";
import path from "path";

export async function GET() {
  const pdfPath = path.join(process.cwd(), "data", "FINAL-MBA.pdf");
  try {
    const file = await fs.promises.readFile(pdfPath);
    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="FINAL-MBA.pdf"',
      },
    });
  } catch (err) {
    return new Response("Brochure not found.", { status: 404 });
  }
}
