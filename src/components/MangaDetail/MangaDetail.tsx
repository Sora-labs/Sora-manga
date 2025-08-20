export interface MangaDetail {
  coverImage: string;
  backgroundImage?: string;
  title: string;
  description?: string;
  tags: any[];
  type: string;
  uploader?: string;
  uploadDate?: string;
}

export function MangaDetail(props: MangaDetail) {
  const {
    coverImage,
    tags,
    title,
    type,
    backgroundImage,
    description,
    uploadDate,
    uploader,
  } = props;

  return (
    <div>
      <div className="cover w-full relative">
        <div className="w-full h-[200px] lg:h-[300px] overflow-y-hidden bg-black bg-no-repeat opacity-30">
          <img src={backgroundImage} alt="" className="w-full" />
        </div>
        <div className="flex absolute left-[50%] -translate-x-1/2 lg:translate-0 lg:left-0 lg:right-0 -bottom-40 px-8">
          <div className="relative flex">
            <div className="w-[200px] h-[250px] bg-gray-700 rounded-sm overflow-hidden">
              <img src={coverImage} alt="" className="w-full" />
            </div>
            <div className="hidden lg:flex flex-[1] px-4 flex-wrap items-start">
              <h1 className="text-4xl line-clamp-2">{title}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="content mt-[180px] lg:mt-0 lg:ml-[236px] relative z-10 min-h-[200px] py-4">
        <div className="flex flex-col lg:flex-row flex-[1]">
          <div className="flex lg:hidden flex-[1] px-4 flex-wrap items-start">
            <h1 className="text-4xl line-clamp-2">{title}</h1>
          </div>
          <div className="flex flex-col flex-[1] px-4">
            <p>{description}</p>
          </div>
          <div className="w-full p-4 lg:w-1/3 lg:p-0">
            <ul>
              <li className="flex gap-1">
                <span className="font-semibold">Tags:</span>
                <p>
                  {tags
                    ?.map((tag) => tag.label ?? "")
                    ?.filter((tag) => tag)
                    ?.join(", ")}
                </p>
              </li>
              <li className="flex gap-1">
                <span className="font-semibold">Uploader:</span>
                <p>{uploader}</p>
              </li>
              <li className="flex gap-1">
                <span className="font-semibold">Upload date:</span>
                <p>{uploadDate}</p>
              </li>
              <li className="flex gap-1">
                <span className="font-semibold">Type:</span>
                {type}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
