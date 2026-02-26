import { NextResponse } from "next/server";
import pool from "@/lib/db";

const TOKEN = "revive2-admin-session";

function isAuthed(request: Request) {
	return request.headers.get("x-admin-token") === TOKEN;
}

const VALID_STATUSES = ["new", "contacted", "interested", "not_interested", "admission_done"] as const;
type LeadStatus = (typeof VALID_STATUSES)[number];

export async function GET(request: Request) {
	if (!isAuthed(request)) {
		return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
	}
	try {
		const { searchParams } = new URL(request.url);
		const status = searchParams.get("status");

		let query = `SELECT id, name, phone, email, city, status, created_at FROM contacts`;
		const params: string[] = [];

		if (status && VALID_STATUSES.includes(status as LeadStatus)) {
			query += ` WHERE status = $1`;
			params.push(status);
		}
		query += ` ORDER BY created_at DESC`;

		const result = await pool.query(query, params);
		return NextResponse.json({ leads: result.rows });
	} catch (err) {
		console.error("[admin leads GET]", err);
		return NextResponse.json({ message: "Failed to fetch leads." }, { status: 500 });
	}
}
