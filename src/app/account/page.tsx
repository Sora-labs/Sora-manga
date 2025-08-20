"use client";
import MangasByUploader from "@/components/MangaByUploader/MangaByUploader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { notFound, redirect, useRouter } from "next/navigation";
import api from "../_services/api";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/api/account`);
        console.log(response);

        if (!response?.data?.is_success) {
          return notFound();
        }

        setUser(response.data.data);
      } catch (e) {
        redirect("/login");
      }
    })();
  }, []);

  // handle logout
  const handleLogout = async () => {
    const response = await api.post("/api/auth/logout", null);
    if (!response.data.is_success) {
      alert(response.data.message);
      return;
    }
    router.replace("/");
    router.refresh();
  };

  const handleNavigateUploadPage = () => {
    router.replace("/manga/upload");
  };

  return (
    <div className="mt-12">
      <div className="cover w-full relative">
        <div className="w-full h-[180px] lg:h-[250px] overflow-y-hidden bg-black bg-no-repeat opacity-30">
          <img src={user?.background_url} alt="" className="w-full" />
        </div>
        <div className="flex absolute left-[50%] -translate-x-1/2 lg:translate-0 lg:left-0 lg:right-0 top-3/4 px-8">
          <div className="flex h-[150px] flex-[1]">
            <div className="w-[150px] h-[150px] bg-gray-700 rounded-full overflow-hidden">
              <img src={user?.cover_url} alt="" className="w-full" />
            </div>
            <div className="hidden mt-[50px] lg:flex flex-[1] px-4 flex-wrap items-center justify-between">
              <h1 className="text-4xl line-clamp-2">
                {user?.name ?? user?.username}
              </h1>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="cursor-pointer" variant="outline">
                      Settings
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={handleNavigateUploadPage}
                      className="cursor-pointer"
                    >
                      Upload manga
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-400 focus:text-red-300"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MangasByUploader />
    </div>
  );
}
