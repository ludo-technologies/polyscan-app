import { Archivo, JetBrains_Mono } from "next/font/google";

export const archivo = Archivo({
	variable: "--font-archivo",
	subsets: ["latin"],
	axes: ["wdth"],
});

export const jetbrains = JetBrains_Mono({
	variable: "--font-jetbrains",
	subsets: ["latin"],
});
