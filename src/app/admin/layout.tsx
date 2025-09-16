import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import "@/lib/db";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/Sidebars/AdminSidebar";
import { AdminHeader } from "@/components/Headers/AdminHeader";
import User from "@/lib/models/user";
import { adminRoles } from "@/constant";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sora Manga",
  description: "Sora web manga",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { decode } = jwt;
  await dbConnect();
  const { get } = await cookies();
  const token = get("access_token")?.value || null;
  const decoded = decode(token ?? "") as any;
  const user =
    decoded?.userId && (await User.findById(decoded.userId).populate("role"));

  if (!adminRoles.includes(user?.role?.name?.toLowerCase())) {
    redirect("/");
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AdminSidebar />
            <main className="w-full">
              <AdminHeader />
              {children}
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
