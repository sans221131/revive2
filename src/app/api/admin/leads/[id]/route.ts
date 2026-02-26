import { NextResponse } from "next/server";
import pool from "@/lib/db";

const TOKEN = "revive2-admin-session";

const VALID_STATUSES = ["new", "contacted", "interested", "not_interested", "admission_done"] as const;
type LeadStatus = (typeof VALID_STATUSES)[number];

function isAuthed(request: Request) {
	return request.headers.get("x-admin-token") === TOKEN;
}

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	if (!isAuthed(request)) {
		return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
	}
	try {
		const { id } = await params;
		const { status } = (await request.json()) as { status?: string };

		if (!status || !VALID_STATUSES.includes(status as LeadStatus)) {
			return NextResponse.json({ message: "Invalid status value." }, { status: 400 });
		}

		const result = await pool.query(
			`UPDATE contacts SET status = $1 WHERE id = $2 RETURNING id, name, status`,
			[status, id],
		);

		if (result.rowCount === 0) {
			return NextResponse.json({ message: "Lead not found." }, { status: 404 });
		}

		return NextResponse.json({ lead: result.rows[0] });
	} catch (err) {
		console.error("[admin leads PATCH]", err);
		return NextResponse.json({ message: "Failed to update lead." }, { status: 500 });
	}
}
