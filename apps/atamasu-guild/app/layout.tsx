import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "atamasu Guild | アタマスギルド",
  description:
    "株式会社atamasu のAIスタッフギルド。10のチームがあなたの集客・広告・制作を応援します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
