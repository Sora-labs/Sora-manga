"use client";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

interface Props {
  id: string;
  name: string;
  tags: any[];
  description: string;
  cover_url: string;
  showAction?: boolean;
}

const MangaCard = (props: Props) => {
  const { id, name, tags, cover_url, showAction, description } = props;
  console.log(tags);

  const handleNavigateEdit = () => {
    redirect(`/manga/${id}/edit`);
  };

  const handleNavigateDetail = () => {
    redirect(`/manga/${id}`);
  };

  return (
    <Card className="pt-0 pb-0 border-0 gap-2 rounded-none bg-transparent overflow-hidden">
      <CardContent className="cursor-pointer relative group px-0 flex-[1] rounded-sm overflow-hidden">
        <img src={cover_url} alt="" className="w-full" />
        <div className="content-detail hidden group-hover:flex flex-col absolute inset-0 bg-[#00000070] px-2 py-2 gap-2">
          <div className="flex-[1] overflow-y-auto overflow-x-hidden">
            <p>{description}</p>
          </div>
          <div className="">
            <Button
              onClick={handleNavigateDetail}
              className="bg-blue-500 hover:bg-blue-400 cursor-pointer text-white"
            >
              More detail
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-0 flex flex-col items-start">
        <Link
          href={`/manga/${id}`}
          className="text-sm font-semibold text-[#1d9df1] line-clamp-2"
        >
          {name}
        </Link>
        {showAction && (
          <div className="w-full flex mt-4 items-center">
            <button
              onClick={handleNavigateEdit}
              className="w-1/2 cursor-pointer hover:bg-blue-400 bg-blue-500 rounded-l-md"
            >
              Edit
            </button>
            <button className="w-1/2 bg-red-500 hover:bg-red-400 cursor-pointer rounded-r-md">
              Unlist
            </button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default MangaCard;
