import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vojtěch Honig — režisér, dramaturg, autor",
  description: "Autorské divadlo ve studiových a nedivadelních prostorech. Vybrané inscenace, dramaturgické spolupráce a stáže Vojtěcha Honiga.",
  robots: { index: false, follow: false },
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
    <html lang="cs">
      <body className="antialiased">{children}</body>
    </html>
  );
}
