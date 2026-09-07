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
		"/pyscn-bot/privacy",
	);
	return {
		title: `${t("footer.privacy")} - Polyscan`,
		description: "Privacy Policy for Polyscan",
		alternates: { canonical, languages },
	};
}

function PrivacyJa() {
	return (
		<div>
			<h2>1. はじめに</h2>
			<p>
				Polyscan（以下「本サービス」）は、Ludo
				Technologies（以下「当社」）が提供するGitHub
				App形式のコードレビューサービスです。本プライバシーポリシーは、本サービスを通じて収集する情報とその取り扱いについて説明します。
			</p>

			<h2>2. 収集する情報</h2>
			<p>本サービスは以下の情報を収集します：</p>
			<ul>
				<li>
					<strong>リポジトリ情報</strong>:
					インストールされたリポジトリ名、所有者情報
				</li>
				<li>
					<strong>コード情報</strong>:
					プルリクエストで変更されたソースファイルの内容（レビュー目的のみ）
				</li>
				<li>
					<strong>GitHubアカウント情報</strong>:
					ユーザーID、ユーザー名、メールアドレス（課金管理・通知目的）
				</li>
				<li>
					<strong>ログデータ</strong>:
					IPアドレス、ブラウザ情報、アクセス日時などの技術情報（サービス運用・セキュリティ目的）
				</li>
			</ul>

			<h2>3. 情報の使用目的</h2>
			<p>収集した情報は以下の目的でのみ使用します：</p>
			<ul>
				<li>コードレビューの実行</li>
				<li>週次監査レポートの生成</li>
				<li>サービス品質の向上</li>
				<li>課金・プラン管理</li>
				<li>サービスに関する通知の送信</li>
				<li>不正利用の防止・セキュリティ確保</li>
			</ul>

			<h2>4. 第三者への情報提供</h2>
			<p>
				コード情報は、当社のオンプレミス環境で動作するローカルLLMによって解析され、外部の生成AI
				APIには送信されません。
			</p>
			<p>当社は以下の第三者とお客様の情報を共有することがあります：</p>
			<ul>
				<li>
					<strong>Stripe社</strong>:
					決済処理のため、お支払い情報をStripeに送信します。
					<a href="https://stripe.com/privacy" target="_blank" rel="noopener">
						Stripe Privacy Policy
					</a>
					をご確認ください。
				</li>
				<li>
					<strong>GitHub社</strong>: 本サービスはGitHub
					Appとして動作し、GitHubのAPIを通じて情報を取得します。
					<a
						href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
						target="_blank"
						rel="noopener"
					>
						GitHub Privacy Statement
					</a>
					をご確認ください。
				</li>
			</ul>
			<p>
				上記以外の第三者への情報提供は、法令上の要請がある場合を除き、行いません。
			</p>

			<h2>5. 国際データ転送</h2>
			<p>
				本サービスを利用することで、お客様の情報は日本国外（米国を含む）のサーバーに転送・保存される場合があります。当社は、適切なデータ保護措置を講じた上でこれらの転送を行います。
			</p>

			<h2>6. データの保存</h2>
			<ul>
				<li>
					<strong>コード情報</strong>:
					レビュー処理完了後、即座に削除されます。永続的な保存は行いません。
				</li>
				<li>
					<strong>アカウント情報</strong>: サービス利用期間中保存されます。
				</li>
				<li>
					<strong>インストール情報</strong>: サービス利用期間中保存されます。
				</li>
				<li>
					<strong>ログデータ</strong>:
					セキュリティおよび運用目的で最大90日間保存されます。
				</li>
			</ul>

			<h2>7. データの削除</h2>
			<p>
				アカウントを削除した場合、またはアカウントが停止・終了された場合、お客様のデータは30日以内に削除されます。ただし、法令上の保存義務がある場合はこの限りではありません。
			</p>

			<h2>8. お客様の権利</h2>
			<p>お客様は以下の権利を有します：</p>
			<ul>
				<li>お客様の個人データへのアクセスを請求する権利</li>
				<li>不正確なデータの修正を請求する権利</li>
				<li>お客様のデータの削除を請求する権利</li>
				<li>データ処理に対する異議を申し立てる権利</li>
			</ul>
			<p>
				これらの権利を行使するには、下記のお問い合わせ先までご連絡ください。
			</p>

			<h2>9. 子供のプライバシー</h2>
			<p>
				本サービスは13歳未満の子供を対象としていません。当社は13歳未満の子供から故意に個人情報を収集することはありません。13歳未満のお子様の情報が収集されたことが判明した場合、速やかに削除いたします。
			</p>

			<h2>10. Cookie</h2>
			<p>
				本サービスのウェブサイトでは、セッション管理および認証のためにCookieを使用しています。これらは本サービスの機能に必要なものであり、トラッキングや広告目的では使用しません。
			</p>

			<h2>11. セキュリティ</h2>
			<p>
				当社は、収集した情報を保護するために適切な技術的・組織的措置を講じています。すべての通信はTLSにより暗号化されています。ただし、インターネット上での情報伝送は100%安全ではないことをご了承ください。
			</p>

			<h2>12. ポリシーの変更</h2>
			<p>
				当社は、必要に応じて本プライバシーポリシーを変更することがあります。重要な変更を行う場合は、サービス上での通知またはご登録のメールアドレスへの連絡によりお知らせします。変更後も本サービスを継続してご利用になる場合、変更後のポリシーに同意したものとみなされます。
			</p>

			<h2>13. お問い合わせ</h2>
			<p>
				本プライバシーポリシーに関するお問い合わせ、またはお客様の権利の行使については、GitHubリポジトリのIssueまたは以下までご連絡ください。
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

function PrivacyZh() {
	return (
		<div>
			<h2>1. 简介</h2>
			<p>
				Polyscan（以下简称"本服务"）是由 Ludo
				Technologies（以下简称"我们"）提供的 GitHub App
				形式的代码审查服务。本隐私政策说明我们通过本服务收集的信息及其处理方式。
			</p>

			<h2>2. 收集的信息</h2>
			<p>本服务收集以下信息：</p>
			<ul>
				<li>
					<strong>仓库信息</strong>：已安装的仓库名称、所有者信息
				</li>
				<li>
					<strong>代码信息</strong>
					：拉取请求中更改的源代码文件内容（仅用于审查目的）
				</li>
				<li>
					<strong>GitHub 账户信息</strong>：用户
					ID、用户名、电子邮件地址（用于计费管理和通知）
				</li>
				<li>
					<strong>日志数据</strong>：IP
					地址、浏览器信息、访问时间等技术信息（用于服务运营和安全）
				</li>
			</ul>

			<h2>3. 信息使用目的</h2>
			<p>收集的信息仅用于以下目的：</p>
			<ul>
				<li>执行代码审查</li>
				<li>生成每周审计报告</li>
				<li>提升服务质量</li>
				<li>计费和计划管理</li>
				<li>发送服务相关通知</li>
				<li>防止滥用和确保安全</li>
			</ul>

			<h2>4. 向第三方提供信息</h2>
			<p>
				代码信息由运行在我们的本地部署环境中的本地大语言模型进行分析，不会发送到外部生成式
				AI API。
			</p>
			<p>我们可能会与以下第三方共享您的信息：</p>
			<ul>
				<li>
					<strong>Stripe</strong>：为处理支付，支付信息将发送至 Stripe。请参阅{" "}
					<a href="https://stripe.com/privacy" target="_blank" rel="noopener">
						Stripe Privacy Policy
					</a>
					。
				</li>
				<li>
					<strong>GitHub</strong>：本服务作为 GitHub App 运行，通过 GitHub API
					获取信息。请参阅{" "}
					<a
						href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
						target="_blank"
						rel="noopener"
					>
						GitHub Privacy Statement
					</a>
					。
				</li>
			</ul>
			<p>除上述情况和法律要求外，我们不会向其他第三方提供信息。</p>

			<h2>5. 国际数据传输</h2>
			<p>
				使用本服务即表示您的信息可能会被传输并存储在日本境外（包括美国）的服务器上。我们会在采取适当的数据保护措施后进行这些传输。
			</p>

			<h2>6. 数据存储</h2>
			<ul>
				<li>
					<strong>代码信息</strong>：审查处理完成后立即删除，不进行永久存储。
				</li>
				<li>
					<strong>账户信息</strong>：在服务使用期间保存。
				</li>
				<li>
					<strong>安装信息</strong>：在服务使用期间保存。
				</li>
				<li>
					<strong>日志数据</strong>：出于安全和运营目的保存最多90天。
				</li>
			</ul>

			<h2>7. 数据删除</h2>
			<p>
				当您删除账户或账户被暂停/终止时，您的数据将在30天内删除。但法律要求保留的情况除外。
			</p>

			<h2>8. 您的权利</h2>
			<p>您拥有以下权利：</p>
			<ul>
				<li>请求访问您的个人数据</li>
				<li>请求更正不准确的数据</li>
				<li>请求删除您的数据</li>
				<li>反对数据处理</li>
			</ul>
			<p>如需行使这些权利，请通过以下联系方式与我们联系。</p>

			<h2>9. 儿童隐私</h2>
			<p>
				本服务不面向13岁以下的儿童。我们不会故意收集13岁以下儿童的个人信息。如果我们发现收集了13岁以下儿童的信息，我们将立即删除。
			</p>

			<h2>10. Cookie</h2>
			<p>
				本服务网站使用 Cookie
				进行会话管理和身份验证。这些是服务功能所必需的，不用于跟踪或广告目的。
			</p>

			<h2>11. 安全性</h2>
			<p>
				我们采取适当的技术和组织措施来保护收集的信息。所有通信均通过 TLS
				加密。但请注意，互联网上的信息传输并非100%安全。
			</p>

			<h2>12. 政策变更</h2>
			<p>
				我们可能会根据需要修改本隐私政策。对于重大变更，我们将通过服务内通知或您注册的电子邮件地址通知您。变更后继续使用本服务即表示您接受修改后的政策。
			</p>

			<h2>13. 联系我们</h2>
			<p>
				如有关于本隐私政策的问题或需要行使您的权利，请通过 GitHub 仓库的 Issue
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

function PrivacyEn() {
	return (
		<div>
			<h2>1. Introduction</h2>
			<p>
				Polyscan (the &quot;Service&quot;) is a GitHub App code review service
				provided by Ludo Technologies (&quot;we&quot;, &quot;us&quot;, or
				&quot;our&quot;). This Privacy Policy explains what information we
				collect through the Service and how we handle it.
			</p>

			<h2>2. Information We Collect</h2>
			<p>The Service collects the following information:</p>
			<ul>
				<li>
					<strong>Repository Information</strong>: Names and owner information
					of installed repositories
				</li>
				<li>
					<strong>Code Information</strong>: Contents of source files changed in
					pull requests (for review purposes only)
				</li>
				<li>
					<strong>GitHub Account Information</strong>: User ID, username, email
					address (for billing management and notifications)
				</li>
				<li>
					<strong>Log Data</strong>: Technical information such as IP address,
					browser information, and access timestamps (for service operation and
					security)
				</li>
			</ul>

			<h2>3. How We Use Information</h2>
			<p>We use the collected information solely for:</p>
			<ul>
				<li>Performing code reviews</li>
				<li>Generating weekly audit reports</li>
				<li>Improving service quality</li>
				<li>Billing and plan management</li>
				<li>Sending service-related notifications</li>
				<li>Preventing abuse and ensuring security</li>
			</ul>

			<h2>4. Third-Party Sharing</h2>
			<p>
				Code information is analyzed by a local LLM running in our on-premises
				environment and is not sent to external generative AI APIs.
			</p>
			<p>We may share your information with the following third parties:</p>
			<ul>
				<li>
					<strong>Stripe</strong>: Payment information is sent to Stripe for
					payment processing. Please refer to the{" "}
					<a href="https://stripe.com/privacy" target="_blank" rel="noopener">
						Stripe Privacy Policy
					</a>
					.
				</li>
				<li>
					<strong>GitHub</strong>: The Service operates as a GitHub App and
					retrieves information through GitHub&apos;s API. Please refer to the{" "}
					<a
						href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
						target="_blank"
						rel="noopener"
					>
						GitHub Privacy Statement
					</a>
					.
				</li>
			</ul>
			<p>
				We do not share information with any other third parties except as
				required by law.
			</p>

			<h2>5. International Data Transfers</h2>
			<p>
				By using the Service, your information may be transferred to and stored
				on servers located outside of Japan, including the United States. We
				ensure appropriate data protection measures are in place for such
				transfers.
			</p>

			<h2>6. Data Retention</h2>
			<ul>
				<li>
					<strong>Code Information</strong>: Deleted immediately after review
					processing. No persistent storage.
				</li>
				<li>
					<strong>Account Information</strong>: Retained during service usage
					period.
				</li>
				<li>
					<strong>Installation Information</strong>: Retained during service
					usage period.
				</li>
				<li>
					<strong>Log Data</strong>: Retained for up to 90 days for security and
					operational purposes.
				</li>
			</ul>

			<h2>7. Data Deletion</h2>
			<p>
				When you delete your account or your account is suspended/terminated,
				your data will be deleted within 30 days, except where retention is
				required by law.
			</p>

			<h2>8. Your Rights</h2>
			<p>You have the following rights:</p>
			<ul>
				<li>The right to request access to your personal data</li>
				<li>The right to request correction of inaccurate data</li>
				<li>The right to request deletion of your data</li>
				<li>The right to object to data processing</li>
			</ul>
			<p>
				To exercise these rights, please contact us using the information below.
			</p>

			<h2>9. Children&apos;s Privacy</h2>
			<p>
				The Service is not intended for children under 13. We do not knowingly
				collect personal information from children under 13. If we become aware
				that we have collected information from a child under 13, we will delete
				it promptly.
			</p>

			<h2>10. Cookies</h2>
			<p>
				The Service website uses cookies for session management and
				authentication. These are necessary for the Service to function and are
				not used for tracking or advertising purposes.
			</p>

			<h2>11. Security</h2>
			<p>
				We implement appropriate technical and organizational measures to
				protect the information we collect. All communications are encrypted
				using TLS. However, please note that no method of transmission over the
				Internet is 100% secure.
			</p>

			<h2>12. Changes to This Policy</h2>
			<p>
				We may modify this Privacy Policy as needed. For significant changes, we
				will notify you through the Service or via your registered email
				address. Your continued use of the Service after changes constitutes
				acceptance of the modified Policy.
			</p>

			<h2>13. Contact Us</h2>
			<p>
				For questions about this Privacy Policy or to exercise your rights,
				please contact us via GitHub Issues or the following:
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

export default async function PrivacyPage({
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
					title={t("footer.privacy")}
					lede={
						<span className="font-mono text-sm text-[var(--text-muted)]">
							{t("legal.lastUpdated")}: {LAST_UPDATED}
						</span>
					}
				/>

				<div className="legal-body">
					{locale === "ja" ? (
						<PrivacyJa />
					) : locale === "zh" ? (
						<PrivacyZh />
					) : (
						<PrivacyEn />
					)}
				</div>
			</div>
		</main>
	);
}
