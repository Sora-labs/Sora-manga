import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function MangaDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
