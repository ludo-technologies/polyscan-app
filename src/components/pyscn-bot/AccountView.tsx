"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

/**
 * Shape returned by the Go backend's GET /pyscn-bot/api/account
 * (webauth.AccountInfo in pyscn-bot).
 */
interface AccountResponse {
	userId: number;
	login: string;
	planName: string; // "free" | "pro" | "team"
	isPaid: boolean;
	updatedAt: string | null;
	hasStripeSubscription: boolean;
}

type ViewState =
	| { status: "loading" }
	| { status: "error" }
	| { status: "ready"; data: AccountResponse };

function Silkscreen({ children }: { children: React.ReactNode }) {
	return (
		<p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-muted)]">
			{children}
		</p>
	);
}

function Notice({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex min-h-screen items-center justify-center px-4">
			<p className="font-mono text-sm text-[var(--text-muted)]">{children}</p>
		</main>
	);
}

export default function AccountView() {
	const t = useTranslations();
	const [state, setState] = useState<ViewState>({ status: "loading" });

	useEffect(() => {
		let cancelled = false;

		fetch("/pyscn-bot/api/account")
			.then(async (res) => {
				if (res.status === 401) {
					window.location.href = "/pyscn-bot/api/auth?plan=account";
					return;
				}
				if (!res.ok) throw new Error(`Unexpected status ${res.status}`);
				const data = (await res.json()) as AccountResponse;
				if (!cancelled) setState({ status: "ready", data });
			})
			.catch(() => {
				if (!cancelled) setState({ status: "error" });
			});

		return () => {
			cancelled = true;
		};
	}, []);

	if (state.status === "loading") return <Notice>Loading…</Notice>;
	if (state.status === "error")
		return <Notice>Something went wrong. Please try again.</Notice>;

	const { login, userId, planName, isPaid, updatedAt, hasStripeSubscription } =
		state.data;

	return (
		<main className="min-h-screen pt-16 pb-16">
			<div className="mx-auto max-w-2xl px-4 sm:px-6">
				<a
					href="/pyscn-bot"
					className="mb-8 inline-flex font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-secondary)] transition-colors hover:text-[var(--brand-blue)]"
				>
					← Polyscan
				</a>

				<Silkscreen>Account</Silkscreen>
				<h1 className="type-display mt-3 mb-8 text-4xl font-bold text-[var(--text-primary)]">
					{t("nav.mypage")}
				</h1>

				<div className="border border-[var(--border-light)] bg-[var(--bg-card)]">
					<div className="flex items-center gap-4 border-b border-[var(--border-subtle)] p-5">
						{/* biome-ignore lint/performance/noImgElement: external GitHub avatar URL, not a local/optimizable asset */}
						<img
							src={`https://github.com/${login}.png`}
							alt={login}
							className="size-14 border border-[var(--border-subtle)]"
						/>
						<div>
							<h2 className="font-mono text-lg font-bold text-[var(--text-primary)]">
								{login}
							</h2>
							<p className="font-mono text-xs text-[var(--text-muted)]">
								GitHub ID {userId}
							</p>
						</div>
					</div>

					<div className="p-5">
						<Silkscreen>Plan</Silkscreen>
						<div className="mt-3 flex items-baseline gap-3">
							<span
								className="font-mono text-3xl font-bold"
								style={{
									color: isPaid ? "var(--brand-blue)" : "var(--text-primary)",
								}}
							>
								{planName.toUpperCase()}
							</span>
							{updatedAt && (
								<span className="font-mono text-xs text-[var(--text-muted)]">
									since {new Date(updatedAt).toLocaleDateString()}
								</span>
							)}
						</div>

						{!isPaid && (
							<div className="mt-6 border border-[var(--border-subtle)] border-t-2 border-t-[var(--brand-blue)] bg-[var(--bg-subtle)] p-4">
								<p className="mb-3 text-sm text-[var(--text-light)]">
									Upgrade to Pro for unlimited analysis
								</p>
								<a
									href="/pyscn-bot/api/auth?plan=pro"
									className="inline-flex border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)]"
								>
									Upgrade to Pro →
								</a>
							</div>
						)}

						{hasStripeSubscription && (
							<div className="mt-6 border-t border-[var(--border-subtle)] pt-6">
								<Silkscreen>Subscription</Silkscreen>
								<a
									href="/pyscn-bot/api/billing-portal"
									className="mt-3 inline-flex border border-[var(--border-light)] bg-[var(--bg-card)] px-4 py-2 font-mono text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--brand-blue)] hover:text-[var(--brand-blue)]"
								>
									Manage subscription →
								</a>
								<p className="mt-2 text-xs text-[var(--text-muted)]">
									Change plan, update payment method, or cancel
								</p>
							</div>
						)}
					</div>
				</div>

				<div className="mt-8">
					<a
						href="/pyscn-bot/api/logout"
						className="font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
					>
						Logout
					</a>
				</div>
			</div>
		</main>
	);
}
