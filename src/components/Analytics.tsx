import Script from "next/script";

const GA_MEASUREMENT_ID_RAW = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
const GA_MEASUREMENT_ID = /^G-[A-Z0-9]+$/.test(GA_MEASUREMENT_ID_RAW)
	? GA_MEASUREMENT_ID_RAW
	: "";

export default function Analytics() {
	if (!GA_MEASUREMENT_ID) return null;

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
			</Script>
		</>
	);
}
