import Image from "next/image";
import logo from "@/assets/app-logo.png";

export default function Logo() {
  return (
    <div className="absolute z-10 flex items-center p-2">
      <Image src={logo} alt="Sora" width={32} height={32} />
      <span className="ml-2 text-xl font-bold select-none">Sora マンガ</span>
    </div>
  );
}
