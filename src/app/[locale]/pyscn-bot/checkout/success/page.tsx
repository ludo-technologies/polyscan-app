import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BotWordmark from "@/components/pyscn-bot/BotWordmark";
import Logo from "@/components/pyscn-bot/icons/Logo";
import LanguageSwitcher from "@/components/pyscn-bot/LanguageSwitcher";
import { Link } from "@/i18n/navigation";
import { pyscnBotAlternates } from "@/lib/pyscn-bot-metadata";

const GITHUB_APP_INSTALL_URL = "https://github.com/apps/polyscan-app";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const { canonical, languages } = pyscnBotAlternates(
		locale,
		"/pyscn-bot/checkout/success",
	);
	return {
		title: `${t("checkout.success.title")} | Polyscan`,
		description: t("checkout.success.subtitle"),
		alternates: { canonical, languages },
		robots: { index: false, follow: false },
	};
}

export default async function CheckoutSuccessPage() {
	const t = await getTranslations();

	return (
		<div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
			<nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
				<div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
					<Link href="/pyscn-bot" className="flex items-center gap-2">
						<Logo className="w-8 h-8" />
						<BotWordmark className="text-xl" />
					</Link>
					<LanguageSwitcher />
				</div>
			</nav>

			<section className="py-20 px-6">
				<div className="max-w-3xl mx-auto text-center">
					<div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
						<svg
							className="w-10 h-10 text-green-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>

					<h1 className="text-4xl font-bold text-gray-900 mb-4">
						{t("checkout.success.title")}
					</h1>
					<p className="text-xl text-gray-600 mb-2">
						{t("checkout.success.subtitle")}
					</p>
					<p className="text-gray-500">{t("checkout.success.description")}</p>
				</div>
			</section>

			<section className="pb-20 px-6">
				<div className="max-w-3xl mx-auto">
					<div className="space-y-6">
						{/* Step 1 */}
						<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 bg-bot-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
									<span className="text-bot-primary-600 font-bold">1</span>
								</div>
								<div className="flex-1">
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										{t("checkout.success.step1.title")}
									</h3>
									<p className="text-gray-600 mb-4">
										{t("checkout.success.step1.description")}
									</p>
									<a
										href={GITHUB_APP_INSTALL_URL}
										className="inline-block bg-bot-primary-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-bot-primary-700 transition-colors"
									>
										{t("checkout.success.step1.button")}
									</a>
								</div>
							</div>
						</div>

						{/* Step 2 */}
						<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
									<span className="text-gray-500 font-bold">2</span>
								</div>
								<div className="flex-1">
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										{t("checkout.success.step2.title")}
									</h3>
									<p className="text-gray-600 mb-4">
										{t("checkout.success.step2.description")}
									</p>
									<div className="bg-gray-900 rounded-xl p-4 font-mono text-sm mb-4">
										<div className="flex items-center gap-2 mb-3">
											<div className="w-2.5 h-2.5 rounded-full bg-red-500" />
											<div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
											<div className="w-2.5 h-2.5 rounded-full bg-green-500" />
											<span className="text-gray-400 text-xs ml-2">
												.github/polyscan.yml
											</span>
										</div>
										<pre className="text-gray-300 leading-relaxed text-xs">
											<code>
												<span className="text-gray-500">
													# {t("features.config.comment.language")}
												</span>
												{"\n"}
												<span className="text-green-400">language</span>
												<span className="text-gray-400">:</span>{" "}
												<span className="text-amber-400">ja</span>
												{"\n\n"}
												<span className="text-gray-500">
													# {t("features.config.comment.target")}
												</span>
												{"\n"}
												<span className="text-green-400">
													target_directories
												</span>
												<span className="text-gray-400">:</span>
												{"\n  "}
												<span className="text-gray-400">-</span>{" "}
												<span className="text-amber-400">src/</span>
												{"\n\n"}
												<span className="text-gray-500">
													# {t("features.config.comment.audit")}
												</span>
												{"\n"}
												<span className="text-green-400">audit_interval</span>
												<span className="text-gray-400">:</span>{" "}
												<span className="text-amber-400">weekly</span>
												{"\n\n"}
												<span className="text-gray-500">
													# {t("features.config.comment.pr")}
												</span>
												{"\n"}
												<span className="text-green-400">pr_review</span>
												<span className="text-gray-400">:</span>{" "}
												<span className="text-amber-400">true</span>
											</code>
										</pre>
									</div>
								</div>
							</div>
						</div>

						{/* Step 3 */}
						<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 bg-bot-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
									<span className="text-bot-primary-600 font-bold">3</span>
								</div>
								<div className="flex-1">
									<h3 className="text-xl font-bold text-gray-900 mb-2">
										{t("checkout.success.step3.title")}
									</h3>
									<p className="text-gray-600">
										{t("checkout.success.step3.description")}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<footer className="py-8 px-6 border-t border-gray-100">
				<div className="max-w-3xl mx-auto text-center space-y-4">
					<Link
						href="/pyscn-bot"
						className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
					>
						<svg
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						{t("checkout.success.backToHome")}
					</Link>
					<p className="text-sm text-gray-500">
						{t("checkout.success.support")}{" "}
						<a
							href="mailto:contact@ludo-tech.org"
							className="text-bot-primary-600 hover:underline"
						>
							contact@ludo-tech.org
						</a>
					</p>
				</div>
			</footer>
		</div>
	);
}
