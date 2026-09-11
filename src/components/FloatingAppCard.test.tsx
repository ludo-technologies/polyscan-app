import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeEach, expect, it } from "vitest";
import { LINKS } from "@/lib/links";
import FloatingAppCard from "./FloatingAppCard";

const messages = {
	home: {
		appCard: {
			ariaLabel: "Polyscan GitHub App",
			dismissAria: "Dismiss GitHub App promotion",
			eyebrow: "Free",
			title: "Track code quality",
			body: "Get a code quality report every week, automatically.",
			cta: "Start for free",
		},
	},
};

function renderCard() {
	return render(
		<NextIntlClientProvider locale="en" messages={messages}>
			<FloatingAppCard />
		</NextIntlClientProvider>,
	);
}

beforeEach(() => localStorage.clear());
afterEach(cleanup);

it("links to the GitHub App", () => {
	renderCard();
	expect(screen.getByRole("link", { name: "Start for free" })).toHaveAttribute(
		"href",
		LINKS.pyscnBot,
	);
});

it("remembers dismissal when mounted again", async () => {
	const user = userEvent.setup();
	const { unmount } = renderCard();
	await user.click(
		screen.getByRole("button", { name: "Dismiss GitHub App promotion" }),
	);
	expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
	unmount();
	renderCard();
	expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
});
