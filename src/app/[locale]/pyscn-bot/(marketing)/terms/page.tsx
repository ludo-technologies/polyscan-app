import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import SubpageHeader from "@/components/pyscn-bot/SubpageHeader";
import { pyscnBotAlternates } from "@/lib/pyscn-bot-metadata";

const LAST_UPDATED = "2026-09-04";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale });
	const { canonical, languages } = pyscnBotAlternates(
		locale,
		"/pyscn-bot/terms",
	);
	return {
		title: `${t("footer.terms")} - Polyscan`,
		description: "Terms of Service for Polyscan",
		alternates: { canonical, languages },
	};
}

function TermsJa() {
	return (
		<div>
			<h2>1. サービスの概要</h2>
			<p>
				Polyscan（以下「本サービス」）は、Ludo
				Technologies（以下「当社」）が提供するGitHub
				App形式のAIコードレビューサービスです。本サービスをご利用になる前に、本利用規約をよくお読みください。
			</p>

			<h2>2. 利用条件</h2>
			<p>
				本サービスをご利用いただくには、以下の条件に同意していただく必要があります：
			</p>
			<ul>
				<li>有効なGitHubアカウントを保有していること</li>
				<li>本利用規約に同意すること</li>
				<li>適用される法令を遵守すること</li>
			</ul>

			<h2>3. 年齢制限</h2>
			<p>
				本サービスは13歳以上の方のみご利用いただけます。18歳未満の方は、保護者の同意を得た上でご利用ください。
			</p>

			<h2>4. 料金プラン</h2>
			<p>
				<strong>Free プラン</strong>:
				週次コード監査、基本分析モデル、ヘルススコア＆改善提案を無料で提供します。
			</p>
			<p>
				<strong>Individual プラン</strong>:
				月額10ドルで、個人リポジトリ向けにFreeの全機能に加え、すべてのPRでコードレビュー、高精度分析モデル、優先サポートを提供します。14日間の無料トライアル付きです。
			</p>
			<p>
				<strong>Team プラン</strong>:
				月額10ドル/開発者で、Organization向けにIndividualの全機能に加え、組織メンバー無制限、一括請求、チーム管理機能を提供します。14日間の無料トライアル付きです。
			</p>
			<p>料金はStripeを通じて請求されます。</p>

			<h2>5. 自動更新</h2>
			<p>
				有料プランをご契約の場合、サブスクリプションは各請求期間の終了時に自動的に更新されます。トライアル期間終了後も、お客様がキャンセルしない限り自動的に課金が開始されます。自動更新を希望されない場合は、請求期間終了前にキャンセル手続きを行ってください。
			</p>

			<h2>6. 解約・キャンセル</h2>
			<p>
				有料プランの解約は、アカウント設定ページからいつでも行えます。解約手続きを行った場合、現在の請求期間の終了までサービスをご利用いただけます。解約後、次回以降の請求は発生しません。
			</p>
			<p>
				Freeプランのユーザーは、GitHubからアプリをアンインストールすることでサービスの利用を終了できます。
			</p>

			<h2>7. 返金ポリシー</h2>
			<p>
				14日間の無料トライアル期間中にキャンセルした場合、料金は発生しません。トライアル期間終了後の課金については、原則として返金は行いません。ただし、当社の責に帰すべき事由によりサービスが提供できなかった場合は、日割り計算により返金を検討いたします。
			</p>

			<h2>8. サービスの変更・中断</h2>
			<p>
				当社は、以下の場合にサービスを変更、中断、または終了する権利を有します：
			</p>
			<ul>
				<li>システムメンテナンス</li>
				<li>セキュリティ上の理由</li>
				<li>法令上の要請</li>
				<li>その他やむを得ない事由</li>
			</ul>
			<p>計画的なメンテナンスについては、可能な限り事前に通知いたします。</p>

			<h2>9. 第三者サービス</h2>
			<p>
				本サービスはGitHub
				APIおよびStripeの決済サービスを利用しています。これらの第三者サービスの障害、変更、または利用停止により本サービスが影響を受ける場合がありますが、当社はこれらの第三者サービスに起因する問題について責任を負いません。
			</p>

			<h2>10. 免責事項</h2>
			<p>
				本サービスは「現状有姿」で提供されます。当社は以下について保証しません：
			</p>
			<ul>
				<li>レビュー結果の正確性・完全性</li>
				<li>サービスの中断なき提供</li>
				<li>すべてのバグ・脆弱性の検出</li>
			</ul>
			<p>
				本サービスはコードレビューの補助ツールであり、人間によるレビューの代替ではありません。最終的な判断はお客様の責任において行ってください。
			</p>

			<h2>11. 責任制限</h2>
			<p>
				本サービスの利用により生じたいかなる損害についても、当社は法律で認められる最大限の範囲で責任を負いません。当社が責任を負う場合であっても、その責任は、お客様が過去12ヶ月間に本サービスに対して支払った金額を上限とします。
			</p>

			<h2>12. 補償</h2>
			<p>
				お客様は、お客様による本利用規約の違反、お客様のコンテンツ、または本サービスの不正使用に起因または関連して生じた、あらゆる請求、損害、費用（合理的な弁護士費用を含む）について、当社を補償し、免責するものとします。
			</p>

			<h2>13. 禁止事項</h2>
			<p>以下の行為は禁止されています：</p>
			<ul>
				<li>本サービスへの不正アクセス</li>
				<li>本サービスのリバースエンジニアリング</li>
				<li>他のユーザーへの妨害行為</li>
				<li>違法なコンテンツのレビュー依頼</li>
				<li>自動化されたスクリプトによる過度なAPI呼び出し</li>
			</ul>

			<h2>14. アカウントの停止・終了</h2>
			<p>
				当社は、以下の場合にお客様のアカウントを事前通知なく停止または終了する権利を有します：
			</p>
			<ul>
				<li>本利用規約への違反</li>
				<li>不正行為または悪用が疑われる場合</li>
				<li>サービスの安全性やセキュリティを脅かす行為</li>
				<li>他のユーザーへの迷惑行為</li>
				<li>法令違反または違法行為</li>
			</ul>
			<p>
				アカウントが停止または終了された場合、有料プランの未使用期間分の返金は行いません。停止後30日以内にお客様のデータは削除されます。
			</p>

			<h2>15. 知的財産権</h2>
			<p>
				本サービスに関するすべての知的財産権は当社に帰属します。お客様のコードに関する権利はお客様に帰属します。
			</p>

			<h2>16. 規約の変更</h2>
			<p>
				当社は、必要に応じて本利用規約を変更することがあります。重要な変更を行う場合は、サービス上での通知またはご登録のメールアドレスへの連絡により、少なくとも30日前までにお知らせします。変更後も本サービスを継続してご利用になる場合、変更後の規約に同意したものとみなされます。
			</p>

			<h2>17. 準拠法・裁判管轄</h2>
			<p>
				本利用規約は日本法に準拠し、解釈されるものとします。本規約に関する紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
			</p>

			<h2>18. 可分性</h2>
			<p>
				本利用規約のいずれかの条項が無効または執行不能と判断された場合でも、残りの条項は引き続き有効に存続するものとします。
			</p>

			<h2>19. お問い合わせ</h2>
			<p>
				本利用規約に関するお問い合わせは、GitHubリポジトリのIssueまたは以下までご連絡ください。
			</p>
			<p>Email: contact@ludo-tech.org</p>
			<p>
				Website:{" "}
				<a href="https://www.ludo-tech.org/" target="_blank" rel="noopener">
					https://www.ludo-tech.org/
				</a>
			</p>
		</div>
	);
}

