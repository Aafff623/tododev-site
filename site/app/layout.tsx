import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "[relay] — Run your whole agent team from one place",
  description:
    "relay connects your coding agents — hand them tasks, watch them work in parallel, and keep every run, schedule and connection in one quiet place.",
};

export const viewport: Viewport = {
  themeColor: "#18181b",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-surface font-sans text-content antialiased">
        {children}
      </body>
    </html>
  );
}
