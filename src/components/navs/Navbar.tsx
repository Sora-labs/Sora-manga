import { MENU_ITEMS } from "@/constant";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex space-x-4">
        {MENU_ITEMS.map((item) => (
          <li key={item.label}>
            <Link href={item.href} className="text-gray-700 dark:text-white">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
