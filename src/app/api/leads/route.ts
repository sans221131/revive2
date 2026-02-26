import { NextResponse } from "next/server";
import { ContactInsertSchema } from "@/lib/schemas/contacts";
import pool from "@/lib/db";

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const parsed = ContactInsertSchema.safeParse(body);

		if (!parsed.success) {
			return NextResponse.json(
				{ message: "Please provide valid name, phone, email, and city values." },
				{ status: 400 },
			);
		}

		const { name, phone, email, city } = parsed.data;

		await pool.query(
			`INSERT INTO contacts (name, phone, email, city) VALUES ($1, $2, $3, $4)`,
			[name, phone, email, city],
		);

		return NextResponse.json(
			{ message: "Enquiry submitted successfully." },
			{ status: 201 },
		);
	} catch (err) {
		console.error("[leads POST]", err);
		return NextResponse.json({ message: "Unable to process enquiry right now." }, { status: 500 });
	}
}
