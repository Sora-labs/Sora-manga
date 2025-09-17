"use client";
import "@/lib/models/tag";
import MangaCard from "../MangaCard";
import api from "@/app/_services/api";
import { useEffect, useState } from "react";

export default function MangasByUploader() {
  const [uploaderMangas, setMangas] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const uploaderMangas = await api.get(
        `/api/mangas/get-by-uploader?page=1`
      );
      setMangas(uploaderMangas.data.data ?? []);
    })();
  }, []);

  const handleRenderMangaList = () => {
    if (!uploaderMangas.length) {
      return <div>No manga found</div>;
    }
    console.log(uploaderMangas);

    return uploaderMangas.map((manga) => (
      <MangaCard
        description={manga.description}
        key={manga._id}
        id={manga._id}
        name={manga.name}
        cover_url={manga.cover_url}
        tags={manga.tags}
        showAction
      />
    ));
  };

  return (
    <div className="mx-4 mt-50 mb-2">
      <div className="text-lg mb-4 font-bold">Uploaded:</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {handleRenderMangaList()}
      </div>
    </div>
  );
}
