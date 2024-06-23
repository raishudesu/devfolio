import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/header/header";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/session-provider";
import TanstackProvider from "@/providers/tanstack-provider";
import { GeistSans } from "geist/font/sans";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Devfolio",
  description: "Platform to generate and transform ideas into life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} bg-primary-foreground`}>
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <Header />
              <main className="flex flex-col justify-center items-center">
                {children}
              </main>
              <Footer />
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
