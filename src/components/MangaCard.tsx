import { Card, CardContent, CardFooter } from "./ui/card";

interface Props {
  name: string;
  tags: any[];
  cover_url: string;
}

const MangaCard = (props: Props) => {
  const { name, tags, cover_url } = props;

  return (
    <Card className="pt-0 overflow-hidden">
      <CardContent className="px-0">
        <img src={cover_url} alt="" className="w-full" />
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <h3 className="text-lg font-semibold text-[#1d9df1] line-clamp-2">
          {name}
        </h3>
        <p className="line-clamp-1">
          {tags
            .map((tag) => tag?.name)
            .filter((name) => name)
            .join(", ")}
        </p>
      </CardFooter>
    </Card>
  );
};

export default MangaCard;
