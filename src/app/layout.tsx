import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Craig-O-Metrics | Privacy-Focused Analytics",
  description: "Simple, fast, and GDPR-compliant analytics for your websites and apps. Part of the Craig-O Suite.",
  keywords: ["analytics", "web analytics", "privacy", "GDPR", "craig-o suite"],
  authors: [{ name: "VibeCaaS" }],
  openGraph: {
    title: "Craig-O-Metrics | Privacy-Focused Analytics",
    description: "Simple, fast, and GDPR-compliant analytics for your websites and apps.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
