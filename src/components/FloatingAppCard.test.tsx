import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it } from "vitest";
import { LINKS } from "@/lib/links";
import FloatingAppCard from "./FloatingAppCard";

beforeEach(() => localStorage.clear());
afterEach(cleanup);

it("links to the GitHub App", () => {
	render(<FloatingAppCard />);
	expect(screen.getByRole("link", { name: "Start for free" })).toHaveAttribute(
		"href",
		LINKS.pyscnBot,
	);
});

it("remembers dismissal when mounted again", async () => {
	const user = userEvent.setup();
	const { unmount } = render(<FloatingAppCard />);
	await user.click(
		screen.getByRole("button", { name: "Dismiss GitHub App promotion" }),
	);
	expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
	unmount();
	render(<FloatingAppCard />);
	expect(screen.queryByRole("complementary")).not.toBeInTheDocument();
});
