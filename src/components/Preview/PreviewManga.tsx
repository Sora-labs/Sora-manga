import { MangaDetail } from "../MangaDetail/MangaDetail";
import { Separator } from "../ui/separator";

interface Props {
  previewItem: MangaDetail;
}

const PreviewManga = (props: Props) => {
  const { previewItem } = props;
  const {
    coverImage,
    title,
    backgroundImage,
    description,
    tags,
    type,
    uploadDate,
    uploader,
  } = previewItem;

  return (
    <div className="hidden md:flex flex-col md:w-1/2 lg:w-3/5">
      <h2 className="my-2 text-2xl">Preview</h2>
      <MangaDetail
        coverImage={coverImage}
        title={title}
        backgroundImage={backgroundImage}
        description={description}
        tags={tags}
        type={type}
        uploadDate={uploadDate}
        uploader={uploader}
      />
    </div>
  );
};

export default PreviewManga;
