import type { Metadata } from "next";
import "./globals.css";
import SideBar from "@/components/SideBar";
import { getServerSession } from "next-auth";
import { SessionProvider } from "@/components/SessionProvider";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Login from "@/components/Login";
import ClientProvider from "@/components/ClientProvider";

export const metadata: Metadata = {
  title: "Higgins AI | Chatbot",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {!session && (
            <div>
              <Login />
            </div>
          )}
          {session && (
            <div className="flex">
              {/* Sidebar */}
              <div className="bg-[#202123] max-w-3xs w-full h-screen overflow-y-auto lg:min-w-[17.5rem]  sm:w-[max-content]">
                <SideBar />
              </div>

              <ClientProvider />

              <div className="bg-[#343541] flex-1">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
