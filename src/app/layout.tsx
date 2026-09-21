import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Novu | Second Hand Sneakers",
  description: "Minimalist second hand sneaker store.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-black antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <footer className="py-6 text-center text-sm text-gray-500 border-t border-gray-200">
          © {new Date().getFullYear()} Novu Sneaker Store. All rights reserved.
        </footer>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
