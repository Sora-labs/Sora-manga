// file size
export const KB = 1024;
export const MB = 1024 * KB;

type MenuItem = {
  label: string;
  href: string;
  icon?: string;
  subMenu?: MenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Home",
    href: "/",
    icon: "home",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Tags",
    href: "/tags",
  },
  {
    label: "Account",
    href: "/account",
  },
]

export const mangaType = [
  { id: "series", name: "Series" },
  { id: "oneshot", name: "Oneshot" }
]

export const adminRoles = [
  "new admin",
  "admin",
  "core admin",
  "owner",
]