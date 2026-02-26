"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type LeadStatus = "new" | "contacted" | "interested" | "not_interested" | "admission_done";

interface Lead {
	id: number;
	name: string;
	phone: string;
	email: string;
	city: string;
	status: LeadStatus;
	created_at: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TOKEN_KEY = "revive2_admin_token";
const SESSION_TOKEN = "revive2-admin-session";

const STATUS_OPTIONS: { value: LeadStatus; label: string }[] = [
	{ value: "new", label: "New" },
	{ value: "contacted", label: "Contacted" },
	{ value: "interested", label: "Interested" },
	{ value: "not_interested", label: "Not Interested" },
	{ value: "admission_done", label: "Admission Done" },
];

const STATUS_STYLES: Record<LeadStatus, string> = {
	new: "bg-blue-50 text-blue-700 border border-blue-200",
	contacted: "bg-amber-50 text-amber-700 border border-amber-200",
	interested: "bg-emerald-50 text-emerald-700 border border-emerald-200",
	not_interested: "bg-red-50 text-red-700 border border-red-200",
	admission_done: "bg-[#FACB06]/10 text-[#7A6000] border border-[#FACB06]/40",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(dateStr: string) {
	return new Date(dateStr).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}

// ─── Login Screen ─────────────────────────────────────────────────────────────

function LoginScreen({ onAuth }: { onAuth: () => void }) {
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			const res = await fetch("/api/admin/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password }),
			});
			if (!res.ok) {
				setError("Incorrect password. Please try again.");
				return;
			}
			sessionStorage.setItem(TOKEN_KEY, SESSION_TOKEN);
			onAuth();
		} catch {
			setError("Unable to connect. Please retry.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-[#F7F7F7]">
			<div className="w-full max-w-sm rounded-2xl border border-[#E6E8EC] bg-white p-8 shadow-[0_4px_32px_rgba(10,44,89,0.08)]">
				{/* Logo / Brand */}
				<div className="mb-8 text-center">
					<div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A2C59]">
						<svg viewBox="0 0 24 24" className="h-6 w-6 text-[#FACB06]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
							<rect x="3" y="11" width="18" height="11" rx="2" />
							<path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
						</svg>
					</div>
					<h1 className="text-lg font-bold text-[#0A2C59]" style={{ fontFamily: "var(--font-libre-baskerville), serif" }}>
						Admin Portal
					</h1>
					<p className="mt-1 text-sm text-[#6C7676]">Amity Online MBA Leads</p>
				</div>

				<form onSubmit={submit} className="space-y-4">
					<div>
						<label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#6C7676]">
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Enter admin password"
							className="w-full rounded-xl border border-[#E6E8EC] bg-[#F7F7F7] px-4 py-2.5 text-sm text-[#0A2C59] placeholder-[#AAAAAA] outline-none transition focus:border-[#0A2C59]/40 focus:bg-white focus:ring-2 focus:ring-[#0A2C59]/10"
						/>
					</div>
					{error && (
						<p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
					)}
					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-xl bg-[#0A2C59] py-2.5 text-sm font-semibold text-white transition hover:bg-[#0A2C59]/90 disabled:opacity-50"
					>
						{loading ? "Verifying…" : "Sign In"}
					</button>
				</form>
			</div>
		</div>
	);
}

// ─── Status Pill ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: LeadStatus }) {
	const label = STATUS_OPTIONS.find((s) => s.value === status)?.label ?? status;
	return (
		<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
			{label}
		</span>
	);
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar({ leads }: { leads: Lead[] }) {
	const total = leads.length;
	const counts = STATUS_OPTIONS.reduce(
		(acc, s) => ({ ...acc, [s.value]: leads.filter((l) => l.status === s.value).length }),
		{} as Record<LeadStatus, number>,
	);

	return (
		<div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
			<div className="rounded-xl border border-[#E6E8EC] bg-white p-4">
				<p className="text-2xl font-bold text-[#0A2C59]">{total}</p>
				<p className="mt-0.5 text-xs text-[#6C7676]">Total Leads</p>
			</div>
			{STATUS_OPTIONS.map((s) => (
				<div key={s.value} className="rounded-xl border border-[#E6E8EC] bg-white p-4">
					<p className="text-2xl font-bold text-[#0A2C59]">{counts[s.value]}</p>
					<p className="mt-0.5 text-xs text-[#6C7676]">{s.label}</p>
				</div>
			))}
		</div>
	);
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

function Dashboard({ onLogout }: { onLogout: () => void }) {
	const [leads, setLeads] = useState<Lead[]>([]);
	const [filter, setFilter] = useState<LeadStatus | "all">("all");
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [updating, setUpdating] = useState<number | null>(null);

	const token = SESSION_TOKEN;

	const fetchLeads = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const url = filter !== "all" ? `/api/admin/leads?status=${filter}` : "/api/admin/leads";
			const res = await fetch(url, { headers: { "x-admin-token": token } });
			if (!res.ok) throw new Error("Failed to fetch.");
			const data = (await res.json()) as { leads: Lead[] };
			setLeads(data.leads);
		} catch {
			setError("Could not load leads. Check your database connection.");
		} finally {
			setLoading(false);
		}
	}, [filter, token]);

	useEffect(() => {
		void fetchLeads();
	}, [fetchLeads]);

	const updateStatus = async (id: number, status: LeadStatus) => {
		setUpdating(id);
		try {
			const res = await fetch(`/api/admin/leads/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json", "x-admin-token": token },
				body: JSON.stringify({ status }),
			});
			if (!res.ok) throw new Error();
			setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
		} catch {
			alert("Failed to update status.");
		} finally {
			setUpdating(null);
		}
	};

	const visible = leads.filter(
		(l) =>
			search.trim() === "" ||
			l.name.toLowerCase().includes(search.toLowerCase()) ||
			l.email.toLowerCase().includes(search.toLowerCase()) ||
			l.phone.includes(search) ||
			l.city.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="min-h-screen bg-[#F7F7F7]">
			{/* Top bar */}
			<header className="sticky top-0 z-20 border-b border-[#E6E8EC] bg-white px-6 py-4">
				<div className="mx-auto flex max-w-7xl items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A2C59]">
							<svg viewBox="0 0 24 24" className="h-4 w-4 text-[#FACB06]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
								<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
								<circle cx="9" cy="7" r="4" />
								<path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
							</svg>
						</div>
						<div>
							<h1 className="text-sm font-bold text-[#0A2C59]">Leads Dashboard</h1>
							<p className="text-xs text-[#6C7676]">Amity Online MBA</p>
						</div>
					</div>
					<button
						onClick={onLogout}
						className="rounded-lg border border-[#E6E8EC] px-3 py-1.5 text-xs font-medium text-[#6C7676] transition hover:border-[#0A2C59]/30 hover:text-[#0A2C59]"
					>
						Sign Out
					</button>
				</div>
			</header>

			<main className="mx-auto max-w-7xl px-6 py-8">
				{/* Stats */}
				{!loading && !error && <StatsBar leads={leads} />}

				{/* Filters + Search */}
				<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					{/* Status filter tabs */}
					<div className="flex flex-wrap gap-2">
						<button
							onClick={() => setFilter("all")}
							className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
								filter === "all"
									? "bg-[#0A2C59] text-white"
									: "border border-[#E6E8EC] bg-white text-[#6C7676] hover:text-[#0A2C59]"
							}`}
						>
							All
						</button>
						{STATUS_OPTIONS.map((s) => (
							<button
								key={s.value}
								onClick={() => setFilter(s.value)}
								className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
									filter === s.value
										? "bg-[#0A2C59] text-white"
										: "border border-[#E6E8EC] bg-white text-[#6C7676] hover:text-[#0A2C59]"
								}`}
							>
								{s.label}
							</button>
						))}
					</div>

					{/* Search */}
					<div className="relative w-full sm:w-64">
						<svg
							viewBox="0 0 24 24"
							className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#AAAAAA]"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden
						>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.35-4.35" strokeLinecap="round" />
						</svg>
						<input
							type="search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search name, email, phone…"
							className="w-full rounded-xl border border-[#E6E8EC] bg-white py-2 pl-9 pr-4 text-xs text-[#0A2C59] placeholder-[#AAAAAA] outline-none focus:border-[#0A2C59]/40 focus:ring-2 focus:ring-[#0A2C59]/10"
						/>
					</div>
				</div>

				{/* Table */}
				<div className="overflow-hidden rounded-2xl border border-[#E6E8EC] bg-white shadow-[0_2px_12px_rgba(10,44,89,0.05)]">
					{loading ? (
						<div className="flex items-center justify-center py-24 text-sm text-[#6C7676]">
							Loading leads…
						</div>
					) : error ? (
						<div className="flex flex-col items-center justify-center gap-3 py-24">
							<p className="text-sm text-red-600">{error}</p>
							<button
								onClick={fetchLeads}
								className="rounded-lg bg-[#0A2C59] px-4 py-2 text-xs font-medium text-white hover:bg-[#0A2C59]/90"
							>
								Retry
							</button>
						</div>
					) : visible.length === 0 ? (
						<div className="flex items-center justify-center py-24 text-sm text-[#6C7676]">
							No leads found.
						</div>
					) : (
						<div className="overflow-x-auto">
							<table className="w-full text-left text-sm">
								<thead>
									<tr className="border-b border-[#E6E8EC] bg-[#F7F7F7]">
										<th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6C7676]">#</th>
										<th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6C7676]">Name</th>
										<th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6C7676]">Phone</th>
										<th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6C7676]">Email</th>
										<th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6C7676]">City</th>
										<th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6C7676]">Date</th>
										<th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#6C7676]">Status</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-[#E6E8EC]">
									{visible.map((lead) => (
										<tr key={lead.id} className="transition hover:bg-[#F7F7F7]/60">
											<td className="px-4 py-3.5 text-xs text-[#6C7676]">{lead.id}</td>
											<td className="px-4 py-3.5 font-medium text-[#0A2C59]">{lead.name}</td>
											<td className="px-4 py-3.5 text-[#6C7676]">
												<a href={`tel:${lead.phone}`} className="hover:text-[#0A2C59] hover:underline">
													{lead.phone}
												</a>
											</td>
											<td className="px-4 py-3.5 text-[#6C7676]">
												<a href={`mailto:${lead.email}`} className="hover:text-[#0A2C59] hover:underline">
													{lead.email}
												</a>
											</td>
											<td className="px-4 py-3.5 text-[#6C7676]">{lead.city}</td>
											<td className="whitespace-nowrap px-4 py-3.5 text-xs text-[#6C7676]">
												{fmt(lead.created_at)}
											</td>
											<td className="px-4 py-3.5">
												<div className="relative inline-flex items-center">
													<select
														value={lead.status}
														disabled={updating === lead.id}
														onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
														className={`cursor-pointer appearance-none rounded-full border py-1 pl-3 pr-7 text-xs font-medium outline-none transition focus:ring-2 focus:ring-[#0A2C59]/10 disabled:opacity-50 ${STATUS_STYLES[lead.status]}`}
													>
														{STATUS_OPTIONS.map((s) => (
															<option key={s.value} value={s.value}>
																{s.label}
															</option>
														))}
													</select>
													{updating === lead.id ? (
														<span className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 animate-spin rounded-full border border-current border-t-transparent opacity-50" />
													) : (
														<svg viewBox="0 0 24 24" className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 opacity-50" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
															<path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
														</svg>
													)}
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}
				</div>

				{!loading && !error && (
					<p className="mt-3 text-right text-xs text-[#6C7676]">
						Showing {visible.length} of {leads.length} leads
					</p>
				)}
			</main>
		</div>
	);
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminPage() {
	const [authed, setAuthed] = useState(false);

	// Restore session from sessionStorage
	useEffect(() => {
		if (sessionStorage.getItem(TOKEN_KEY) === SESSION_TOKEN) {
			setAuthed(true);
		}
	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem(TOKEN_KEY);
		setAuthed(false);
	};

	if (!authed) {
		return <LoginScreen onAuth={() => setAuthed(true)} />;
	}
	return <Dashboard onLogout={handleLogout} />;
}
