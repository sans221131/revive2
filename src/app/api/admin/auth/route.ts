import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "revive2@onlinemba";
const TOKEN = "revive2-admin-session";

export async function POST(request: Request) {
	try {
		const { password } = (await request.json()) as { password?: string };
		if (password === ADMIN_PASSWORD) {
			return NextResponse.json({ token: TOKEN });
		}
		return NextResponse.json({ message: "Invalid password." }, { status: 401 });
	} catch {
		return NextResponse.json({ message: "Bad request." }, { status: 400 });
	}
}
