import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaypee | VTU Data Shop",
  description: "Buy and resell MTN bundles with Kaypee (Samic).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
