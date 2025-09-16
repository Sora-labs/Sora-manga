import Logo from "../Logo";
import { AdminNavBar } from "../navs/AdminNavBar";
import { SidebarTrigger } from "../ui/sidebar";

export function AdminHeader() {
  return (
    <header
      className={`w-full bg-accent dark:bg-accent min-h-[50px] text-white flex items-center justify-between pr-3`}
    >
      <SidebarTrigger></SidebarTrigger>
    </header>
  );
}
