import { MENU_ITEMS } from "@/constant";
import { cookies } from "next/headers";
import Link from "next/link";

const NavBar = async () => {
  const { get } = await cookies();
  const accessToken = get("access_token");

  return (
    <nav>
      <ul className="flex space-x-4">
        {MENU_ITEMS.map((item) => {
          if (item.href === "/account" && !accessToken) {
            return (
              <li key="login">
                <Link href="/login" className="text-gray-700 dark:text-white">
                  Login
                </Link>
              </li>
            );
          }
          return (
            <li key={item.label}>
              <Link href={item.href} className="text-gray-700 dark:text-white">
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
