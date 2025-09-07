import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "sonner";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// src/app/layout.tsx
export const metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "doDO Finance",
    template: "%dodo | Dodo Finance",
  },
  description: "Your personal finance dashboard",
  alternates: {
    canonical: "/",
    languages: {
      "en": "/en",
      "hi": "/hi",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Example",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       
        <Providers>{children}</Providers>
         <Toaster />
      </body>
    </html>
  );
}
