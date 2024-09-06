import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { Dev } from "@/providers/jotai-devtools";
import { ThemeProvider } from "next-themes";
import { LucideGithub } from "lucide-react";

import "./globals.css";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Generation } from "@/components/generation";
import { LastUpdated } from "@/components/last_updated";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

const font = Space_Grotesk({ subsets: ["latin"] });

const APP_NAME = "Astronomical Units";
const APP_DEFAULT_TITLE = "Astronomical Units";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION =
  "Embark on a cosmic journey where you start as a small space explorer gathering resources from nearby asteroids. As you accumulate more energy and materials, expand your fleet, colonize distant planets, and unlock advanced technologies. Set your sights on conquering the galaxy by discovering new star systems, establishing trade routes, and managing interstellar alliances. The universe is vast, and with every click, your empire grows—one astronomical unit at a time!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex h-dvh w-dvw flex-col overflow-x-hidden ${font.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="sticky top-0 z-50 flex h-12 flex-none items-center justify-between border-b bg-background px-4 font-bold">
            <p>Astronomical Units</p>
            <div className="flex items-center gap-1">
              <Button asChild variant="outline" size="icon" className="size-8">
                <a
                  target="_blank"
                  href="https://github.com/dishwasher-detergent/astronomical-units"
                >
                  <LucideGithub className="size-4" />
                </a>
              </Button>
              <ModeToggle />
            </div>
          </nav>
          <main className="relative w-full flex-1 overflow-hidden">
            {children}
            <Dev />
            <Generation />
            <LastUpdated />
            <Toaster position="top-right" richColors />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
