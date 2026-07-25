import type { Metadata } from "next";
import "./globals.css";
import "./seat-preview.css";
import "./seat-orientation.css";
import "./seat-pairs.css";
import "./movie-program.css";
import "./mood-theme.css";
import "./checkout.css";
import "./payment-consent.css";
import "./audience-benefits.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://attend-cinema-platform.vercel.app"),
  title: "Attend — Dine-in Cinema Platform",
  description: "A connected ticketing, reserved-seating, and dine-in service platform built for modern movie theaters.",
  openGraph: {
    title: "Attend — One seat. One connected night.",
    description: "Ticketing, reserved seating, and seat-linked food and drink service in one platform for modern movie theaters.",
    type: "website",
    images: [{ url: "/og.png", width: 1728, height: 909, alt: "Attend dine-in cinema with paired seating, food, and drinks" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Attend — One seat. One connected night.",
    description: "Ticketing, reserved seating, and seat-linked food and drink service in one platform for modern movie theaters.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
