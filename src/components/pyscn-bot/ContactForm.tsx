"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { CONTACT_VALIDATION } from "@/lib/pyscn-bot-contact";

type Status = "idle" | "submitting" | "success" | "error";

const labelClass =
	"mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-label)]";
const fieldClass =
	"w-full border border-[var(--border-light)] bg-[var(--bg-card)] px-4 py-3 text-[var(--text-primary)] outline-none transition-colors focus:border-[var(--brand-blue)]";

export default function ContactForm() {
	const t = useTranslations();
	const [status, setStatus] = useState<Status>("idle");
	const [errorText, setErrorText] = useState("");

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setStatus("submitting");

		const form = event.currentTarget;
		const formData = new FormData(form);
		const data = {
			name: formData.get("name"),
			email: formData.get("email"),
			message: formData.get("message"),
		};

		try {
			const response = await fetch("/pyscn-bot/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			const result = await response.json();

			if (response.ok) {
				form.reset();
				setStatus("success");
			} else {
				setErrorText(result.error || "An error occurred");
				setStatus("error");
			}
		} catch {
			setErrorText("Network error. Please try again.");
			setStatus("error");
		}
	}

	if (status === "success") {
		return (
			<div className="border border-[var(--border-light)] border-l-2 border-l-[var(--reading-ok)] bg-[var(--bg-card)] p-6">
				<h2 className="mb-2 font-semibold text-[var(--text-primary)]">
					{t("contact.success.title")}
				</h2>
				<p className="text-sm text-[var(--text-light)]">
					{t("contact.success.message")}
				</p>
			</div>
		);
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-6">
				<div>
					<label htmlFor="name" className={labelClass}>
						{t("contact.name")}{" "}
						<span className="text-[var(--reading-over)]">*</span>
					</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						maxLength={CONTACT_VALIDATION.NAME_MAX_LENGTH}
						className={fieldClass}
					/>
				</div>

				<div>
					<label htmlFor="email" className={labelClass}>
						{t("contact.email")}{" "}
						<span className="text-[var(--reading-over)]">*</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						maxLength={CONTACT_VALIDATION.EMAIL_MAX_LENGTH}
						className={fieldClass}
					/>
				</div>

				<div>
					<label htmlFor="message" className={labelClass}>
						{t("contact.message")}{" "}
						<span className="text-[var(--reading-over)]">*</span>
					</label>
					<textarea
						id="message"
						name="message"
						required
						rows={6}
						minLength={CONTACT_VALIDATION.MESSAGE_MIN_LENGTH}
						maxLength={CONTACT_VALIDATION.MESSAGE_MAX_LENGTH}
						className={`${fieldClass} resize-none`}
					/>
				</div>

				<button
					type="submit"
					disabled={status === "submitting"}
					className="inline-flex border border-[var(--brand-blue)] bg-[var(--brand-blue)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-blue-hover)] disabled:cursor-not-allowed disabled:opacity-50"
				>
					{t("contact.submit")} →
				</button>
			</form>

			{status === "error" && (
				<div className="mt-8 border border-[var(--border-light)] border-l-2 border-l-[var(--reading-over)] bg-[var(--bg-card)] p-6">
					<h2 className="mb-2 font-semibold text-[var(--text-primary)]">
						{t("contact.error.title")}
					</h2>
					<p className="text-sm text-[var(--reading-over)]">{errorText}</p>
				</div>
			)}
		</>
	);
}
