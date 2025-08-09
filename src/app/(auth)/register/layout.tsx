import Logo from "@/components/Logo";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-screen">
      <div className="px-2">
        <Logo></Logo>
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
}
