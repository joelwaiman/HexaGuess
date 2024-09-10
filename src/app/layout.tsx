import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "With sleepy😴 Joel",
  description: "Generated by me, Joel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
