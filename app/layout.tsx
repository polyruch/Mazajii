import type { Metadata } from "next";
import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";
import Logout from "@/components/Logout";

const opensans = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Mazaji",
  description: "Track your daily mood",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={"/"}>
        {" "}
        <h1 className={`${fugaz.className} text-base sm:text-lg textGradient`}>
          Mazaji
        </h1>
      </Link>

      <div className="flex items-center justify-between">
        <Logout />
      </div>
    </header>
  );
  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <p className={`${fugaz.className} text-indigo-500`}>
        Created with 💛 by Khalil
      </p>
    </footer>
  );

  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${opensans.className} w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col  text-slate-800`}
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
