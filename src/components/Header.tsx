import Logo from "./Logo";
import NavBar from "./navs/Navbar";

const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-accent dark:bg-accent min-h-[50px] text-white flex items-center justify-between pr-3">
      <div className="relative w-full min-h-[50px]">
        <Logo></Logo>
      </div>
      <NavBar />
    </header>
  );
};

export default Header;
