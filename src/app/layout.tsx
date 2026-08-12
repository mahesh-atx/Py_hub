import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PyLab — Interactive Python IDE & Learning Platform",
  description:
    "Master Python programming directly in your browser. PyLab features a full WebAssembly IDE, automated judging, practice questions, and comprehensive practice projects per phase.",
  keywords: ["Python", "IDE", "Learn to Code", "Programming", "Browser IDE", "WebAssembly", "Pyodide"],
  authors: [{ name: "PyLab" }],
  openGraph: {
    title: "PyLab — Interactive Python IDE",
    description: "Master Python programming directly in your browser with practice questions, projects, and automated judging.",
    type: "website",
    siteName: "PyLab",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1117",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="h-full bg-[#0d1117] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
