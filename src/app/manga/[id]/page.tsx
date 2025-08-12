import {
  MangaDetail,
  MangaDetail as MangaItem,
} from "@/components/MangaDetail/MangaDetail";
import api from "@/app/_services/api";
import { notFound } from "next/navigation";

export default async function MangaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const promiseResult = await fetch(
    `${process.env.NEXT_BASE_APP_URL}/api/mangas/${id}`
  );
  const response = await promiseResult.json();

  if (response.data?.data?.is_success) {
    return notFound();
  }
  const manga = response.data?.data;
  console.log(manga);

  return (
    <MangaDetail
      coverImage={manga.cover_url}
      tags={manga.tags?.map((tag: any) => ({ ...tag, label: tag.name }))}
      title={manga.name}
      type={manga.type}
      backgroundImage={manga.background_url}
      description={manga.description}
      uploadDate={manga.uploadDate}
      uploader={manga.uploaderId?.username}
    />
  );
}
