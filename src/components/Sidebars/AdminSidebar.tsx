"use client";
import {
  BookAIcon,
  BookMarkedIcon,
  CircleUser,
  FolderKey,
  LayoutDashboardIcon,
} from "lucide-react";
import Logo, { LogoIcon } from "../Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

const AdminSidebarItems = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboardIcon /> },
  { label: "Users", href: "/admin/users", icon: <CircleUser /> },
  { label: "Roles", href: "/admin/roles", icon: <FolderKey /> },
  { label: "Tags", href: "/admin/tags", icon: <BookMarkedIcon /> },
  { label: "Mangas", href: "/admin/mangas", icon: <BookAIcon /> },
];

export function AdminSidebar() {
  const { open } = useSidebar();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className={`${open ? "mb-10" : "mb-0"}`}>
        <SidebarMenu>
          <SidebarMenuItem>{open ? <Logo /> : <LogoIcon />}</SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {AdminSidebarItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
