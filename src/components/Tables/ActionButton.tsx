import { EllipsisIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface ActionButtonProps {
  id: string;
  detailUrl?: string;
  editUrl?: string;
  extendItems?: React.ReactNode;
}

export default function ActionButton(props: ActionButtonProps) {
  const { id, detailUrl, editUrl } = props;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <EllipsisIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[120px] p-2">
        <ul className="flex flex-col gap-2 px-2">
          {detailUrl && (
            <li className="hover:bg-gray-800 px-1 rounded-sm">
              <a className="block" href={`${detailUrl}/${id}`}>
                View
              </a>
            </li>
          )}
          {editUrl && (
            <li className="hover:bg-gray-800 px-1 rounded-sm">
              <a className="block" href={`${editUrl}/${id}`}>
                Edit
              </a>
            </li>
          )}
          {props.extendItems}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
