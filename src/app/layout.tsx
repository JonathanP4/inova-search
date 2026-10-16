"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Nav";
import { Toaster } from "@/components/ui/toast";
import { AuthProvider } from "@/store/AuthProvider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			data-scroll-behavior="smooth"
			className={`${geistSans.className} ${geistMono.variable} h-full antialiased`}
		>
			<title>InovaSearch</title>
			<body className="min-h-full flex flex-col bg-background">
				<AuthProvider>
					<Navbar />
					{children}
					<Toaster />
				</AuthProvider>
			</body>
		</html>
	);
}
