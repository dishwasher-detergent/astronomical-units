import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Dev } from "@/providers/jotai-devtools";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Generation } from "@/components/shop/generation";

const font = Space_Grotesk({ subsets: ["latin"] });

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
      <body
        className={`flex h-lvh w-screen flex-col overflow-x-hidden ${font.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="sticky top-0 z-50 flex h-12 flex-none items-center justify-between border-b bg-background px-4 font-bold">
            <p>Astronomical Units</p>
            <ModeToggle />
          </nav>
          <main className="relative w-full flex-1">
            {children}
            <Dev />
            <Generation />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
