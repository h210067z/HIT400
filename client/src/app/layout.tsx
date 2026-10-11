import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HIT 400 Projects Archive",
  description: "Archive and duplication detection for HIT 400 project proposals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
