export function AdminNavBar() {
  return (
    <nav>
      <ul className="flex space-x-4">
        {/* {MENU_ITEMS.map((item) => {
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
        })} */}
      </ul>
    </nav>
  );
}
