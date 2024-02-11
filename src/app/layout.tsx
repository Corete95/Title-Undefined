import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import SideNav from "@/components/Sidenav";
import HeaderMobile from "@/components/Heardermobile";
import Providers from "@/components/Providers";
import "./globals.css";
import ReactqueryProvider from "@/providers/ReactqueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// ${inter.className}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-Pretendard overflow-hidden`}>
        <ReactqueryProvider>
          <Providers>
            <div className="flex">
              <SideNav />
              <main className="flex-1">
                <div className="flex flex-col md:ml-60 sm:border-r sm:border-zinc-700 min-h-screen ">
                  <Header />
                  <HeaderMobile />
                  <div className="flex flex-col space-y-2 flex-grow pb-4 dark:bg-darkGray">
                    {children}
                  </div>
                </div>
              </main>
            </div>
          </Providers>
        </ReactqueryProvider>
      </body>
    </html>
  );
}
