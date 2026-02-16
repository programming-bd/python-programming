import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "পাইথন প্রোগ্রামিং — বাংলায় শিখুন",
  description:
    "পাইথন প্রোগ্রামিং বাংলা বই — শূন্য থেকে শুরু করে দক্ষতা অর্জন। সহজ ভাষায় পাইথন শিখুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