function TermsZh() {
	return (
		<div>
			<h2>1. 服务概述</h2>
			<p>
				Polyscan（以下简称"本服务"）是由 Ludo
				Technologies（以下简称"我们"）提供的 GitHub App 形式的 AI
				代码审查服务。使用本服务前，请仔细阅读本服务条款。
			</p>

			<h2>2. 使用条件</h2>
			<p>使用本服务需要同意以下条件：</p>
			<ul>
				<li>拥有有效的 GitHub 账户</li>
				<li>同意本服务条款</li>
				<li>遵守适用的法律法规</li>
			</ul>

			<h2>3. 年龄限制</h2>
			<p>
				本服务仅供13岁及以上用户使用。如果您未满18岁，需要获得父母或监护人的同意方可使用本服务。
			</p>

			<h2>4. 价格计划</h2>
			<p>
				<strong>免费计划</strong>
				：每周代码审计、基础分析模型、健康评分和改进建议，免费使用。
			</p>
			<p>
				<strong>Individual 计划</strong>：每月 10
				美元，适用于个人仓库，包含免费版全部功能，以及每个 PR
				自动代码审查、高精度分析模型和优先支持。包含14天免费试用。
			</p>
			<p>
				<strong>Team 计划</strong>：每月 10 美元/开发者，适用于组织，包含
				Individual
				全部功能，以及无限组织成员、统一计费和团队管理功能。包含14天免费试用。
			</p>
			<p>费用通过 Stripe 收取。</p>

			<h2>5. 自动续订</h2>
			<p>
				对于付费计划，您的订阅将在每个计费周期结束时自动续订。试用期结束后，除非您取消，否则将自动开始计费。如果您不希望自动续订，请在计费周期结束前取消。
			</p>

			<h2>6. 取消订阅</h2>
			<p>
				您可以随时通过账户设置页面取消付费计划。取消后，您可以继续使用服务直到当前计费周期结束。取消后将不会产生后续费用。
			</p>
			<p>免费计划用户可以通过从 GitHub 卸载应用程序来终止使用本服务。</p>

			<h2>7. 退款政策</h2>
			<p>
				如果您在14天免费试用期内取消，不会产生任何费用。试用期后的付款原则上不予退款。但是，如果因我们的原因导致无法提供服务，我们可能会根据具体情况考虑按比例退款。
			</p>

			<h2>8. 服务变更和中断</h2>
			<p>在以下情况下，我们保留变更、中断或终止服务的权利：</p>
			<ul>
				<li>系统维护</li>
				<li>安全原因</li>
				<li>法律要求</li>
				<li>其他不可避免的原因</li>
			</ul>
			<p>对于计划内的维护，我们将尽可能提前通知。</p>

			<h2>9. 第三方服务</h2>
			<p>
				本服务使用 GitHub API 和 Stripe
				支付服务。这些第三方服务的中断、变更或停止可能会影响本服务。我们不对因这些第三方服务引起的问题承担责任。
			</p>

			<h2>10. 免责声明</h2>
			<p>本服务按"现状"提供。我们不保证：</p>
			<ul>
				<li>审查结果的准确性或完整性</li>
				<li>服务的不间断提供</li>
				<li>检测所有漏洞或错误</li>
			</ul>
			<p>
				本服务是代码审查的辅助工具，不能替代人工审查。最终决定由您自行负责。
			</p>

			<h2>11. 责任限制</h2>
			<p>
				对于因使用本服务而产生的任何损害，在法律允许的最大范围内，我们不承担责任。在任何情况下，我们的总责任不超过您在索赔前12个月内为本服务支付的金额。
			</p>

			<h2>12. 赔偿</h2>
			<p>
				您同意就因您违反本条款、您的内容或您对本服务的不当使用而产生或与之相关的任何索赔、损害和费用（包括合理的律师费）对我们进行赔偿并使我们免受损害。
			</p>

			<h2>13. 禁止行为</h2>
			<p>以下行为是被禁止的：</p>
			<ul>
				<li>未经授权访问本服务</li>
				<li>对本服务进行逆向工程</li>
				<li>干扰其他用户</li>
				<li>请求审查非法内容</li>
				<li>通过自动化脚本进行过度的API调用</li>
			</ul>

			<h2>14. 账户暂停和终止</h2>
			<p>在以下情况下，我们保留在不事先通知的情况下暂停或终止您账户的权利：</p>
			<ul>
				<li>违反本服务条款</li>
				<li>涉嫌欺诈或滥用</li>
				<li>威胁服务安全或安全性的行为</li>
				<li>骚扰其他用户</li>
				<li>违反法律或非法活动</li>
			</ul>
			<p>
				如果您的账户被暂停或终止，付费计划的未使用部分将不予退款。您的数据将在暂停后30天内删除。
			</p>

			<h2>15. 知识产权</h2>
			<p>本服务的所有知识产权归我们所有。您的代码权利仍归您所有。</p>

			<h2>16. 条款变更</h2>
			<p>
				我们可能会根据需要修改本服务条款。对于重大变更，我们将通过服务内通知或您注册的电子邮件地址提前至少30天通知您。变更后继续使用本服务即表示您接受修改后的条款。
			</p>

			<h2>17. 适用法律和管辖权</h2>
			<p>
				本服务条款受日本法律管辖并据此解释。因本条款产生的任何争议，以东京地方法院为第一审专属管辖法院。
			</p>

			<h2>18. 可分割性</h2>
			<p>
				如果本条款的任何条款被认定为无效或不可执行，其余条款将继续保持完全效力。
			</p>

			<h2>19. 联系我们</h2>
			<p>
				如有关于本服务条款的问题，请通过 GitHub 仓库的 Issue
				或以下方式联系我们。
			</p>
			<p>Email: contact@ludo-tech.org</p>
			<p>
				Website:{" "}
				<a href="https://www.ludo-tech.org/" target="_blank" rel="noopener">
					https://www.ludo-tech.org/
				</a>
			</p>
		</div>
	);
}

