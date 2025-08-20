import { ReactNode } from "react";

export default function EditMangaLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return <div>{children}</div>;
}
