"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { CONTACT_VALIDATION } from "@/lib/pyscn-bot-contact";

type Status = "idle" | "submitting" | "sent" | "error";

/* Outcome of a confirmation link, passed back by the API as ?subscription= */
const CONFIRM_RESULTS: Record<
	string,
	{ key: "confirmed" | "invalid" | "failed"; done: boolean }
> = {
	confirmed: { key: "confirmed", done: true },
	invalid: { key: "invalid", done: false },
	error: { key: "failed", done: false },
};

function Notice({
	tone,
	title,
	message,
}: {
	tone: "ok" | "over";
	title: string;
	message: string;
}) {
	return (
		<div
			className={`border border-[var(--border-light)] border-l-2 bg-[var(--bg-card)] p-6 ${tone === "ok" ? "border-l-[var(--reading-ok)]" : "border-l-[var(--reading-over)]"}`}
		>
			<h3 className="mb-2 font-semibold text-[var(--text-primary)]">{title}</h3>
			<p className="text-sm text-[var(--text-light)]">{message}</p>
		</div>
	);
}

/* Optional double opt-in for product update emails */
export default function SubscribeForm({
	confirmResult,
}: {
	confirmResult?: string;
}) {
	const t = useTranslations("subscribe");
	const locale = useLocale();
	const [status, setStatus] = useState<Status>("idle");
	const [errorText, setErrorText] = useState("");
	const result = confirmResult ? CONFIRM_RESULTS[confirmResult] : undefined;

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus("submitting");
		const email = new FormData(event.currentTarget).get("email");

		try {
			const response = await fetch("/pyscn-bot/api/subscribe", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, locale }),
			});
			if (response.ok) {
				setStatus("sent");
				return;
			}
			const body = await response.json();
			setErrorText(body.error || "An error occurred");
		} catch {
			setErrorText("Network error. Please try again.");
		}
		setStatus("error");
	}

	return (
		<section className="mt-12" aria-labelledby="subscribe-title">
			<h2
				id="subscribe-title"
				className="mb-2 text-lg font-semibold text-[var(--text-primary)]"
			>
				{t("title")}
			</h2>
			<p className="mb-6 text-sm leading-relaxed text-[var(--text-light)]">
				{t("description")}
			</p>

			{result && status === "idle" && (
				<div className="mb-6">
					<Notice
						tone={result.done ? "ok" : "over"}
						title={t(`${result.key}.title`)}
						message={t(`${result.key}.message`)}
					/>
				</div>
			)}

			{status === "sent" ? (
				<Notice tone="ok" title={t("sent.title")} message={t("sent.message")} />
			) : (
				!result?.done && (
					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-3 sm:flex-row"
					>
						<label htmlFor="subscribe-email" className="sr-only">
							{t("email")}
						</label>
						<input
							type="email"
							id="subscribe-email"
							name="email"
							required
							autoComplete="email"
							placeholder="you@example.com"
							maxLength={CONTACT_VALIDATION.EMAIL_MAX_LENGTH}
							className="w-full border border-[var(--border-light)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--brand-blue)]"
						/>
						<button
							type="submit"
							disabled={status === "submitting"}
							className="inline-flex shrink-0 items-center justify-center border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)] disabled:cursor-not-allowed disabled:opacity-50"
						>
							{t("submit")} →
						</button>
					</form>
				)
			)}

			{status === "error" && (
				<div className="mt-6">
					<Notice tone="over" title={t("error.title")} message={errorText} />
				</div>
			)}
		</section>
	);
}
