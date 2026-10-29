import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import type {
	AccountInfo,
	ExecutiveReports,
	RepositoryDetail,
	RepositorySummary,
} from "./types";

/**
 * Server-side reads of the Go backend's web API. The browser reaches the
 * same endpoints through the /pyscn-bot/api rewrite; these pages render on
 * the server, so the session cookie is forwarded by hand instead.
 */

const LOGIN_URL = "/pyscn-bot/api/auth?plan=account";

async function botApi(path: string): Promise<Response> {
	const session = (await cookies()).get("session")?.value;
	if (!session) redirect(LOGIN_URL);

	const origin = process.env.PYSCN_BOT_API_ORIGIN;
	if (!origin) throw new Error("PYSCN_BOT_API_ORIGIN is required");

	const res = await fetch(`${origin}/pyscn-bot/api${path}`, {
		headers: { cookie: `session=${session}` },
		cache: "no-store",
	});
	if (res.status === 401) redirect(LOGIN_URL);
	return res;
}

async function botJson<T>(path: string): Promise<T> {
	const res = await botApi(path);
	if (!res.ok) throw new Error(`${path} responded ${res.status}`);
	return (await res.json()) as T;
}

export function getAccount(): Promise<AccountInfo> {
	return botJson<AccountInfo>("/account");
}

export async function getRepositories(): Promise<RepositorySummary[]> {
	const body = await botJson<{ repositories: RepositorySummary[] }>(
		"/dashboard/repositories",
	);
	return body.repositories;
}

export async function getRepository(repo: string): Promise<RepositoryDetail> {
	const path = `/dashboard/repositories/${encodeURIComponent(repo)}`;
	const res = await botApi(path);
	if (res.status === 404) notFound();
	if (!res.ok) throw new Error(`${path} responded ${res.status}`);
	return (await res.json()) as RepositoryDetail;
}

/** Null when the account is not on the Enterprise plan. */
export async function getExecutiveReports(): Promise<ExecutiveReports | null> {
	const path = "/dashboard/executive";
	const res = await botApi(path);
	if (res.status === 403) return null;
	if (!res.ok) throw new Error(`${path} responded ${res.status}`);
	return (await res.json()) as ExecutiveReports;
}
