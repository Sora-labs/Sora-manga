import { Metadata } from "next";
import { ReactNode } from "react";

export default function EditMangaLayout({
  children,
}: {
  children: Readonly<ReactNode>;
}) {
  return <div>{children}</div>;
}

type Props = {
  params: Promise<{ id: string }>;
};

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
