import React, { ReactNode } from "react";

export default function AccountPageLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <div>{children}</div>;
}
