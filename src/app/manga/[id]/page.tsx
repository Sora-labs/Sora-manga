import {
  MangaDetail,
  MangaDetail as MangaItem,
} from "@/components/MangaDetail/MangaDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function MangaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const promiseResult = await fetch(
    `${process.env.NEXT_BASE_APP_URL}/api/mangas/${id}`
  );
  if (
    !promiseResult.headers.get("content-type")?.includes("application/json")
  ) {
    console.log(await promiseResult.text());

    throw new Error(`Expected JSON, got: ${await promiseResult.text()}`);
  }
  const response = await promiseResult?.json();

  if (!response.data?.is_success) {
    return notFound();
  }
  const manga = response.data?.data;

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const promiseResult = await fetch(
    `${process.env.NEXT_BASE_APP_URL}/api/mangas/${id}`
  );
  const response = await promiseResult.json();

  if (response.data?.data?.is_success) {
    return { title: "Sora Manga" };
  }
  const manga = response.data?.data;

  return {
    title: manga.name, // Dynamic title
    description: manga.description?.slice(0, 160) || "Read this manga",
  };
}
