import MangaCard from "../MangaCard";

export default async function LatestMangas() {
  const latestMangas = await fetch(
    `${process.env.NEXT_BASE_APP_URL}/api/latest-mangas`
  ).then((response) => response.json());
  console.log(latestMangas);

  const handleRenderMangaList = () => {
    const listOfLatestMangas: any[] = latestMangas?.data?.mangas;
    if (!latestMangas?.data?.is_success || !listOfLatestMangas.length) {
      return <div>No manga found</div>;
    }
    return listOfLatestMangas.map((manga) => (
      <MangaCard
        key={manga._id}
        id={manga._id}
        name={manga.name}
        cover_url={manga.cover_url}
        tags={manga.tags}
      />
    ));
  };

  return (
    <div className="mx-4 my-2">
      <div className="text-lg mb-4 font-bold">Latest manga</div>
      <div className="grid grid-cols-5 gap-4">{handleRenderMangaList()}</div>
    </div>
  );
}
