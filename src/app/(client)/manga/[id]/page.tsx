import {
  MangaDetail,
  MangaDetail as MangaItem,
} from "@/components/MangaDetail/MangaDetail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import api from "@/app/_services/api";

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
  const promisePages = await api.get(`/api/pages?mangaId=${id}`);
  const pages = promisePages.data.data;
  console.log(pages);

  const PageComponent = () => {
    if (!pages || pages.length === 0) {
      return <div>No pages available</div>;
    }

    return pages.map((page: any) => (
      <div key={page._id} className="mb-4">
        <img
          src={`${process.env.NEXT_BASE_APP_URL}${page.image}`}
          alt={`Page ${page.pageNum}`}
          className="w-full rounded"
        />
        <p className="w-full text-center">
          {page.pageNum}/{pages.length}
        </p>
      </div>
    ));
  };

  return (
    <div className="page-container">
      <MangaDetail
        coverImage={manga.cover_url}
        tags={manga.tags?.map((tag: any) => ({ ...tag, label: tag.name }))}
        title={manga.name}
        type={manga.type}
        backgroundImage={manga.background_url}
        description={manga.description}
        uploadDate={manga.uploadDate}
        uploader={manga.uploaderId?.username}
        totalPages={pages?.length}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-80 md:w-3xl lg:w-5xl mx-auto gap-4">
        <PageComponent />
      </div>
    </div>
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
