"use client";

import { type ReactNode, useEffect, useRef } from "react";

export default function Reveal({ children }: { children: ReactNode }) {
	const root = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const sections =
			root.current?.querySelectorAll<HTMLElement>("[data-reveal]");
		if (!sections) return;
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				}
			},
			{ threshold: 0.08 },
		);
		for (const section of sections) {
			// Keep above-the-fold and server-rendered content visible.
			if (section.getBoundingClientRect().top > window.innerHeight) {
				section.classList.add("reveal-pending");
				observer.observe(section);
			}
		}
		return () => observer.disconnect();
	}, []);

	return (
		<div ref={root} className="contents">
			{children}
		</div>
	);
}
