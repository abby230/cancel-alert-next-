// src/app/layout.tsx
import "./globals.css";
import "leaflet/dist/leaflet.css";

import type { Metadata } from "next";
import Layout from "../components/Layout";

export const metadata: Metadata = {
  title: "CancelAlert",
  description: "Find cancellation alerts for your next stay",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