function TermsEn() {
	return (
		<div>
			<h2>1. Service Overview</h2>
			<p>
				Polyscan (the &quot;Service&quot;) is a GitHub App AI code review
				service provided by Ludo Technologies (&quot;we&quot;, &quot;us&quot;,
				or &quot;our&quot;). Please read these Terms of Service carefully before
				using the Service.
			</p>

			<h2>2. Terms of Use</h2>
			<p>To use the Service, you must agree to the following:</p>
			<ul>
				<li>Have a valid GitHub account</li>
				<li>Agree to these Terms of Service</li>
				<li>Comply with applicable laws and regulations</li>
			</ul>

			<h2>3. Age Restrictions</h2>
			<p>
				The Service is only available to users aged 13 and older. If you are
				under 18, you must have parental consent to use the Service.
			</p>

			<h2>4. Pricing Plans</h2>
			<p>
				<strong>Free Plan</strong>: Weekly code audit, basic analysis model,
				health score and recommendations, free of charge.
			</p>
			<p>
				<strong>Individual Plan</strong>: $10/month for personal repositories,
				includes everything in Free, plus PR code review on every pull request,
				advanced analysis model, and priority support. Includes a 14-day free
				trial.
			</p>
			<p>
				<strong>Team Plan</strong>: $10/developer/month for organizations,
				includes everything in Individual, plus unlimited organization members,
				centralized billing, and team management. Includes a 14-day free trial.
			</p>
			<p>Billing is handled through Stripe.</p>

			<h2>5. Automatic Renewal</h2>
			<p>
				For paid plans, your subscription will automatically renew at the end of
				each billing period. After the trial period ends, billing will
				automatically begin unless you cancel. If you do not wish to auto-renew,
				please cancel before the end of your billing period.
			</p>

			<h2>6. Cancellation</h2>
			<p>
				You may cancel your paid plan at any time from your account settings
				page. Upon cancellation, you will continue to have access to the Service
				until the end of your current billing period. No further charges will
				occur after cancellation.
			</p>
			<p>
				Free plan users can terminate their use of the Service by uninstalling
				the app from GitHub.
			</p>

			<h2>7. Refund Policy</h2>
			<p>
				If you cancel during the 14-day free trial period, no charges will
				apply. After the trial period, payments are generally non-refundable.
				However, if we are unable to provide the Service due to reasons
				attributable to us, we may consider pro-rated refunds on a case-by-case
				basis.
			</p>

			<h2>8. Service Changes and Interruptions</h2>
			<p>
				We reserve the right to modify, suspend, or terminate the Service in the
				following cases:
			</p>
			<ul>
				<li>System maintenance</li>
				<li>Security reasons</li>
				<li>Legal requirements</li>
				<li>Other unavoidable circumstances</li>
			</ul>
			<p>
				We will provide advance notice for scheduled maintenance whenever
				possible.
			</p>

			<h2>9. Third-Party Services</h2>
			<p>
				The Service uses the GitHub API and Stripe&apos;s payment processing
				services. The Service may be affected by outages, changes, or
				discontinuation of these third-party services. We are not responsible
				for issues arising from these third-party services.
			</p>

			<h2>10. Disclaimer</h2>
			<p>The Service is provided &quot;as is&quot;. We do not warrant:</p>
			<ul>
				<li>Accuracy or completeness of review results</li>
				<li>Uninterrupted service availability</li>
				<li>Detection of all bugs or vulnerabilities</li>
			</ul>
			<p>
				The Service is a supplementary code review tool and is not a replacement
				for human review. Final decisions are your responsibility.
			</p>

			<h2>11. Limitation of Liability</h2>
			<p>
				To the maximum extent permitted by law, we shall not be liable for any
				damages arising from the use of the Service. In any event, our total
				liability shall not exceed the amount you have paid for the Service in
				the 12 months preceding the claim.
			</p>

			<h2>12. Indemnification</h2>
			<p>
				You agree to indemnify and hold us harmless from any claims, damages,
				and expenses (including reasonable attorney fees) arising from or
				related to your violation of these Terms, your content, or your misuse
				of the Service.
			</p>

			<h2>13. Prohibited Activities</h2>
			<p>The following activities are prohibited:</p>
			<ul>
				<li>Unauthorized access to the Service</li>
				<li>Reverse engineering the Service</li>
				<li>Interfering with other users</li>
				<li>Requesting review of illegal content</li>
				<li>Excessive API calls through automated scripts</li>
			</ul>

			<h2>14. Account Suspension and Termination</h2>
			<p>
				We reserve the right to suspend or terminate your account without prior
				notice in the following cases:
			</p>
			<ul>
				<li>Violation of these Terms of Service</li>
				<li>Suspected fraud or abuse</li>
				<li>Actions that threaten the safety or security of the Service</li>
				<li>Harassment of other users</li>
				<li>Violation of laws or illegal activities</li>
			</ul>
			<p>
				If your account is suspended or terminated, no refund will be provided
				for any unused portion of paid plans. Your data will be deleted within
				30 days of suspension.
			</p>

			<h2>15. Intellectual Property</h2>
			<p>
				All intellectual property rights in the Service belong to us. Rights to
				your code remain with you.
			</p>

			<h2>16. Changes to Terms</h2>
			<p>
				We may modify these Terms of Service as needed. For significant changes,
				we will notify you at least 30 days in advance through the Service or
				via your registered email address. Your continued use of the Service
				after changes constitutes acceptance of the modified Terms.
			</p>

			<h2>17. Governing Law and Jurisdiction</h2>
			<p>
				These Terms of Service are governed by and construed in accordance with
				the laws of Japan. Any disputes arising from these Terms shall be
				subject to the exclusive jurisdiction of the Tokyo District Court as the
				court of first instance.
			</p>

			<h2>18. Severability</h2>
			<p>
				If any provision of these Terms is found to be invalid or unenforceable,
				the remaining provisions shall continue in full force and effect.
			</p>

			<h2>19. Contact Us</h2>
			<p>
				For questions about these Terms of Service, please contact us via GitHub
				Issues or the following:
			</p>
			<p>Email: contact@ludo-tech.org</p>
			<p>
				Website:{" "}
				<a href="https://www.ludo-tech.org/" target="_blank" rel="noopener">
					https://www.ludo-tech.org/
				</a>
			</p>
		</div>
	);
}

export default async function TermsPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	const t = await getTranslations();

	return (
		<main className="pt-24 pb-16">
			<div className="mx-auto max-w-3xl px-4 sm:px-6">
				<SubpageHeader
					backLabel={t("legal.backToHome")}
					eyebrow="Legal"
					title={t("footer.terms")}
					lede={
						<span className="font-mono text-sm text-[var(--text-muted)]">
							{t("legal.lastUpdated")}: {LAST_UPDATED}
						</span>
					}
				/>

				<div className="legal-body">
					{locale === "ja" ? (
						<TermsJa />
					) : locale === "zh" ? (
						<TermsZh />
					) : (
						<TermsEn />
					)}
				</div>
			</div>
		</main>
	);
}
