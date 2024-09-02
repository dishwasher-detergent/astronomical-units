import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Dev } from "@/providers/jotai-devtools";
import { ThemeProvider } from "next-themes";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Astronomical Units",
  description: "An idle game that will take you to the moon!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative h-lvh w-screen overflow-x-hidden">
            {children}
            <Dev />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
