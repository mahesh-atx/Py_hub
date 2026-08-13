import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Outfit, Fira_Code, Inter, Space_Grotesk, JetBrains_Mono, Source_Code_Pro } from "next/font/google";
import "./globals.css";

// Premium UI Fonts
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta", display: "swap" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });

// Premium Editor Fonts
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-fira-code", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], variable: "--font-source-code-pro", display: "swap" });

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
    icon: "/favicon.png",
    apple: "/favicon.png",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d1117",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Using Plus Jakarta Sans as the primary UI font by default
  const fontVars = `${plusJakartaSans.variable} ${outfit.variable} ${inter.variable} ${spaceGrotesk.variable} ${firaCode.variable} ${jetbrainsMono.variable} ${sourceCodePro.variable}`;
  return (
    <html lang="en" className={`h-full ${fontVars}`} suppressHydrationWarning>
      <body className={`h-full bg-[#0d1117] text-slate-200 antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
