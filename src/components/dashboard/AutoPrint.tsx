"use client";

import { useEffect } from "react";
import { secondaryButtonClass } from "./primitives";

/* Opens the print dialog once the sheet has rendered (?autoprint=1). */
export function AutoPrint() {
	useEffect(() => {
		window.print();
	}, []);
	return null;
}

export function PrintButton({ label }: { label: string }) {
	return (
		<button
			type="button"
			onClick={() => window.print()}
			className={secondaryButtonClass}
		>
			{label}
		</button>
	);
}
