import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gen Website",
  description: "A website built with Next.js.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
