"use client";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "./ui/card";
import { redirect } from "next/navigation";

interface Props {
  id: string;
  name: string;
  tags: any[];
  cover_url: string;
  showAction?: boolean;
}

const MangaCard = (props: Props) => {
  const { id, name, tags, cover_url, showAction } = props;

  const handleNavigateEdit = () => {
    redirect(`/manga/${id}/edit`);
  };

  return (
    <Card className="pt-0 overflow-hidden">
      <CardContent className="px-0 flex-[1]">
        <img src={cover_url} alt="" className="w-full" />
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <Link
          href={`/manga/${id}`}
          className="text-lg font-semibold text-[#1d9df1] line-clamp-2"
        >
          {name}
        </Link>
        <p className="line-clamp-1">
          {tags
            .map((tag) => tag?.name)
            .filter((name) => name)
            .join(", ")}
        </p>
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
